import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Shield, MapPin, ArrowUpRight, Building, Route, Anchor, MessageCircle } from 'lucide-react';

const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const HEADING = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 };
const BODY = { fontFamily: "'Inter', sans-serif" };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } })
};

const PROJ_CATS = ['Todo', 'Cartelería', 'Señalización', 'Demarcación', 'Seguridad'];

const fallbackProjects = [
  { title: 'Señalización Urbana - Santa Fe', cat: 'Cartelería', year: '2024', image: '/images/projects/santa-fe-1.jpg', location: 'Santa Fe' },
  { title: 'Autopista Rosario-Córdoba', cat: 'Señalización', year: '2024', image: '/images/projects/autopista-1.jpg', location: 'Santa Fe/Córdoba' },
  { title: 'Puerto de Santa Fe', cat: 'Cartelería', year: '2023', image: '/images/projects/puerto-1.jpg', location: 'Santa Fe' },
  { title: 'Parque Industrial Santa Fe', cat: 'Señalización', year: '2023', image: '/images/projects/parque-1.jpg', location: 'Santa Fe' },
  { title: 'Autopista Rosario-Córdoba Tramo II', cat: 'Cartelería', year: '2023', image: '/images/projects/autopista-2.jpg', location: 'Santa Fe' },
  { title: 'Puerto de Santa Fe - Etapa II', cat: 'Seguridad', year: '2022', image: '/images/projects/puerto-2.jpg', location: 'Santa Fe' },
  { title: 'Demarcación Ruta 9', cat: 'Demarcación', year: '2023', image: '/images/projects/santa-fe-3.jpg', location: 'Santa Fe' },
  { title: 'Puerto San Martín', cat: 'Seguridad', year: '2021', image: '/images/projects/santa-fe-2.jpg', location: 'Santa Fe' },
];

export default function Projects() {
  const [projFilter, setProjFilter] = useState('Todo');
  const projects = fallbackProjects;
  const filtered = projFilter === 'Todo' ? projects : projects.filter(p => p.cat === projFilter);

  return (
    <div>
      <Head>
        <title>Proyectos Realizados | Tecnolight SRL</title>
        <meta name="description" content="Nuestra trayectoria reflejada en obras de señalización vial y cartelería para municipios y constructoras de Argentina." />
      </Head>

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden py-32 max-md:py-28 bg-background">
        <div className="absolute inset-0">
          <Image src="/images/instagram-seleccionadas/g-vial.jpg" alt="Proyecto de señalización vial Tecnolight — rutas y autopistas" fill className="object-cover" sizes="100vw" priority />
          <div className="hex-overlay-hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,0.1)_0%,transparent_60%)]" />
        </div>
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <motion.div className="max-w-[650px]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary flex-shrink-0" />
              <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>Obras y Trayectoria</span>
            </div>
            <h1 className="text-[clamp(2.5rem,4.5vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white m-0" style={HEADING}>
              PROYECTOS<br /><span className="text-primary">REALIZADOS</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-[560px] mt-4" style={BODY}>
              Trabajamos junto a organismos gubernamentales y empresas privadas para equipar rutas, avenidas y desarrollos con señalización duradera y conforme a las regulaciones nacionales.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40 mt-6" style={BODY}>
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-primary" /> +30 años de experiencia</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><Award size={14} className="text-primary" /> Cero reclamos</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> Santa Fe, Argentina</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter + Gallery */}
      <section className="py-20 lg:py-24 relative bg-background" style={{ backgroundImage: "url('/images/hex-pattern.svg')", backgroundSize: '58px 100px' }}>
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <div className="flex flex-wrap gap-2 mb-10">
            {PROJ_CATS.map(cat => (
              <button key={cat} onClick={() => setProjFilter(cat)}
                className={`px-4 py-2 rounded-[4px] text-xs font-semibold transition-all tracking-wide ${projFilter === cat ? 'bg-primary text-white' : 'bg-card border border-white/8 text-muted-foreground hover:border-primary/35 hover:text-foreground'}`}
                style={BODY}>
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 rounded-[6px] overflow-hidden">
              {filtered.map((p, i) => (
                <div key={i} className="group relative aspect-[4/3] overflow-hidden bg-card cursor-pointer">
                  {p.image ? (
                    <Image src={p.image} alt={p.title || ''} fill className="object-cover transition-transform duration-700 group-hover:scale-106" sizes="33vw" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Shield size={48} className="text-white/5" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-primary text-[9px] font-bold tracking-[0.25em] uppercase" style={MONO}>{p.cat || 'Proyecto'}</span>
                      <div className="w-1 h-1 rounded-full bg-white/25" />
                      <span className="text-white/40 text-[9px]" style={MONO}>{p.year || '2024'}</span>
                    </div>
                    <div className="text-white leading-tight group-hover:text-primary transition-colors" style={{ ...HEADING, fontSize: '1.1rem' }}>{p.title}</div>
                  </div>
                  <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 bg-primary rounded-[3px] flex items-center justify-center">
                      <ArrowUpRight size={13} className="text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground text-sm" style={BODY}>
              No hay proyectos en esta categoría aún.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden bg-background" style={{ backgroundImage: "url('/images/hex-pattern.svg')", backgroundSize: '58px 100px' }}>
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <motion.div className="text-center max-w-[600px] mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-4" style={HEADING}>¿Tu Próximo Proyecto?</h2>
            <p className="text-muted-foreground mb-8" style={BODY}>Sumate a la lista de municipios y constructoras que confían en Tecnolight.</p>
            <div className="flex justify-center gap-4 max-md:flex-col max-md:items-center">
              <Link href="/contact" className="btn-primary text-base">
                Solicitar Presupuesto <ArrowRight size={18} />
              </Link>
              <a href={`https://wa.me/5493424278117?text=${encodeURIComponent('Hola Tecnolight, me interesa solicitar un presupuesto para mi obra.')}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

