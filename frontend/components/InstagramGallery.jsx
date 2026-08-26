import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, X, Play, Heart, Calendar, ExternalLink } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/tecnolight.srl/';

const CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'reglamentarias', label: 'Reglamentarias' },
  { id: 'preventivas', label: 'Preventivas' },
  { id: 'informativas', label: 'Informativas' },
  { id: 'proyectos', label: 'Proyectos' }
];

const PROFILE = {
  username: 'tecnolight.srl',
  fullName: 'Tecno Light SRL',
  bio: 'Señalización Vial y Cartelería | Más de 30 años de trayectoria | Santa Fe, Argentina | Fabricación propia e instalación profesional',
  avatar: '/images/instagram/profile-avatar.jpg',
  posts: '45',
  followers: '1280',
  following: '89'
};

const POSTS = [
  { id: 'p1', image: '/images/instagram/posts/g-reglamentaria.jpg', category: 'Reglamentarias', caption: 'Señal reglamentaria de alto estándar fabricada en chapa de aluminio reflectivo. Cumple con normativas viales argentinas.', likes: 234, created_at: '2026-07-20', permalink: INSTAGRAM_URL },
  { id: 'p2', image: '/images/instagram/posts/g-preventiva.jpg', category: 'Preventivas', caption: 'Señal preventiva para curvas cerradas y tramos peligrosos. Fabricada con materiales duraderos para exterior.', likes: 189, created_at: '2026-07-18', permalink: INSTAGRAM_URL },
  { id: 'p3', image: '/images/instagram/posts/g-obra.jpg', category: 'Proyectos', caption: 'Trabajo de señalización vial ejecutado con materiales certificados 3M.', likes: 312, created_at: '2026-07-15', permalink: INSTAGRAM_URL },
  { id: 'p4', image: '/images/instagram/posts/g-urbana.jpg', category: 'Informativas', caption: 'Señalización urbana ejecutada con estándares de calidad premium.', likes: 156, created_at: '2026-07-12', permalink: INSTAGRAM_URL },
  { id: 'p5', image: '/images/instagram/posts/g-carteleria.jpg', category: 'Informativas', caption: 'Diseño e instalación de cartelería comercial de gran formato.', likes: 278, created_at: '2026-07-10', permalink: INSTAGRAM_URL },
  { id: 'p6', image: '/images/instagram/posts/g-vial.jpg', category: 'Proyectos', caption: 'Proyecto de señalización completado. Cero reclamos, como siempre.', likes: 145, created_at: '2026-07-08', permalink: INSTAGRAM_URL },
  { id: 'p7', image: '/images/instagram/posts/g-nocturna.jpg', category: 'Proyectos', caption: 'Señal reflectiva de alta visibilidad. Visible de día y de noche.', likes: 203, created_at: '2026-07-05', permalink: INSTAGRAM_URL },
  { id: 'p8', image: '/images/instagram/posts/galeria-1.jpg', category: 'Proyectos', caption: 'Instalación de cartelería vial en ruta provincial.', likes: 167, created_at: '2026-07-03', permalink: INSTAGRAM_URL },
  { id: 'p9', image: '/images/instagram/posts/galeria-2.jpg', category: 'Reglamentarias', caption: 'Nueva señal instalada en Santa Fe. Calidad y durabilidad garantizada.', likes: 89, created_at: '2026-07-01', permalink: INSTAGRAM_URL },
  { id: 'p10', image: '/images/instagram/posts/galeria-3.jpg', category: 'Proyectos', caption: 'Materiales reflectivos grado ingeniería para máxima seguridad vial.', likes: 234, created_at: '2026-06-28', permalink: INSTAGRAM_URL },
  { id: 'p11', image: '/images/instagram/posts/galeria-4.jpg', category: 'Preventivas', caption: 'Fabricación propia de señalización vial. Norma IRAM 3950.', likes: 198, created_at: '2026-06-25', permalink: INSTAGRAM_URL },
  { id: 'p12', image: '/images/instagram/posts/galeria-5.jpg', category: 'Informativas', caption: 'Proyecto de seguridad vial finalizado. Cliente satisfecho.', likes: 276, created_at: '2026-06-22', permalink: INSTAGRAM_URL },
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Hoy';
  if (days === 1) return 'Ayer';
  if (days < 7) return `Hace ${days} días`;
  return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatLikes(n) {
  if (!n) return '0';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return String(n);
}

export default function InstagramGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [expandedCaption, setExpandedCaption] = useState(null);

  const posts = selectedCategory === 'all'
    ? POSTS
    : POSTS.filter(p => p.category.toLowerCase() === selectedCategory);

  function openModal(post) { setSelectedPost(post); setExpandedCaption(null); document.body.style.overflow = 'hidden'; }
  function closeModal() { setSelectedPost(null); document.body.style.overflow = 'auto'; }

  useEffect(() => {
    function handleEscape(e) { if (e.key === 'Escape' && selectedPost) closeModal(); }
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedPost]);

  return (
    <section className="py-24">

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 container-site mb-10">
        <div className="relative shrink-0">
          <img src={PROFILE.avatar || '/images/instagram/profile-avatar.jpg'} alt={PROFILE.fullName} className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] via-[#bc1888] to-transparent p-[3px] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]" />
        </div>
        <div className="flex flex-col items-center md:items-start gap-3">
          <h2 className="text-2xl font-bold text-white">{PROFILE.username}</h2>
          <p className="text-base text-white/80">{PROFILE.fullName}</p>
          <div className="flex gap-6 text-sm">
            <div className="text-center"><span className="font-bold text-white block">{PROFILE.posts}</span><span className="text-white/50">publicaciones</span></div>
            <div className="text-center"><span className="font-bold text-white block">{PROFILE.followers}</span><span className="text-white/50">seguidores</span></div>
            <div className="text-center"><span className="font-bold text-white block">{PROFILE.following}</span><span className="text-white/50">seguidos</span></div>
          </div>
          <p className="text-sm text-white/50 text-center md:text-left max-w-md">{PROFILE.bio}</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2 rounded-lg text-sm hover:bg-primary/80 transition-all duration-300">
            <Instagram size={18} /> Seguir en Instagram
          </a>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 rounded-[4px] text-xs font-semibold transition-all tracking-wide ${selectedCategory === cat.id ? 'bg-primary text-white' : 'bg-card border border-white/8 text-muted-foreground hover:border-primary/35 hover:text-foreground'}`}>
            {cat.label}
          </button>
        ))}
      </div>

      {posts.length > 0 && (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container-site" layout>
          {posts.map((post, index) => (
            <motion.div key={post.id} className="bg-card border border-white/6 rounded-[4px] overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-1.5 hover:border-primary/30 group" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} onClick={() => openModal(post)} transition={{ duration: 0.4, delay: index * 0.05 }}>
              <div className="relative aspect-square overflow-hidden">
                <img src={post.image} alt={`${post.category}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onError={(e) => { e.target.src = '/images/instagram/placeholder.jpg'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-[3px] text-white">{post.category}</span>
                {post.video && <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full p-1.5 text-white"><Play size={16} /></span>}
              </div>
              <div className="p-3">
                <p className="text-sm text-white/50 truncate">{post.caption ? post.caption.substring(0, 100) + (post.caption.length > 100 ? '...' : '') : 'Ver publicación'}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-white/30">
                  <span className="flex items-center gap-1"><Heart size={12} /> {formatLikes(post.likes)}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.created_at)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {posts.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-10"><Instagram size={64} className="text-white/10" /><p className="text-white/50">No hay publicaciones en esta categoría</p></div>
      )}

      {selectedPost && (
        <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={closeModal}>
          <motion.div className="bg-[#0A0B10] rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row" initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 z-10 text-white hover:text-primary transition-colors" onClick={closeModal}><X size={28} /></button>
            <div className="md:w-3/5 max-h-[50vh] md:max-h-[90vh] overflow-hidden bg-black flex items-center justify-center">
              {selectedPost.video ? (
                <video src={selectedPost.video} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <img src={selectedPost.image} alt={selectedPost.category} className="w-full h-full object-contain" />
              )}
            </div>
            <div className="md:w-2/5 p-6 flex flex-col gap-6 overflow-y-auto">
              <div className="flex items-center gap-3">
                <img src={PROFILE.avatar || '/images/instagram/profile-avatar.jpg'} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div><p className="font-semibold text-white text-sm">{PROFILE.username}</p><p className="text-xs text-gray-400">{selectedPost.category}</p></div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <strong className="text-white">{PROFILE.username}</strong>{' '}
                  {expandedCaption === selectedPost.id ? selectedPost.caption : selectedPost.caption ? selectedPost.caption.substring(0, 120) : 'Sin descripción'}
                  {selectedPost.caption && selectedPost.caption.length > 120 && (
                    <button className="text-primary text-sm ml-1 hover:underline" onClick={() => setExpandedCaption(expandedCaption === selectedPost.id ? null : selectedPost.id)}>
                      {expandedCaption === selectedPost.id ? '...menos' : '...más'}
                    </button>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400 border-t border-white/10 pt-4">
                <span className="flex items-center gap-2"><Heart size={18} className="text-primary" /> {formatLikes(selectedPost.likes)} Me gusta</span>
                <span className="flex items-center gap-2"><Calendar size={18} className="text-primary" /> {formatDate(selectedPost.created_at)}</span>
              </div>
              <a href={selectedPost.permalink || INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-primary/80 transition-all duration-300"><ExternalLink size={16} /> Ver en Instagram</a>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="flex flex-col items-center gap-4 mt-12">
        <p className="text-sm text-white/50">Seguinos para ver más contenido</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-semibold text-lg hover:text-primary/80 transition-colors"><Instagram size={22} /> @{PROFILE.username}</a>
      </div>
    </section>
  );
}
