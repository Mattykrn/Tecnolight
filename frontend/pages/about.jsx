/**
 * ============================================
 * PÁGINA NOSOTROS - TECNOLIGHT SRL
 * ============================================
 * 
 * Página institucional con historia, valores y trayectoria de la empresa.
 * 
 * Secciones:
 * - Historia y trayectoria (30+ años)
 * - Misión, Visión y Valores
 * - Clientes destacados (municipios, constructoras, empresas)
 * - Certificaciones y normativas
 * - Estadísticas clave
 * 
 * Datos:
 * - No requiere datos externos (contenido estático)
 * 
 * @module AboutPage
 */

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Award, Shield, Users, Building2, CheckCircle2, Target, Eye, Heart, ArrowRight } from 'lucide-react';
import styles from '../styles/About.module.css';

/**
 * Componente de página Nosotros
 * 
 * @returns {JSX.Element} Página institucional completa
 */
export default function About() {
  // ============================================
  // DATOS INSTITUCIONALES
  // ============================================
  
  /**
   * Historia de la empresa
   * Texto completo sobre la trayectoria de Tecnolight
   */
  const companyHistory = {
    founded: 1993,
    years: 30,
    location: 'Santa Fe, Argentina',
    description: `
      Tecnolight SRL nació en 1993 en la ciudad de Santa Fe con la visión de transformar 
      la seguridad vial en Argentina. Fundada por un equipo de ingenieros apasionados por 
      la señalización y la seguridad en el tránsito, la empresa comenzó como un pequeño 
      taller de fabricación de señales metálicas.
      
      A lo largo de más de tres décadas, hemos crecido hasta convertirnos en referentes 
      nacionales en señalización vial y cartelería comercial. Nuestra trayectoria está 
      marcada por la innovación constante, la calidad en cada producto y el compromiso 
      inquebrantable con la seguridad de las personas.
      
      Hoy, con más de 10,000 señales instaladas en todo el país, seguimos impulsando 
      proyectos que salvan vidas y mejoran la movilidad urbana y rural.
    `
  };

  /**
   * Valores corporativos
   * Principios que guían las decisiones y acciones de la empresa
   */
  const values = [
    {
      icon: <Shield size={32} />,
      title: 'Seguridad',
      description: 'Priorizamos la protección de las personas en cada proyecto. Cada señal que fabricamos está diseñada para salvar vidas.'
    },
    {
      icon: <Award size={32} />,
      title: 'Calidad',
      description: 'Utilizamos materiales de primera calidad y cumplimos con normativas IRAM y Vialidad Nacional en cada producto.'
    },
    {
      icon: <Target size={32} />,
      title: 'Precisión',
      description: 'Fabricamos con tolerancias mínimas y especificaciones exactas para garantizar durabilidad y reflectividad óptima.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Compromiso',
      description: 'Cumplimos con plazos de entrega y acompañamos a nuestros clientes en cada etapa del proyecto.'
    },
    {
      icon: <Users size={32} />,
      title: 'Trabajo en Equipo',
      description: 'Nuestro equipo multidisciplinario de ingenieros, diseñadores y técnicos trabaja de forma coordinada.'
    },
    {
      icon: <Eye size={32} />,
      title: 'Innovación',
      description: 'Incorporamos tecnologías de vanguardia en materiales reflectivos y procesos de fabricación.'
    }
  ];

  /**
   * Clientes destacados
   * Empresas, municipios y organismos que confían en Tecnolight
   */
  const clients = [
    { name: 'Municipalidad de Santa Fe', type: 'Gobierno', projects: 15, icon: '🏛️' },
    { name: 'Vialidad Nacional', type: 'Gobierno', projects: 8, icon: '🛣️' },
    { name: 'Constructora del Litoral', type: 'Privada', projects: 12, icon: '🏗️' },
    { name: 'Parque Industrial Sauce Viejo', type: 'Privado', projects: 3, icon: '🏭' },
    { name: 'Puerto de Santa Fe', type: 'Estatal', projects: 5, icon: '⚓' },
    { name: 'Municipio de Rosario', type: 'Gobierno', projects: 10, icon: '🏛️' },
    { name: 'Autopista Rosario-Córdoba', type: 'Concesionaria', projects: 2, icon: '🛣️' },
    { name: 'Municipio de Córdoba', type: 'Gobierno', projects: 7, icon: '🏛️' }
  ];

  /**
   * Certificaciones y normativas
   * Estándares que cumple la empresa
   */
  const certifications = [
    'Norma IRAM 3950 - Señales de Tránsito',
    'Ley Nacional de Tránsito N° 24.449',
    'Materiales Reflectivos Grado Ingeniería',
    'ISO 9001 - Gestión de Calidad',
    'Vialidad Nacional - Proveedor Homologado'
  ];

  // ============================================
  // ANIMACIONES
  // ============================================
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // ============================================
  // RENDERIZADO
  // ============================================
  
  return (
    <div className={styles.aboutPage}>
      {/* ============================================
          HEAD: Meta tags SEO
          ============================================ */}
      <Head>
        <title>Nosotros - Tecnolight SRL | 30 Años de Trayectoria</title>
        <meta name="description" content="Conocé la historia de Tecnolight SRL, empresa líder en señalización vial con más de 30 años de experiencia en Santa Fe, Argentina." />
        <meta name="keywords" content="Tecnolight, señalización vial Santa Fe, cartelería Santa Fe, historia empresa, IRAM, Vialidad Nacional" />
      </Head>

      {/* ============================================
          HERO: Título principal
          ============================================ */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.heroLabel}>Nuestra Historia</span>
            <h1 className={styles.heroTitle}>
              Más de 30 Años Guiando el Tránsito Nacional
            </h1>
            <p className={styles.heroSubtitle}>
              Desde 1993, fabricando seguridad y confianza en cada señal
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SECCIÓN 1: HISTORIA Y TRAYECTORIA
          ============================================ */}
      <section className={styles.historySection}>
        <div className="container">
          <div className={styles.historyGrid}>
            <motion.div
              className={styles.historyContent}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className={styles.sectionLabel}>Trayectoria</span>
              <h2 className={styles.sectionTitle}>Una Historia de Compromiso y Calidad</h2>
              <div className={styles.historyText}>
                {companyHistory.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>1993</span>
                  <span className={styles.statLabel}>Año de Fundación</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>30+</span>
                  <span className={styles.statLabel}>Años de Experiencia</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>10k+</span>
                  <span className={styles.statLabel}>Señales Instaladas</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Proyectos Ejecutados</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.historyVisual}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.visualCard}>
                <div className={styles.visualIcon}>
                  <Building2 size={64} />
                </div>
                <h3>Tecnolight SRL</h3>
                <p>Santa Fe, Argentina</p>
                <div className={styles.visualBadge}>
                  <Award size={20} />
                  <span>+30 Años de Trayectoria</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECCIÓN 2: MISIÓN, VISIÓN Y VALORES
          ============================================ */}
      <section className={styles.valuesSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionLabel}>Nuestra Esencia</span>
            <h2 className={styles.sectionTitle}>Misión, Visión y Valores</h2>
          </motion.div>

          <div className={valuesSectionGrid}>
            <motion.div
              className={valuesCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className={valuesIconWrapper}>
                <Target size={40} />
              </div>
              <h3>Misión</h3>
              <p>
                Fabricar e instalar señalización vial y cartelería de alta calidad, 
                contribuyendo a la seguridad de las personas y el ordenamiento del 
                tránsito en todo el territorio argentino.
              </p>
            </motion.div>

            <motion.div
              className={valuesCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className={valuesIconWrapper}>
                <Eye size={40} />
              </div>
              <h3>Visión</h3>
              <p>
                Ser la empresa líder en señalización vial de Argentina, reconocida 
                por la excelencia en productos, innovación tecnológica y compromiso 
                con la seguridad vial nacional.
              </p>
            </motion.div>

            <motion.div
              className={valuesCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className={valuesIconWrapper}>
                <Heart size={40} />
              </div>
              <h3>Valores</h3>
              <ul>
                <li><CheckCircle2 size={16} /> Seguridad y protección</li>
                <li><CheckCircle2 size={16} /> Calidad en cada detalle</li>
                <li><CheckCircle2 size={16} /> Compromiso con el cliente</li>
                <li><CheckCircle2 size={16} /> Innovación constante</li>
                <li><CheckCircle2 size={16} /> Trabajo en equipo</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECCIÓN 3: VALORES CORPORATIVOS
          ============================================ */}
      <section className={styles.principlesSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionLabel}>Principios</span>
            <h2 className={styles.sectionTitle}>Lo que nos Define</h2>
          </motion.div>

          <motion.div
            className={styles.principlesGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, idx) => (
              <motion.div key={idx} className={styles.principleCard} variants={itemVariants}>
                <div className={styles.principleIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SECCIÓN 4: CLIENTES DESTACADOS
          ============================================ */}
      <section className={styles.clientsSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionLabel}>Confían en Nosotros</span>
            <h2 className={styles.sectionTitle}>Clientes Destacados</h2>
            <p className={styles.sectionSubtitle}>
              Trabajamos con municipios, constructoras y empresas de todo el país
            </p>
          </motion.div>

          <motion.div
            className={styles.clientsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {clients.map((client, idx) => (
              <motion.div key={idx} className={styles.clientCard} variants={itemVariants}>
                <div className={styles.clientIcon}>{client.icon}</div>
                <div className={styles.clientInfo}>
                  <h3>{client.name}</h3>
                  <span className={styles.clientType}>{client.type}</span>
                  <span className={styles.clientProjects}>{client.projects} proyectos</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SECCIÓN 5: CERTIFICACIONES
          ============================================ */}
      <section className={styles.certificationsSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionLabel}>Calidad Certificada</span>
            <h2 className={styles.sectionTitle}>Normativas y Certificaciones</h2>
          </motion.div>

          <motion.div
            className={styles.certificationsList}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {certifications.map((cert, idx) => (
              <div key={idx} className={styles.certificationItem}>
                <CheckCircle2 size={24} className={styles.certIcon} />
                <span>{cert}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================
          CTA FINAL
          ============================================ */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2>¿Querés ser parte de nuestra historia?</h2>
            <p>
              Sumate a los más de 500 proyectos que hemos realizado en todo el país.
              Consultanos por tu proyecto de señalización.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/contact" className="btn-primary">
                Contactanos <ArrowRight size={18} />
              </a>
              <a href="/catalog" className="btn-secondary">
                Ver Catálogo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// ESTILOS ESPECÍFICOS (si no están en CSS)
// ============================================

const valuesSectionGrid = `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const valuesCard = `
  background: var(--color-bg-dark);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--color-primary);
    box-shadow: 0 10px 30px rgba(245, 180, 0, 0.1);
  }
  
  h3 {
    color: var(--color-primary);
    font-size: 1.5rem;
    margin: 1rem 0 0.5rem 0;
  }
  
  p {
    color: var(--color-text-muted);
    line-height: 1.6;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.75rem 0;
      color: var(--color-text-muted);
      
      svg {
        color: var(--color-primary);
        flex-shrink: 0;
      }
    }
  }
`;

const valuesIconWrapper = `
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
`;