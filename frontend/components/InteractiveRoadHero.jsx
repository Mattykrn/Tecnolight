import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Shield, Award, MapPin, CheckCircle, Star } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

function FloatingSign({ icon, label, className, delay = 0 }) {
  return (
    <motion.div
      className={twMerge('absolute pointer-events-none hidden lg:block', className)}
      initial={{ opacity: 0, scale: 0.4, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1.5 px-[20px] py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,90,31,0.25)] rounded-2xl backdrop-blur-[12px] shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <span className="text-[2rem] leading-none">{icon}</span>
        <span className="text-[0.6rem] font-semibold tracking-widest uppercase text-[#FF8A50]">{label}</span>
      </motion.div>
    </motion.div>
  );
}

function StatBadge({ value, label, icon: Icon, delay }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-4 py-2.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl flex-1 min-w-[160px] transition-all duration-300 hover:border-[rgba(255,90,31,0.4)] hover:bg-[rgba(255,90,31,0.04)] max-md:min-w-[140px] max-md:justify-center"
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
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

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
    <section className="relative min-h-screen flex items-center overflow-hidden py-32 pb-24 max-md:min-h-auto max-md:py-28 max-md:pb-20" ref={heroRef}>
      {/* Background image with parallax */}
      <motion.div className="absolute inset-[-10%] w-[120%] h-[120%] max-md:h-full" style={{ y: bgY }}>
        <Image
          src="/images/obras/hero-night.webp"
          alt="Carretera iluminada - Seguridad Vial"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-[#0A0B0D]" />
        {/* Warm glow from top */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,0.15)_0%,transparent_60%)]" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />
        {/* Ambient light beam */}
        <div className="absolute top-0 left-[20%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" style={{ animation: 'spotlight 6s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-[500px] mx-auto" />
      </motion.div>

      {/* Floating signs */}
      <motion.div className="absolute inset-0 pointer-events-none z-[1]" style={{ x: springX, y: springY }}>
        <FloatingSign icon="🛑" label="Reglamentaria" className="top-[20%] left-[6%]" delay={0.4} />
        <FloatingSign icon="ℹ️" label="Informativa" className="top-[16%] right-[6%]" delay={0.6} />
        <FloatingSign icon="🚧" label="Obras" className="bottom-[25%] left-[6%]" delay={0.8} />
        <FloatingSign icon="🏗️" label="Proyectos" className="bottom-[25%] right-[6%]" delay={1.0} />
      </motion.div>

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

          <motion.p className="text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-white/60 max-w-[600px] m-0 max-md:text-center" variants={itemVariants}>
            <span className="text-white font-semibold">Soluciones que salvan vidas.</span> Somos la empresa líder en señalización vial de la región, con materiales reflectivos homologados y certificación IRAM 3950.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-5 text-sm text-white/40" variants={itemVariants}>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FF5A1F]" /> Norma IRAM 3950</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FF5A1F]" /> Materiales 3M</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FF5A1F]" /> Vialidad Nacional</span>
          </motion.div>

          <motion.div className="flex flex-wrap gap-4 items-center max-md:justify-center pt-2" variants={itemVariants}>
            <Link href="/catalog" className="btn-primary text-base shadow-lg shadow-[#FF5A1F]/20">
              Explorar Catálogo <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/5 text-white font-semibold px-5 py-2.5 rounded-lg border border-white/20 text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 backdrop-blur-sm">
              Solicitar Cotización
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
