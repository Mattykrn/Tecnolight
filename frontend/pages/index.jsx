/**
 * ============================================
 * PÁGINA PRINCIPAL - HOME
 * ============================================
 * 
 * Página de inicio del sitio web de Tecnolight.
 * Presenta la empresa, sus valores, productos y proyectos destacados.
 * 
 * Componentes principales:
 * - Hero interactivo con animación de ruta
 * - Sección "Quiénes Somos" con historia y estadísticas
 * - Propuestas de valor (seguridad, durabilidad, logística)
 * - Líneas de productos por categoría
 * - Testimonios de clientes
 * - Call-to-action final con WhatsApp y formulario
 * 
 * Datos recibidos:
 * - projects: Array de proyectos activos (desde SSR)
 * 
 * @module HomePage
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Librería de animaciones
import { Shield, Sparkles, Truck, CheckCircle2, ArrowRight, HelpCircle, FileSpreadsheet, Layers, BookOpen } from 'lucide-react'; // Iconos
import InteractiveRoadHero from '../components/InteractiveRoadHero'; // Componente de hero animado
import InstagramGallery from '../components/InstagramGallery';
import styles from '../styles/Home.module.css';

/**
 * Componente principal de la página Home
 * 
 * @param {Object} props - Props del componente
 * @param {Array} props.projects - Lista de proyectos activos desde la API
 */
export default function Home({ projects }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // ============================================
  // DATOS DE CATEGORÍAS DE PRODUCTOS
  // ============================================
  
  /**
   * Array de categorías con iconos y descripciones
   * Se muestra en la sección "Líneas de Productos"
   * Cada categoría tiene un link al catálogo filtrado
   */
  const categories = [
    {
      title: 'Señales Reglamentarias',
      desc: 'Indican limitaciones, prohibiciones y restricciones en la vía pública. Fabricadas bajo norma IRAM.',
      category: 'Reglamentarias',
      icon: <CheckCircle2 size={24} />
    },
    {
      title: 'Señales Preventivas',
      desc: 'Advierten al usuario de la existencia y naturaleza de un peligro en el camino.',
      category: 'Preventivas',
      icon: <HelpCircle size={24} />
    },
    {
      title: 'Señales Informativas',
      desc: 'Guían al conductor en su camino, proporcionando información sobre destinos y servicios.',
      category: 'Informativas',
      icon: <BookOpen size={24} />
    },
    {
      title: 'Cartelería Comercial',
      desc: 'Carteles de gran formato, letras corpóreas y marquesinas para potenciar marcas comerciales.',
      category: 'Cartelería Comercial',
      icon: <Layers size={24} />
    }
  ];

  return (
    <div>
      {/* ============================================
          HEAD: Meta tags para SEO
          ============================================ */}
      <Head>
        <title>Tecnolight - Señalización Vial y Cartelería | Santa Fe</title>
        <meta name="description" content="Tecnolight - Más de 30 años de experiencia fabricando señalización vial homologada y cartelería premium en Santa Fe, Argentina." />
      </Head>

      {/* ============================================
          SECCIÓN 1: HERO INTERACTIVO
          ============================================ */}
      {/* Componente animado con efecto de ruta/calle */}
      <InteractiveRoadHero />

      {/* ============================================
          SECCIÓN 2: HISTORIA Y ESTADÍSTICAS
          ============================================ */}
      {/* Presenta la trayectoria de la empresa con números clave */}
      <section className={`${styles.section} container`}>
        <div className={styles.historyGrid}>
          <div className={styles.historyText}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Quiénes Somos</span>
            <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1.5rem 0' }}>Más de 30 Años Guiando el Tránsito Nacional</h2>
            <p>
              Establecidos en la Ciudad de Santa Fe, **Tecnolight** se ha consolidado como un referente indiscutido en el desarrollo, fabricación e instalación de señalética vial y comercial. Nos impulsa la innovación tecnológica y un estricto compromiso con la seguridad vial nacional.
            </p>
            <p>
              Trabajamos junto a municipios, comunas y empresas constructoras de todo el país, garantizando materiales de alta reflectividad que cumplen con las directrices de la **Ley Nacional de Tránsito N° 24.449**.
            </p>
            <div className={styles.historyStats}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>30+</span>
                <span className={styles.statLabel}>Años de Trayectoria</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>10k+</span>
                <span className={styles.statLabel}>Señales Instaladas</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Material Homologado</span>
              </div>
            </div>
          </div>
          
          <div className={styles.historyVisual}>
            <div className={styles.visualPlaceholder}>
              <Shield size={64} />
              <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Normas IRAM y Vialidad</span>
              <span style={{ fontSize: '0.85rem' }}>Alta Reflectividad 3M</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECCIÓN 3: PROPUESTAS DE VALOR
          ============================================ */}
      {/* Muestra los beneficios clave: seguridad, durabilidad, logística */}
      <section className={`${styles.section}`} style={{ backgroundColor: '#10121A' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Por qué elegirnos</span>
            <h2>Tecnología Reflectiva y Calidad Vial</h2>
            <p>Implementamos los mejores materiales y procesos de ingeniería para asegurar máxima durabilidad en climas extremos.</p>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <Shield className={styles.valueIcon} size={40} />
              <h3>Seguridad Certificada</h3>
              <p>Fabricamos señales bajo la Norma IRAM 3950, asegurando reflectividad y tipografía oficial homologada por vialidad nacional.</p>
            </div>
            <div className={styles.valueCard}>
              <Sparkles className={styles.valueIcon} size={40} />
              <h3>Durabilidad Extrema</h3>
              <p>Estructuras metálicas galvanizadas y acabados con pintura epoxi horneada para resistir la corrosión y el paso de los años.</p>
            </div>
            <div className={styles.valueCard}>
              <Truck className={styles.valueIcon} size={40} />
              <h3>Despliegue y Montaje</h3>
              <p>Ofrecemos logística completa y montaje en obra pública y privada, contando con equipos técnicos especializados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECCIÓN 4: LÍNEAS DE PRODUCTOS
          ============================================ */}
      {/* Grid de categorías con links al catálogo filtrado */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Nuestra Producción</span>
          <h2>Líneas de Productos</h2>
          <p>Explorá nuestro catálogo clasificado según el Código de Tránsito y Cartelería Comercial.</p>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map((cat, idx) => (
            <Link href={`/catalog?category=${encodeURIComponent(cat.category)}`} key={idx}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIconArea}>{cat.icon}</div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <span className={styles.categoryLink}>
                  Ver Más <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================
          SECCIÓN 5: CLIENTES DESTACADOS
          ============================================ */}
      {/* Logos y nombres de clientes que confían en Tecnolight */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Confían en Nosotros</span>
          <h2>Clientes Destacados</h2>
          <p>Municipios, constructoras y empresas de todo el país eligen Tecnolight</p>
        </div>
        <div className={styles.clientsGrid}>
          {['Municipalidad de Santa Fe', 'Vialidad Nacional', 'Constructora del Litoral', 'Parque Industrial Sauce Viejo', 'Puerto de Santa Fe', 'Municipio de Rosario'].map((client, idx) => (
            <div key={idx} className={styles.clientBadge}>
              <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏛️</span>
              <span style={{ fontWeight: 600 }}>{client}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/about" className="btn-secondary">
            Conocé más sobre nosotros <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ============================================
          SECCIÓN 6: TESTIMONIOS
          ============================================ */}
      {/* Casos de éxito con testimonios de clientes (municipios y constructoras) */}
      <section className={`${styles.section}`} style={{ backgroundColor: '#10121A' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Casos de Éxito</span>
            <h2>Garantía de Satisfacción</h2>
            <p>Conocé el testimonio de los municipios y constructoras que confían en Tecnolight.</p>
          </div>

          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <p className={styles.quoteText}>
                "Excelente trabajo en la señalización del ejido urbano. La calidad reflectiva nocturna de los nomencladores de calles mejoró notablemente la visibilidad de los vecinos y turistas."
              </p>
              <div className={styles.clientArea}>
                <span className={styles.clientName}>Ing. Daniel R.</span>
                <span className={styles.clientRole}>Dirección de Obras Públicas - Santa Fe</span>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <p className={styles.quoteText}>
                "Cumplieron perfectamente con los plazos de entrega del tramo de autopista. Sus señales de prevención e información vial aprobaron todas las auditorías viales sin objeciones."
              </p>
              <div className={styles.clientArea}>
                <span className={styles.clientName}>Arq. Carlos M.</span>
                <span className={styles.clientRole}>Gerente de Infraestructura Vial - Constructora del Litoral</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECCIÓN 7: INSTAGRAM GALLERY
          ============================================ */}
      <InstagramGallery />

      {/* ============================================
          SECCIÓN 8: CALL-TO-ACTION FINAL
          ============================================ */}
      {/* Invitación a contactar con botones a formulario y WhatsApp */}
      <section className="container" style={{ padding: '8rem 0 4rem 0' }}>
        <div className={styles.ctaBlock}>
          <h2>¿Necesitás señalizar tu obra o empresa?</h2>
          <p>
            Contactá a uno de nuestros ingenieros de ventas para recibir una cotización formal y asesoría normativa sin cargo.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/contact" className="btn-primary">
              Iniciar Consulta <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/543424567890" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              WhatsApp Directo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// FIN DEL COMPONENTE
// ============================================

// ============================================
// SERVER-SIDE RENDERING (SSR)
// ============================================

/**
 * getServerSideProps: Obtiene datos del backend antes de renderizar
 * 
 * Esta función se ejecuta en el servidor (no en el navegador) cada vez
 * que alguien visita la página Home. Esto mejora el SEO porque el
 * contenido ya está en el HTML inicial.
 * 
 * Flujo:
 * 1. Next.js llama a esta función en el servidor
 * 2. Hace fetch a la API de proyectos activos
 * 3. Pasa los proyectos como props al componente Home
 * 4. El HTML se genera con los datos ya incluidos
 * 
 * Ventajas:
 * - Mejor SEO (Google ve el contenido completo)
 * - Datos siempre actualizados
 * - No requiere JavaScript del lado del cliente para ver el contenido
 * 
 * @returns {Object} props con array de proyectos
 */
export async function getServerSideProps() {
  try {
    // Fetch a la API backend para obtener proyectos activos
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects?active=true`);
    const data = await res.json();
    
    // Pasar proyectos como props al componente
    return {
      props: {
        projects: data.projects || []
      }
    };
  } catch (error) {
    // Si hay error, retornar array vacío para no romper la página
    console.error('Error al obtener proyectos:', error);
    return {
      props: {
        projects: []
      }
    };
  }
}
