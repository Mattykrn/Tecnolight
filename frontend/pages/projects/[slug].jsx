import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, User, Calendar, MessageSquare } from 'lucide-react';
import styles from '../../styles/ProjectDetail.module.css';

export default function ProjectDetail({ project }) {
  if (!project) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h1>Proyecto no encontrado</h1>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>El proyecto que buscas no existe o fue eliminado.</p>
        <Link href="/projects" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
          <ArrowLeft size={18} /> Volver a Proyectos
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} container`}>
      <Head>
        <title>{project.title} | Tecnolight</title>
        <meta name="description" content={project.description?.substring(0, 160)} />
      </Head>

      <Link href="/projects" className={styles.backLink}>
        <ArrowLeft size={18} /> Volver a Proyectos
      </Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.badge}>Proyecto Realizado</span>
          <h1 className={styles.title}>{project.title}</h1>
          <div className={styles.meta}>
            {project.client && (
              <span className={styles.metaItem}><User size={16} /> {project.client}</span>
            )}
            {project.location && (
              <span className={styles.metaItem}><MapPin size={16} /> {project.location}</span>
            )}
            <span className={styles.metaItem}>
              <Calendar size={16} /> {new Date(project.createdAt).toLocaleDateString('es-AR')}
            </span>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.description}>
            <h2>Descripción del Trabajo</h2>
            <p>{project.description}</p>
          </div>

          {project.images && project.images.length > 0 && (
            <div className={styles.gallery}>
              <h2>Galería del Proyecto</h2>
              <div className={styles.imageGrid}>
                {project.images.map((img, i) => (
                  <motion.div
                    key={i}
                    className={styles.imageCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <img src={img} alt={`${project.title} - imagen ${i + 1}`} loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {project.testimonial && (
            <div className={styles.testimonial}>
              <MessageSquare size={20} className={styles.quoteIcon} />
              <blockquote>"{project.testimonial}"</blockquote>
            </div>
          )}
        </div>

        <div className={styles.ctaSection}>
          <h3>¿Necesitás un trabajo similar?</h3>
          <p>Contactanos para recibir asesoramiento y presupuesto personalizado.</p>
          <Link href="/contact" className="btn-primary">
            Solicitar Presupuesto
          </Link>
        </div>
      </article>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects/${params.slug}`);
    if (!res.ok) {
      return { props: { project: null } };
    }
    const data = await res.json();
    return { props: { project: data.project || data } };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { props: { project: null } };
  }
}
