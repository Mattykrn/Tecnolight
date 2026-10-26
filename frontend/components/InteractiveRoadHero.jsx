/* ============================================================
   InteractiveRoadHero.jsx — Hero principal del home
   Logo oficial en grande, texto institucional y glow animado.
   Sin imágenes flotantes ni tarjetas decorativas.
   ============================================================ */

import React, { useEffect, useRef } from 'react';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

// Badge de estadística removido: la info institucional vive en el Hero y las secciones de Sedes/Empresa

export default function InteractiveRoadHero() {
  const heroRef = useRef(null);
  // Efecto parallax: fondo y contenido se mueven a distinta velocidad
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // Mouse-follow removido: ya no hay señales flotantes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-32 pb-32 max-md:min-h-[90vh] max-md:py-24 max-md:pb-28" ref={heroRef}>
      {/* Background — color sólido Tailwind (sin imágenes) */}
      <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-[-10%] w-[120%] h-[120%] max-md:h-full bg-slate-950" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-[#0A0B0D]" />
        <div className="hex-overlay-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,0.15)_0%,transparent_60%)]" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />
        <div className="absolute top-0 left-[20%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" style={{ animation: 'spotlight 6s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-[500px] mx-auto" />
      </motion.div>
      </div>

      {/* Content */}
      <motion.div className="container-site relative z-[2]" style={{ y: contentY }}>
        <motion.div
          className="flex flex-col items-center gap-9 max-w-[1100px] mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex justify-center w-full" variants={itemVariants}>
            <img
              src="/images/logo-tecnolight-white.png"
              alt="Tecno Light S.R.L. — Señalización Vial y Cartelería Reflectiva"
              className="w-full max-w-3xl md:max-w-5xl mx-auto object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
            />
          </motion.div>

          <motion.p
            className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed"
            variants={itemVariants}
          >
            Fabricación y provisión de señalización vial, EPP e indumentaria de trabajo con producción propia.
          </motion.p>

          <motion.div className="flex flex-col items-center gap-5" variants={itemVariants}>
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Distribuidores y convertidores certificados
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center rounded-lg bg-white px-5 py-3 shadow-xl shadow-black/30">
                <img
                  src="/images/avery-dennison-official.svg"
                  alt="Avery Dennison"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
              <div className="inline-flex items-center rounded-lg bg-white px-5 py-3 shadow-xl shadow-black/30">
                <img
                  src="/images/trafficjet-xpress-official.svg"
                  alt="Avery Dennison TrafficJet Xpress — Sistema de impresión digital"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            </div>
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
