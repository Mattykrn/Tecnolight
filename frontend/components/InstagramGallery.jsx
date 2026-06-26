import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Instagram, X, Play, Heart, Calendar, ExternalLink, ChevronDown } from 'lucide-react';
import styles from './InstagramGallery.module.css';

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
  bio: 'Señalización Vial y Cartelería | Más de 30 años de trayectoria | Santa Fe, Argentina 🇦🇷 | Fabricación propia e instalación profesional',
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

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  async function fetchCategories() {
    try {
      const res = await fetch(`${API_URL}/api/instagram/categories`);
      const json = await res.json();
      if (json.success) setCategories(json.data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
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
    } finally {
      setLoading(false);
    }
  }

  function openModal(post) {
    setSelectedPost(post);
    setExpandedCaption(null);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  }

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape' && selectedPost) closeModal();
    }
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedPost]);

  return (
    <section className={styles.section}>
      <Head>
        <title>Instagram | Tecnolight</title>
        <meta name="description" content={`Seguinos en Instagram @${PROFILE.username} - Señalización vial y proyectos en tiempo real`} />
      </Head>

      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar}>
          <img src={PROFILE.avatar} alt={PROFILE.fullName} />
          <div className={styles.avatarRing} />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.profileUsername}>{PROFILE.username}</h2>
          <p className={styles.profileName}>{PROFILE.fullName}</p>
          <div className={styles.profileStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{PROFILE.posts}</span>
              <span className={styles.statLabel}>publicaciones</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{PROFILE.followers}</span>
              <span className={styles.statLabel}>seguidores</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{PROFILE.following}</span>
              <span className={styles.statLabel}>seguidos</span>
            </div>
          </div>
          <p className={styles.profileBio}>{PROFILE.bio}</p>
          <div className={styles.profileActions}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.followButton}>
              <Instagram size={18} />
              <span>Seguir en Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`${styles.filterButton} ${selectedCategory === cat.id ? styles.active : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando publicaciones...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className={styles.error}>
          <p>⚠️ No pudimos cargar las publicaciones</p>
          <button onClick={fetchPosts} className={styles.retryButton}>Reintentar</button>
        </div>
      )}

      {/* Grid */}
      {!loading && posts.length > 0 && (
        <motion.div className={styles.grid} layout>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              onClick={() => openModal(post)}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={post.image}
                  alt={`${post.category}`}
                  className={styles.image}
                  loading="lazy"
                  onError={(e) => { e.target.src = '/images/instagram/placeholder.jpg'; }}
                />
                <span className={styles.categoryBadge}>{post.category}</span>
                {post.video && (
                  <span className={styles.videoIndicator}><Play size={16} /></span>
                )}
              </div>
              <div className={styles.cardFooter}>
                <p className={styles.cardCaption}>
                  {post.caption ? post.caption.substring(0, 100) + (post.caption.length > 100 ? '...' : '') : 'Ver publicación'}
                </p>
                <div className={styles.cardMeta}>
                  <span className={styles.cardLikes}>
                    <Heart size={12} /> {formatLikes(post.likes)}
                  </span>
                  <span className={styles.cardDate}>
                    <Calendar size={12} /> {formatDate(post.created_at)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && posts.length === 0 && !error && (
        <div className={styles.empty}>
          <Instagram size={64} />
          <p>No hay publicaciones en esta categoría</p>
        </div>
      )}

      {/* Modal */}
      {selectedPost && (
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeModal}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}><X size={28} /></button>

            <div className={styles.modalLayout}>
              <div className={styles.modalMedia}>
                {selectedPost.video ? (
                  <video src={selectedPost.video} controls autoPlay className={styles.modalImage} />
                ) : (
                  <img src={selectedPost.image} alt={selectedPost.category} className={styles.modalImage} />
                )}
              </div>

              <div className={styles.modalSidebar}>
                <div className={styles.modalProfileRow}>
                  <img src={PROFILE.avatar} alt="" className={styles.modalAvatar} />
                  <div>
                    <p className={styles.modalUsername}>{PROFILE.username}</p>
                    <p className={styles.modalLocation}>{selectedPost.category}</p>
                  </div>
                </div>

                <div className={styles.modalCaptionArea}>
                  <p className={styles.modalCaption}>
                    <strong>{PROFILE.username}</strong>{' '}
                    {expandedCaption === selectedPost.id
                      ? selectedPost.caption
                      : selectedPost.caption
                        ? selectedPost.caption.substring(0, 120)
                        : 'Sin descripción'}
                    {selectedPost.caption && selectedPost.caption.length > 120 && (
                      <button
                        className={styles.seeMore}
                        onClick={() => setExpandedCaption(expandedCaption === selectedPost.id ? null : selectedPost.id)}
                      >
                        {expandedCaption === selectedPost.id ? '...menos' : '...más'}
                      </button>
                    )}
                  </p>
                </div>

                <div className={styles.modalMeta}>
                  <div className={styles.modalLikesRow}>
                    <Heart size={18} />
                    <span>{formatLikes(selectedPost.likes)} Me gusta</span>
                  </div>
                  <div className={styles.modalDateRow}>
                    <Calendar size={18} />
                    <span>{formatDate(selectedPost.created_at)}</span>
                  </div>
                </div>

                <a
                  href={selectedPost.permalink || INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalLink}
                >
                  <ExternalLink size={16} />
                  <span>Ver en Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <div className={styles.footer}>
        <p className={styles.footerText}>Seguinos para ver más contenido</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.instagramLink}>
          <Instagram size={22} />
          <span>@{PROFILE.username}</span>
        </a>
      </div>
    </section>
  );
}
