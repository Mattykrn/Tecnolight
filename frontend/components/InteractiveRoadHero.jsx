/* ============================================================
   InteractiveRoadHero.jsx — Hero principal del home
   Parallax de fondo, señales SVG flotantes con mouse-follow,
   badges de estadísticas y glow animado.
   ============================================================ */

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Shield, Award, MapPin, CheckCircle, Star } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// Señal flotante decorativa con animación de rebote vertical
function FloatingSign({ icon, label, className, delay = 0 }) {
  return (
    <motion.div
      className={twMerge('absolute pointer-events-none', className)}
      initial={{ opacity: 0, scale: 0.4, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1.5 px-[20px] py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,90,31,0.25)] rounded-2xl backdrop-blur-[12px] shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <span className="flex items-center justify-center w-8 h-8">{icon}</span>
        <span className="text-[0.6rem] font-semibold tracking-widest uppercase text-[#FF8A50]">{label}</span>
      </motion.div>
    </motion.div>
  );
}

// Badge de estadística con hover highlight
function StatBadge({ value, label, icon: Icon, delay }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-4 py-2.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl flex-1 min-w-[160px] transition-all duration-400 hover:border-[rgba(255,90,31,0.4)] hover:bg-[rgba(255,90,31,0.06)] hover:-translate-y-0.5 max-md:min-w-[140px] max-md:justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-[#FF5A1F] flex items-center shrink-0"><Icon size={18} /></span>
      <span className="text-base font-bold text-white whitespace-nowrap">{value}</span>
      <span className="text-xs text-white/50 whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

export default function InteractiveRoadHero() {
  const heroRef = useRef(null);
  // Efecto parallax: fondo y contenido se mueven a distinta velocidad
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // Mouse-follow suave para las señales flotantes
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
    <section className="relative min-h-screen flex items-center py-32 pb-24 max-md:min-h-[90vh] max-md:py-28 max-md:pb-20" ref={heroRef}>
      {/* Background image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-[-10%] w-[120%] h-[120%] max-md:h-full" style={{ y: bgY }}>
        <Image
          src="/images/instagram-seleccionadas/galeria-3.jpg"
          alt="Señalización vial nocturna - Tecnolight SRL"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="hex-overlay-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-[#0A0B0D]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,0.15)_0%,transparent_60%)]" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />
        <div className="absolute top-0 left-[20%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" style={{ animation: 'spotlight 6s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-[500px] mx-auto" />
      </motion.div>
      </div>

      {/* Floating signs */}
      <motion.div className="absolute inset-0 pointer-events-none z-[1] max-md:hidden" style={{ x: springX, y: springY }}>
        <FloatingSign icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="4" width="24" height="24" rx="4" fill="#cc2222"/>
            <rect x="7" y="7" width="18" height="18" rx="3" fill="none" stroke="white" strokeWidth="2"/>
            <line x1="9" y1="16" x2="23" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        } label="Reglamentaria" className="top-[22%] left-[4%]" delay={0.4} />
        <FloatingSign icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="4" width="24" height="24" rx="4" fill="#1166cc"/>
            <text x="16" y="21" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui">i</text>
          </svg>
        } label="Informativa" className="top-[18%] right-[4%]" delay={0.6} />
        <FloatingSign icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="4" width="24" height="24" rx="4" fill="#e88a00"/>
            <line x1="16" y1="9" x2="16" y2="17" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="16" cy="21" r="1.5" fill="white"/>
          </svg>
        } label="Obras" className="bottom-[30%] left-[4%]" delay={0.8} />
        <FloatingSign icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="4" width="24" height="24" rx="4" fill="#22aa66"/>
            <rect x="11" y="14" width="10" height="12" fill="white" opacity="0.9"/>
            <polygon points="11,14 16,9 21,14" fill="white" opacity="0.9"/>
          </svg>
        } label="Proyectos" className="bottom-[30%] right-[4%]" delay={1.0} />
      </motion.div>

      {/* Decorative hex elements */}
      <div className="absolute max-md:hidden z-[1] hex-deco hex-deco-3 top-[15%] left-[8%] opacity-[0.04]" style={{ animationDelay: '0.5s' }}>
        <svg viewBox="0 0 60 104"><path d="M30 0L60 17.5V52.5L30 70L0 52.5V17.5Z" fill="none" stroke="#FF5A1F" strokeWidth="0.8"/><path d="M30 104L60 86.5V51.5L30 34L0 51.5V86.5Z" fill="none" stroke="#FF5A1F" strokeWidth="0.8"/></svg>
      </div>
      <div className="absolute max-md:hidden z-[1] hex-deco hex-deco-2 bottom-[20%] right-[6%] opacity-[0.05]" style={{ animationDelay: '2s', animationDuration: '8s' }}>
        <svg viewBox="0 0 60 104"><path d="M30 0L60 17.5V52.5L30 70L0 52.5V17.5Z" fill="none" stroke="#FF5A1F" strokeWidth="0.8"/><path d="M30 104L60 86.5V51.5L30 34L0 51.5V86.5Z" fill="none" stroke="#FF5A1F" strokeWidth="0.8"/></svg>
      </div>
      <div className="absolute max-md:hidden z-[1] hex-deco hex-deco-1 top-[45%] right-[15%] opacity-[0.06]" style={{ animationDelay: '1s' }}>
        <svg viewBox="0 0 60 104"><path d="M30 0L60 17.5V52.5L30 70L0 52.5V17.5Z" fill="none" stroke="#FF5A1F" strokeWidth="0.8"/><path d="M30 104L60 86.5V51.5L30 34L0 51.5V86.5Z" fill="none" stroke="#FF5A1F" strokeWidth="0.8"/></svg>
      </div>

      {/* Content */}
      <motion.div className="container-site relative z-[2]" style={{ y: contentY }}>
        <motion.div
          className="flex flex-col items-start gap-7 max-w-[760px] max-md:items-center max-md:text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="inline-flex items-center gap-2 px-[1.1rem] py-[0.45rem] bg-[rgba(255,90,31,0.12)] border border-[rgba(255,90,31,0.35)] rounded-full text-[0.8rem] font-semibold tracking-wider uppercase text-[#FF5A1F]" variants={itemVariants}>
            <span className="w-[7px] h-[7px] rounded-full bg-[#FF5A1F] animate-pulse" />
            +30 Años de Trayectoria en Santa Fe
          </motion.div>

          <motion.div className="flex items-center gap-3" variants={itemVariants}>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF5A1F]/40 shadow-lg shadow-[#FF5A1F]/20">
              <Image
                src="/images/logo-tecnolight.png"
                alt="Tecno Light"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-wider text-white leading-none">TECNO LIGHT SRL</span>
              <span className="text-[8px] uppercase tracking-[0.15em] font-semibold text-[#FF5A1F] leading-none mt-0.5">Se&ntilde;alizaci&oacute;n Vial</span>
            </div>
          </motion.div>

          <motion.h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white m-0" variants={itemVariants}>
            Cuidamos{' '}
            <span className="relative inline-block">
              <span className="text-gradient">tu Camino</span>
              <motion.span
                className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF5A1F] via-[#FF8A50] to-transparent rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </motion.h1>

          <motion.p className="text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-white/70 max-w-[600px] m-0 max-md:text-center" variants={itemVariants}>
            <span className="text-white font-semibold">Soluciones que salvan vidas.</span> Empresa l&iacute;der en se&ntilde;alizaci&oacute;n vial con materiales reflectivos homologados y certificaci&oacute;n IRAM 3950.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-5 text-sm text-white/50" variants={itemVariants}>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FF5A1F]" /> Norma IRAM 3950</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FF5A1F]" /> Materiales 3M</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FF5A1F]" /> Vialidad Nacional</span>
          </motion.div>

          <motion.div className="flex flex-wrap gap-4 items-center max-md:justify-center pt-3" variants={itemVariants}>
            <Link href="/projects" className="btn-primary text-base shadow-lg shadow-[#FF5A1F]/20">
              Ver Proyectos <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/[0.08] text-white font-semibold px-6 py-3 rounded-xl border border-white/[0.2] text-sm transition-all duration-300 hover:bg-white/[0.15] hover:border-white/[0.4] hover:-translate-y-0.5 backdrop-blur-sm">
              Solicitar Cotizaci&oacute;n
            </Link>
          </motion.div>

          <motion.div className="flex flex-wrap gap-4 pt-5 border-t border-[rgba(255,255,255,0.06)] w-full max-md:justify-center" variants={itemVariants}>
            <StatBadge value="+30 años" label="de experiencia" icon={Award} delay={1.1} />
            <StatBadge value="+500" label="proyectos ejecutados" icon={Shield} delay={1.3} />
            <StatBadge value="Santa Fe" label="y todo el país" icon={MapPin} delay={1.5} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[3] max-md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          className="w-[5px] h-[5px] rounded-full bg-[#FF5A1F]"
          animate={{ y: [0, 8, 0], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
