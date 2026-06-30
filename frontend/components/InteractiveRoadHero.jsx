import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Shield, Award, MapPin, CheckCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

function FloatingSign({ icon, label, className, delay = 0 }) {
  return (
    <motion.div
      className={twMerge('absolute pointer-events-none hidden lg:block', className)}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1.5 px-[18px] py-3.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,90,31,0.2)] rounded-xl backdrop-blur-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        <span className="text-[1.75rem] leading-none max-sm:text-[1.4rem]">{icon}</span>
        <span className="text-[0.65rem] font-semibold tracking-wider uppercase text-[#FF5A1F] opacity-90">{label}</span>
      </motion.div>
    </motion.div>
  );
}

function StatBadge({ value, label, icon: Icon, delay }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-4 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-xl flex-1 min-w-[160px] transition-colors duration-200 hover:border-[rgba(255,90,31,0.3)] max-md:min-w-[140px] max-md:justify-center"
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
      <motion.div className="absolute inset-[-10%] w-[120%] h-[120%] max-md:h-full" style={{ y: bgY }}>
        <Image
          src="/images/obras/hero-night.webp"
          alt="Carretera iluminada - Seguridad Vial"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-[#0A0B0D]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,0.1)_0%,transparent_60%)]" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-[400px] mx-auto" />
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none z-[1]" style={{ x: springX, y: springY }}>
        <FloatingSign icon="🛑" label="Reglamentaria" className="top-[18%] left-[8%] max-md:left-[2%]" delay={0.4} />
        <FloatingSign icon="ℹ️" label="Informativa" className="top-[15%] right-[8%] max-md:right-[2%]" delay={0.6} />
        <FloatingSign icon="🚧" label="Obras" className="bottom-[22%] left-[8%] max-md:left-[2%]" delay={0.8} />
        <FloatingSign icon="🏗️" label="Proyectos" className="bottom-[22%] right-[8%] max-md:right-[2%]" delay={1.0} />
      </motion.div>

      <motion.div className="container-site relative z-[2]" style={{ y: contentY }}>
        <motion.div
          className="flex flex-col items-start gap-7 max-w-[720px] max-md:items-center max-md:text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="inline-flex items-center gap-2 px-[1.1rem] py-[0.45rem] bg-[rgba(255,90,31,0.12)] border border-[rgba(255,90,31,0.35)] rounded-full text-[0.8rem] font-semibold tracking-wider uppercase text-[#FF5A1F]" variants={itemVariants}>
            <span className="w-[7px] h-[7px] rounded-full bg-[#FF5A1F] animate-pulse" />
            +30 Años de Trayectoria en Santa Fe
          </motion.div>

          <motion.h1 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white m-0" variants={itemVariants}>
            Cuidamos{' '}
            <span className="relative text-[#FF5A1F] inline-block">
              tu Camino
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF5A1F] to-transparent rounded origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </motion.h1>

          <motion.p className="text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-white/60 max-w-[580px] m-0 max-md:text-center" variants={itemVariants}>
            <span className="text-white font-semibold">Soluciones que salvan vidas.</span> Somos la empresa líder en señalización vial de la región, con materiales reflectivos homologados y certificación IRAM 3950.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-4 text-sm text-white/40" variants={itemVariants}>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FF5A1F]" /> Norma IRAM 3950</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FF5A1F]" /> Materiales 3M</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FF5A1F]" /> Vialidad Nacional</span>
          </motion.div>

          <motion.div className="flex flex-wrap gap-4 items-center max-md:justify-center pt-2" variants={itemVariants}>
            <Link href="/catalog" className="btn-primary text-base">
              Explorar Catálogo <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-5 py-2.5 rounded-lg border border-white/30 text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5">
              Solicitar Cotización
            </Link>
          </motion.div>

          <motion.div className="flex flex-wrap gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)] w-full max-md:justify-center" variants={itemVariants}>
            <StatBadge value="+30 años" label="de experiencia" icon={Award} delay={1.1} />
            <StatBadge value="+500" label="proyectos ejecutados" icon={Shield} delay={1.3} />
            <StatBadge value="Santa Fe" label="y todo el país" icon={MapPin} delay={1.5} />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-[3] max-md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          className="w-[6px] h-[6px] rounded-full bg-[#FF5A1F] opacity-70"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
