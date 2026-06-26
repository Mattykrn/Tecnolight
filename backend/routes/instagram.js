const express = require('express');
const router = express.Router();
const security = require('../src/security');

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '';
const INSTAGRAM_BASE_URL = 'https://graph.instagram.com/v12.0';

const CATEGORY_KEYWORDS = {
  Reglamentarias: ['reglamentaria', 'pare', 'ceda', 'prohibido', 'máxima', 'mínima'],
  Preventivas: ['preventiva', 'curva', 'pendiente', 'cruce', 'escolar', 'animales'],
  Informativas: ['informativa', 'destino', 'ruta', 'indicación', 'nomenclador'],
  Proyectos: ['proyecto', 'obra', 'instalación', 'montaje', 'municipio']
};

function categorizeByCaption(caption) {
  if (!caption) return 'Proyectos';
  const lower = caption.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) return category;
  }
  if (/(obra|instalaci|montaje|ejecutado|finalizado)/i.test(lower)) return 'Proyectos';
  return 'Proyectos';
}

let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 5 * 60 * 1000;

async function fetchFromInstagramAPI(limit) {
  if (!INSTAGRAM_ACCESS_TOKEN) return null;

  try {
    const url = `${INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.text();
      console.error('Instagram API error:', err);
      return null;
    }
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Instagram API fetch failed:', err);
    return null;
  }
}

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

    const igData = await fetchFromInstagramAPI(50);

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
      if (category) {
        result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      return res.json({ success: true, count: result.length, data: result.slice(0, parsedLimit), cached: false });
    }

    const mockPosts = [
      { id: 'mock_1', image: '/images/instagram/senal-pare-1.jpg', category: 'Reglamentarias', caption: 'Señal Pare reglamentaria recién instalada en Av. Alem. Fabricación propia con materiales reflectivos grado engineering. 🚦 #SeñalizaciónVial #SeguridadVial #Tecnolight', likes: 245, permalink: 'https://www.instagram.com/tecnolight.srl/', created_at: new Date(Date.now() - 86400000).toISOString() },
      { id: 'mock_2', image: '/images/instagram/senal-preventiva-2.jpg', category: 'Preventivas', caption: 'Curva peligrosa señalizada correctamente. Señal preventiva de alto impacto visual con retroreflectividad garantizada. 🛣️ #Prevención #Vial #Tecnolight', likes: 189, permalink: 'https://www.instagram.com/tecnolight.srl/', created_at: new Date(Date.now() - 172800000).toISOString() },
      { id: 'mock_3', image: '/images/instagram/proyecto-santa-fe-3.jpg', category: 'Proyectos', caption: 'Proyecto integral de señalización para la Municipalidad de Santa Fe. Más de 500 señales instaladas en toda la ciudad. 🏙️ #SeñalizaciónUrbana #SantaFe #Tecnolight', likes: 312, permalink: 'https://www.instagram.com/tecnolight.srl/', created_at: new Date(Date.now() - 259200000).toISOString() },
      { id: 'mock_4', image: '/images/instagram/informativa-4.jpg', category: 'Informativas', caption: 'Cartelería informativa de destino para rutas provinciales. Diseño claro y visible a distancia. ℹ️ #Cartelería #Rutas #Tecnolight', likes: 156, permalink: 'https://www.instagram.com/tecnolight.srl/', created_at: new Date(Date.now() - 345600000).toISOString() },
      { id: 'mock_5', image: '/images/instagram/reglamentaria-5.jpg', category: 'Reglamentarias', caption: 'Señal de prohibido estacionar fabricada con materiales de primera calidad. Cumple normativa vial argentina. ⛔ #Tránsito #Reglamentaria #Tecnolight', likes: 278, permalink: 'https://www.instagram.com/tecnolight.srl/', created_at: new Date(Date.now() - 432000000).toISOString() },
      { id: 'mock_6', image: '/images/instagram/proyecto-6.jpg', category: 'Proyectos', caption: 'Señalización completa del Parque Industrial Sauce Viejo. Nomencladores de calles, señales viales y cartelería de bienvenida. 🏭 #ParqueIndustrial #Señalización #Tecnolight', likes: 420, permalink: 'https://www.instagram.com/tecnolight.srl/', created_at: new Date(Date.now() - 518400000).toISOString() }
    ];

    let posts = mockPosts;
    cache = { data: posts, timestamp: now };

    if (category) {
      posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    posts = posts.slice(0, parsedLimit);

    res.json({ success: true, count: posts.length, data: posts, cached: false, mock: true });
  } catch (error) {
    console.error('Error en Instagram posts:', error);
    res.status(500).json({ error: 'Error al obtener publicaciones de Instagram' });
  }
});

router.get('/categories', (req, res) => {
  res.json({ success: true, data: ['Reglamentarias', 'Preventivas', 'Informativas', 'Proyectos'] });
});

module.exports = router;
