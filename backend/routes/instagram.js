const express = require('express');
const router = express.Router();
const security = require('../src/security');
const fs = require('fs');
const path = require('path');

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '';
const INSTAGRAM_BASE_URL = 'https://graph.instagram.com/v12.0';

const CATEGORY_KEYWORDS = {
  Reglamentarias: ['reglamentaria', 'pare', 'ceda', 'prohibido', 'máxima', 'mínima'],
  Preventivas: ['preventiva', 'curva', 'pendiente', 'cruce', 'escolar', 'animales'],
  Informativas: ['informativa', 'destino', 'ruta', 'indicación', 'nomenclador'],
  Proyectos: ['proyecto', 'obra', 'instalación', 'montaje', 'municipio']
};

const SEED_DATA_PATH = path.join(__dirname, '..', 'data', 'instagram-posts.json');
const POSTS_DIR = path.join(__dirname, '..', '..', 'frontend', 'public', 'images', 'instagram', 'posts');

const POST_CATEGORIES = ['Reglamentarias', 'Preventivas', 'Informativas', 'Proyectos'];
const CAPTIONS = [
  'Trabajo de señalización vial ejecutado con materiales certificados 3M.',
  'Nueva señal instalada en Santa Fe. Calidad y durabilidad garantizada.',
  'Proyecto de señalización completado. Cero reclamos, como siempre.',
  'Fabricación propia de señalización vial. Norma IRAM 3950.',
  'Señal reflectiva de alta visibilidad. Visible de día y de noche.',
  'Instalación de cartelería vial en ruta provincial.',
  'Señalización urbana ejecutada con estándares de calidad premium.',
  'Materiales reflectivos grado ingeniería para máxima seguridad vial.',
  'Proyecto de seguridad vial finalizado. Cliente satisfecho.',
  'Fabricamos cada señal como si la vida de alguien dependiera de ella.'
];

function categorizeByCaption(caption) {
  if (!caption) return 'Proyectos';
  const lower = caption.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) return category;
  }
  return 'Proyectos';
}

function getCategoryFromFilename(filename) {
  const name = filename.toLowerCase();
  if (name.includes('reglamentaria')) return 'Reglamentarias';
  if (name.includes('preventiva')) return 'Preventivas';
  if (name.includes('informativa')) return 'Informativas';
  if (name.includes('obra') || name.includes('nocturna')) return 'Proyectos';
  if (name.includes('carteleria') || name.includes('urbana')) return 'Informativas';
  if (name.includes('vial')) return 'Proyectos';
  if (name.startsWith('galeria')) {
    const idx = parseInt(name.match(/\d+/)?.[0] || '0');
    return POST_CATEGORIES[idx % 4];
  }
  return null;
}

function loadSeedPosts() {
  try {
    const data = fs.readFileSync(SEED_DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading seed posts:', err.message);
    return [];
  }
}

function scanPostsDirectory() {
  const posts = [];
  try {
    if (!fs.existsSync(POSTS_DIR)) return posts;
    const files = fs.readdirSync(POSTS_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    files.forEach((file, idx) => {
      const category = getCategoryFromFilename(file) || POST_CATEGORIES[idx % 4];
      posts.push({
        id: `post_${idx + 1}`,
        image: `/images/instagram/posts/${file}`,
        category,
        caption: CAPTIONS[idx % CAPTIONS.length],
        likes: Math.floor(Math.random() * 300) + 50,
        permalink: 'https://www.instagram.com/tecnolight.srl/',
        created_at: new Date(Date.now() - idx * 86400000).toISOString()
      });
    });
  } catch (err) {
    console.error('Error scanning posts directory:', err.message);
  }
  return posts;
}

function buildAllPosts() {
  const seedPosts = loadSeedPosts();
  const scannedPosts = scanPostsDirectory();
  return [...seedPosts, ...scannedPosts];
}

let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 10 * 60 * 1000;

router.get('/posts', security.apiLimiter, async (req, res) => {
  try {
    const { limit = 12, category } = req.query;
    const parsedLimit = Math.min(parseInt(limit) || 12, 50);

    const now = Date.now();
    if (cache.data && now - cache.timestamp < CACHE_TTL) {
      let posts = cache.data;
      if (category) {
        posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      return res.json({ success: true, count: posts.length, data: posts.slice(0, parsedLimit), cached: true });
    }

    const igData = INSTAGRAM_ACCESS_TOKEN ? await fetchFromInstagramAPI(50) : null;

    if (igData) {
      const posts = igData.map(item => {
        const caption = item.caption || '';
        const category = categorizeByCaption(caption);
        return {
          id: item.id,
          image: item.media_type === 'VIDEO' ? (item.thumbnail_url || item.media_url) : item.media_url,
          video: item.media_type === 'VIDEO' ? item.media_url : null,
          caption: caption.substring(0, 200),
          category,
          likes: 0,
          permalink: item.permalink,
          created_at: item.timestamp
        };
      });
      cache = { data: posts, timestamp: now };
      let result = posts;
      if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
      return res.json({ success: true, count: result.length, data: result.slice(0, parsedLimit), cached: false });
    }

    const allPosts = buildAllPosts();
    cache = { data: allPosts, timestamp: now };
    let result = allPosts;
    if (category) {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    result = result.slice(0, parsedLimit);
    res.json({ success: true, count: result.length, data: result, cached: false, mock: false });
  } catch (error) {
    console.error('Error en Instagram posts:', error);
    res.status(500).json({ error: 'Error al obtener publicaciones de Instagram' });
  }
});

router.get('/categories', (req, res) => {
  res.json({ success: true, data: ['Reglamentarias', 'Preventivas', 'Informativas', 'Proyectos'] });
});

module.exports = router;
