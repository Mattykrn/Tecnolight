/**
 * ============================================
 * PÁGINA DE PROYECTOS - PORTFOLIO
 * ============================================
 * 
 * Galería de proyectos realizados por Tecnolight.
 * Muestra trabajos completados con testimonios de clientes.
 * Ahora incluye galería de Instagram embebida.
 * 
 * Características:
 * - Grid responsive de proyectos
 * - Información de cliente y ubicación
 * - Testimonios destacados
 * - Galería de Instagram integrada
 * - SSR para cargar proyectos desde el servidor
 * 
 * @module ProjectsPage
 */

import React from 'react';
import Head from 'next/head';
import { Compass, MessageSquare } from 'lucide-react';
import InstagramGallery from '../../components/InstagramGallery';
import styles from '../../styles/Projects.module.css';

export default function Projects({ projects }) {
  return (
    <div className={`${styles.container} container`}>
      <Head>
        <title>Proyectos Realizados | Tecnolight</title>
        <meta name="description" content="Nuestra trayectoria reflejada en obras de señalización vial y cartelería para municipios y constructoras de Argentina." />
      </Head>

      <div className={styles.intro}>
        <span style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Obras y Trayectoria</span>
        <h1>Proyectos Realizados</h1>
        <p>
          Trabajamos junto a organismos gubernamentales y empresas privadas para equipar rutas, avenidas y desarrollos comerciales con señalización duradera y conforme a las regulaciones nacionales.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.visualArea}>
                <span className={styles.locationTag}>{project.location}</span>
                <span className={styles.clientTag}>{project.client}</span>
                <div className={styles.visualOverlay}>
                  <div className={styles.projectIconSign}>
                    <span className={styles.projectIconSignText}>🚧</span>
                  </div>
                </div>
              </div>

              <div className={styles.content}>
                <h2>{project.title}</h2>
                <p className={styles.desc}>{project.description}</p>
                {project.testimonial && (
                  <div className={styles.testimonial}>
                    <p>
                      <MessageSquare size={16} style={{ display: 'inline', marginRight: '6px', color: 'var(--color-primary)', verticalAlign: 'middle' }} />
                      "{project.testimonial}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>No se encontraron proyectos</h3>
          <p>Intentá nuevamente más tarde.</p>
        </div>
      )}

      {/* Galería de Instagram integrada */}
      <InstagramGallery />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects?active=true`);
    const data = await res.json();

    return {
      props: {
        projects: data.projects || []
      }
    };
  } catch (error) {
    console.error('Error fetching projects in SSR:', error);
    return {
      props: {
        projects: []
      }
    };
  }
}