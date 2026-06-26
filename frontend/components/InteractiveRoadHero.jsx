/**
 * ============================================
 * COMPONENTE: HERO INTERACTIVO
 * ============================================
 * 
 * Animación principal de la página Home.
 * Simula una ruta/calle con líneas reflectivas y elementos móviles.
 * 
 * Características:
 * - Animación de líneas de ruta con Framer Motion
 * - Efecto de desplazamiento continuo
 * - Estética de señalización vial
 * - Responsive (se adapta a móviles)
 * 
 * Uso:
 * - Importado en pages/index.jsx
 * - Se muestra en la sección superior de la Home
 * 
 * @module InteractiveRoadHero
 */

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Shield, Award, MapPin } from 'lucide-react';
import styles from './InteractiveRoadHero.module.css';

// ─── Señal de tráfico animada ─────────────────────────────────
/**
 * Componente de señal flotante animada
 * 
 * Muestra una señal vial con icono y etiqueta.
 * Incluye animación de entrada y flotación continua.
 * 
 * @param {Object} props - Props del componente
 * @param {string} props.icon - Emoji o icono de la señal
 * @param {string} props.label - Texto descriptivo
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.delay - Retardo en la animación de entrada
 */
function FloatingSign({ icon, label, className, delay = 0 }) {
  return (
    <motion.div
      className={`${styles.floatingSign} ${className}`}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className={styles.floatingSignInner}
      >
        <span className={styles.floatingSignIcon}>{icon}</span>
        <span className={styles.floatingSignLabel}>{label}</span>
      </motion.div>
    </motion.div>
  );
}

// ─── Partícula de carretera ───────────────────────────────────
/**
 * Componente de línea de carretera animada
 * 
 * Simula una línea de centro de ruta que se desplaza.
 * Se usa en la perspectiva de la carretera.
 * 
 * @param {Object} props - Props del componente
 * @param {number} props.index - Índice para escalonar animaciones
 */
function RoadDash({ index }) {
  return (
    <motion.div
      className={styles.roadDash}
      initial={{ x: '-5%' }}
      animate={{ x: '110%' }}
      transition={{
        duration: 1.8,
        delay: index * 0.22,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

// ─── Stats counter animado ────────────────────────────────────
/**
 * Componente de estadística animada
 * 
 * Muestra un valor numérico con icono y etiqueta.
 * Incluye animación de entrada escalonada.
 * 
 * @param {Object} props - Props del componente
 * @param {string} props.value - Valor numérico (ej: "+30 años")
 * @param {string} props.label - Etiqueta descriptiva
 * @param {Component} props.icon - Componente de icono Lucide
 * @param {number} props.delay - Retardo en animación
 */
function StatBadge({ value, label, icon: Icon, delay }) {
  return (
    <motion.div
      className={styles.statBadge}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.statIcon}><Icon size={18} /></span>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </motion.div>
  );
}

// ─── Hero Principal ───────────────────────────────────────────
/**
 * Componente principal del Hero animado
 * 
 * Orquesta todos los elementos visuales:
 * - Fondo con parallax scroll
 * - Señales flotantes con mouse parallax
 * - Contenido principal con CTAs
 * - Indicador de scroll
 * 
 * @returns {JSX.Element} Sección hero completa
 */
export default function InteractiveRoadHero() {
  // Parallax scroll
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // Mouse parallax suave en las señales flotantes
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 25);
      mouseY.set((e.clientY / innerHeight - 0.5) * 15);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className={styles.heroSection} ref={heroRef}>

      {/* ── Fondo con parallax ── */}
      <motion.div className={styles.heroBg} style={{ y: bgY }}>
        {/* Gradiente de asfalto */}
        <div className={styles.asphaltGradient} />

        {/* Grilla perspectiva de carretera */}
        <div className={styles.roadPerspective}>
          <div className={styles.perspectiveGrid} />
          {/* Líneas de carretera animadas */}
          <div className={styles.roadDashContainer}>
            {Array.from({ length: 7 }).map((_, i) => (
              <RoadDash key={i} index={i} />
            ))}
          </div>
        </div>

        {/* Líneas de luz reflectiva */}
        <motion.div
          className={styles.reflectiveGlow}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Señales flotantes con mouse parallax ── */}
      <motion.div
        className={styles.signsLayer}
        style={{ x: springX, y: springY }}
      >
        <FloatingSign icon="🛑" label="Reglamentaria" className={styles.signTopLeft} delay={0.4} />
        <FloatingSign icon="ℹ️" label="Informativa" className={styles.signTopRight} delay={0.6} />
        <FloatingSign icon="🚧" label="Obras" className={styles.signBottomLeft} delay={0.8} />
      </motion.div>

      {/* ── Contenido principal ── */}
      <motion.div className="container" style={{ y: contentY, position: 'relative', zIndex: 2 }}>
        <motion.div
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge institucional */}
          <motion.div className={styles.badge} variants={itemVariants}>
            <span className={styles.badgeDot} />
            +30 Años de Trayectoria en Santa Fe
          </motion.div>

          {/* Título principal */}
          <motion.h1 className={styles.title} variants={itemVariants}>
            Seguridad Vial,{' '}
            <span className={styles.titleHighlight}>
              Calidad
              <motion.span
                className={styles.titleUnderline}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>{' '}
            <br />y Confianza Garantizada
          </motion.h1>

          {/* Subtítulo */}
          <motion.p className={styles.subtitle} variants={itemVariants}>
            Fabricamos e instalamos cartelería vial reglamentaria, preventiva e informativa
            con materiales reflectivos homologados. La empresa líder en señalización vial
            de la región.
          </motion.p>

          {/* CTAs */}
          <motion.div className={styles.ctaGroup} variants={itemVariants}>
            <Link href="/catalog" className="btn-primary">
              Explorar Catálogo <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Solicitar Cotización
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div className={styles.statsRow} variants={itemVariants}>
            <StatBadge value="+30 años" label="de experiencia" icon={Award} delay={1.1} />
            <StatBadge value="+500" label="proyectos ejecutados" icon={Shield} delay={1.3} />
            <StatBadge value="Santa Fe" label="y todo el país" icon={MapPin} delay={1.5} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
