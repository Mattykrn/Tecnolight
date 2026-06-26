import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Shield, Award, MapPin } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

function FloatingSign({ icon, label, className, delay = 0 }) {
  return (
    <motion.div
      className={twMerge('absolute pointer-events-none', className)}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1.5 px-[18px] py-3.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(245,180,0,0.2)] rounded-xl backdrop-blur-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        <span className="text-[1.75rem] leading-none max-sm:text-[1.4rem]">{icon}</span>
        <span className="text-[0.65rem] font-semibold tracking-wider uppercase text-primary opacity-90">{label}</span>
      </motion.div>
    </motion.div>
  );
}

function RoadDash({ index }) {
  return (
    <motion.div
      className="w-15 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded absolute bottom-[28%]"
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

function StatBadge({ value, label, icon: Icon, delay }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-4 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-xl flex-1 min-w-[160px] transition-colors duration-200 hover:border-[rgba(245,180,0,0.3)] max-md:min-w-[140px] max-md:justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-primary flex items-center shrink-0"><Icon size={18} /></span>
      <span className="text-base font-bold text-text-main whitespace-nowrap">{value}</span>
      <span className="text-xs text-text-muted whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

export default function InteractiveRoadHero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
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
      <motion.div className="absolute inset-[-10%] w-[120%] h-[120%] will-change-transform max-md:will-change-auto" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,180,0,0.12)_0%,transparent_60%),linear-gradient(180deg,#0A0B0D_0%,#0A0B0D_40%,#12141C_100%)]" />
        <div className="absolute inset-0 perspective-[800px] overflow-hidden opacity-45">
          <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[300%] h-[200%] bg-[linear-gradient(rgba(245,180,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(245,180,0,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [transform-origin:bottom_center] [transform:translateX(-50%)_rotateX(72deg)] max-md:[transform:none]" />
        </div>
        <div className="relative w-full h-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <RoadDash key={i} index={i} />
          ))}
        </div>
        <motion.div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-3/5 h-1/2 bg-[radial-gradient(ellipse,rgba(245,180,0,0.06)_0%,transparent_70%)] pointer-events-none animate-glow-pulse"
          style={{ animationDuration: '4s' }}
        />
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none z-[1]" style={{ x: springX, y: springY }}>
        <FloatingSign icon="🛑" label="Reglamentaria" className="top-[18%] left-[8%] max-md:left-[2%]" delay={0.4} />
        <FloatingSign icon="ℹ️" label="Informativa" className="top-[15%] right-[8%] max-md:right-[2%]" delay={0.6} />
        <FloatingSign icon="🚧" label="Obras" className="bottom-[22%] left-[8%] max-md:left-[2%]" delay={0.8} />
      </motion.div>

      <motion.div className="container-site relative z-[2]" style={{ y: contentY }}>
        <motion.div
          className="flex flex-col items-start gap-7 max-w-[720px] max-md:items-center max-md:text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="inline-flex items-center gap-2 px-[1.1rem] py-[0.45rem] bg-[rgba(245,180,0,0.1)] border border-[rgba(245,180,0,0.35)] rounded-full text-[0.8rem] font-semibold tracking-wider uppercase text-primary" variants={itemVariants}>
            <span className="w-[7px] h-[7px] rounded-full bg-primary animate-pulse-slow" />
            +30 Años de Trayectoria en Santa Fe
          </motion.div>

          <motion.h1 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-text-main m-0" variants={itemVariants}>
            Seguridad Vial,{' '}
            <span className="relative text-primary inline-block">
              Calidad
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-transparent rounded origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>{' '}
            <br />y Confianza Garantizada
          </motion.h1>

          <motion.p className="text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-text-muted max-w-[580px] m-0 max-md:text-center" variants={itemVariants}>
            Fabricamos e instalamos cartelería vial reglamentaria, preventiva e informativa
            con materiales reflectivos homologados. La empresa líder en señalización vial
            de la región.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 items-center max-md:justify-center" variants={itemVariants}>
            <Link href="/catalog" className="btn-primary">
              Explorar Catálogo <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Solicitar Cotización
            </Link>
          </motion.div>

          <motion.div className="flex flex-wrap gap-4 pt-2 border-t border-[rgba(255,255,255,0.06)] w-full max-md:justify-center" variants={itemVariants}>
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
          className="w-[6px] h-[6px] rounded-full bg-primary opacity-70"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
