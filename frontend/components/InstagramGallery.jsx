import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Instagram, X, Play, Heart, Calendar, ExternalLink, ChevronDown } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/tecnolight.srl/';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'reglamentarias', label: 'Reglamentarias' },
  { id: 'preventivas', label: 'Preventivas' },
  { id: 'informativas', label: 'Informativas' },
  { id: 'proyectos', label: 'Proyectos' }
];

const PROFILE = {
  username: 'tecnolight.srl',
  fullName: 'Tecnolight SRL',
  bio: 'Señalización Vial y Cartelería | Más de 30 años de trayectoria | Santa Fe, Argentina | Fabricación propia e instalación profesional',
  avatar: '/images/instagram/profile-avatar.jpg',
  posts: '45',
  followers: '1280',
  following: '89'
};

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
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [expandedCaption, setExpandedCaption] = useState(null);

  useEffect(() => { fetchCategories(); fetchPosts(); }, []);
  useEffect(() => { fetchPosts(); }, [selectedCategory]);

  async function fetchCategories() {
    try {
      const res = await fetch(`${API_URL}/api/instagram/categories`);
      const json = await res.json();
      if (json.success) setCategories(json.data);
    } catch (err) { console.error('Error al cargar categorías:', err); }
  }

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const url = selectedCategory === 'all'
        ? `${API_URL}/api/instagram/posts?limit=12`
        : `${API_URL}/api/instagram/posts?limit=12&category=${selectedCategory}`;
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al cargar publicaciones');
      if (json.success) setPosts(json.data);
    } catch (err) {
      console.error('Error al cargar posts:', err);
      setError(err.message);
    } finally { setLoading(false); }
  }

  function openModal(post) { setSelectedPost(post); setExpandedCaption(null); document.body.style.overflow = 'hidden'; }
  function closeModal() { setSelectedPost(null); document.body.style.overflow = 'auto'; }

  useEffect(() => {
    function handleEscape(e) { if (e.key === 'Escape' && selectedPost) closeModal(); }
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedPost]);

  return (
    <section className="py-20">
      <Head>
        <title>Instagram | Tecnolight</title>
        <meta name="description" content={`Seguinos en Instagram @${PROFILE.username} - Señalización vial y proyectos en tiempo real`} />
      </Head>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 container-site mb-10">
        <div className="relative shrink-0">
          <img src={PROFILE.avatar || '/images/instagram/profile-avatar.jpg'} alt={PROFILE.fullName} className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] via-[#bc1888] to-transparent p-[3px] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]" />
        </div>
        <div className="flex flex-col items-center md:items-start gap-3">
          <h2 className="text-2xl font-bold text-text-main">{PROFILE.username}</h2>
          <p className="text-base text-text-main">{PROFILE.fullName}</p>
          <div className="flex gap-6 text-sm">
            <div className="text-center"><span className="font-bold text-text-main block">{PROFILE.posts}</span><span className="text-text-muted">publicaciones</span></div>
            <div className="text-center"><span className="font-bold text-text-main block">{PROFILE.followers}</span><span className="text-text-muted">seguidores</span></div>
            <div className="text-center"><span className="font-bold text-text-main block">{PROFILE.following}</span><span className="text-text-muted">seguidos</span></div>
          </div>
          <p className="text-sm text-text-muted text-center md:text-left max-w-md">{PROFILE.bio}</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-bg-dark font-semibold px-6 py-2 rounded-lg text-sm hover:bg-primary-hover transition-all duration-300">
            <Instagram size={18} /> Seguir en Instagram
          </a>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat.id ? 'bg-primary text-bg-dark' : 'bg-transparent text-text-muted border border-border hover:text-text-main hover:border-text-main'}`}>
            {cat.label}
          </button>
        ))}
      </div>

      {loading && <div className="flex flex-col items-center gap-4 py-10"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /><p className="text-text-muted">Cargando publicaciones...</p></div>}

      {error && <div className="text-center py-10"><p className="text-error mb-4">No pudimos cargar las publicaciones</p><button onClick={fetchPosts} className="btn-primary">Reintentar</button></div>}

      {!loading && posts.length > 0 && (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container-site" layout>
          {posts.map((post, index) => (
            <motion.div key={post.id} className="bg-bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-1.5 hover:shadow-premium hover:border-primary" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} onClick={() => openModal(post)} transition={{ duration: 0.4, delay: index * 0.05 }}>
              <div className="relative aspect-square overflow-hidden">
                <img src={post.image} alt={`${post.category}`} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.target.src = '/images/instagram/placeholder.jpg'; }} />
                <span className="absolute top-3 left-3 bg-bg-dark/80 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-text-main">{post.category}</span>
                {post.video && <span className="absolute bottom-3 right-3 bg-bg-dark/80 backdrop-blur-sm rounded-full p-1.5 text-text-main"><Play size={16} /></span>}
              </div>
              <div className="p-3">
                <p className="text-sm text-text-muted truncate">{post.caption ? post.caption.substring(0, 100) + (post.caption.length > 100 ? '...' : '') : 'Ver publicación'}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-text-muted">
                  <span className="flex items-center gap-1"><Heart size={12} /> {formatLikes(post.likes)}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.created_at)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && posts.length === 0 && !error && (
        <div className="flex flex-col items-center gap-4 py-10"><Instagram size={64} className="text-text-muted" /><p className="text-text-muted">No hay publicaciones en esta categoría</p></div>
      )}

      {selectedPost && (
        <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={closeModal}>
          <motion.div className="bg-bg-dark rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row" initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 z-10 text-text-main hover:text-primary transition-colors" onClick={closeModal}><X size={28} /></button>
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
                <div><p className="font-semibold text-text-main text-sm">{PROFILE.username}</p><p className="text-xs text-text-muted">{selectedPost.category}</p></div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-main leading-relaxed">
                  <strong className="text-text-main">{PROFILE.username}</strong>{' '}
                  {expandedCaption === selectedPost.id ? selectedPost.caption : selectedPost.caption ? selectedPost.caption.substring(0, 120) : 'Sin descripción'}
                  {selectedPost.caption && selectedPost.caption.length > 120 && (
                    <button className="text-primary text-sm ml-1 hover:underline" onClick={() => setExpandedCaption(expandedCaption === selectedPost.id ? null : selectedPost.id)}>
                      {expandedCaption === selectedPost.id ? '...menos' : '...más'}
                    </button>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-text-muted border-t border-border pt-4">
                <span className="flex items-center gap-2"><Heart size={18} className="text-primary" /> {formatLikes(selectedPost.likes)} Me gusta</span>
                <span className="flex items-center gap-2"><Calendar size={18} className="text-primary" /> {formatDate(selectedPost.created_at)}</span>
              </div>
              <a href={selectedPost.permalink || INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-primary text-bg-dark font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-primary-hover transition-all duration-300"><ExternalLink size={16} /> Ver en Instagram</a>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="flex flex-col items-center gap-4 mt-12">
        <p className="text-sm text-text-muted">Seguinos para ver más contenido</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-semibold text-lg hover:text-primary-hover transition-colors"><Instagram size={22} /> @{PROFILE.username}</a>
      </div>
    </section>
  );
}
