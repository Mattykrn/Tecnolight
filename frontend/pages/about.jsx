import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Shield, Users, Target, Eye, Heart, Scale, ArrowRight, CheckCircle2, MessageCircle, MapPin } from 'lucide-react';

const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const HEADING = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 };
const BODY = { fontFamily: "'Inter', sans-serif" };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } })
};

const WA_NUMBER = '5493424278117';
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Tecnolight, me interesa solicitar un presupuesto para mi obra.')}`;

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function About() {
  return (
    <div>
      <Head>
        <title>Nosotros | Tecnolight SRL — Señalización Vial desde 1994</title>
        <meta name="description" content="Conocé la historia de Tecnolight SRL. Más de 30 años fabricando señalización vial certificada IRAM 3950 en Santa Fe, Argentina." />
      </Head>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden py-32 max-md:py-28 bg-background">
        <div className="absolute inset-0">
          <Image src="/images/instagram-seleccionadas/nosotros-1b.jpg" alt="Equipo Tecnolight — más de 30 años en señalización vial profesional" fill className="object-cover" sizes="100vw" priority />
          <div className="hex-overlay-hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,0.12)_0%,transparent_60%)]" />
        </div>
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <motion.div className="max-w-[700px]" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary flex-shrink-0" />
              <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>+30 Años de Trayectoria</span>
            </div>
            <h1 className="text-[clamp(2.5rem,4.5vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white m-0" style={HEADING}>
              SOBRE<br /><span className="text-primary">TECNOLIGHT</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-[580px] mt-4" style={BODY}>
              Fabricamos señalización vial certificada desde 1994. <strong className="text-white">Cero reclamos por calidad</strong> en más de tres décadas. Sede comercial: Salvador Caputto 3243 | Fábrica: Parque Industrial Los Polígonos, Santa Fe.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <WaIcon size={16} /> Consultar por WhatsApp
              </a>
              <Link href="/contact" className="btn-secondary">
                Contacto <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-background" style={{ backgroundImage: "url('/images/hex-pattern.svg')", backgroundSize: '58px 100px' }}>
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div className="lg:col-span-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary flex-shrink-0" />
                <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>Tecnolight SRL</span>
              </div>
              <h2 className="text-[2.5rem] font-bold text-foreground mb-8 max-md:text-3xl" style={HEADING}>Nuestra Historia</h2>
              <div className="space-y-5 text-white/60 text-base leading-relaxed" style={BODY}>
                <p><strong className="text-foreground">Tecnolight SRL</strong> (CUIT 30-69238932-4) nació formalmente en Santa Fe con operaciones que se remontan a 1994. Desde nuestro taller en <strong className="text-foreground">Salvador Caputto 3243</strong> fabricamos señalización vial con una convicción clara: la seguridad vial en Argentina merecía un salto de calidad.</p>
                <p>Lo que empezó como un pequeño taller de señales metálicas se convirtió en proveedor de confianza de <strong className="text-foreground">municipios, vialidades y constructoras</strong> de la región. Estamos inscriptos en AFIP con actividad 421000 desde 2019, además de la fabricación de carteles y señales.</p>
                <p>Hoy, con más de 10.000 señales instaladas y <strong className="text-foreground">cero reclamos por calidad</strong> en más de tres décadas, somos la opción de quienes no pueden darse el lujo de fallar. Certificación <strong className="text-foreground">IRAM 3950</strong>, materiales <strong className="text-foreground">3M</strong> grado ingeniería.</p>
                <p className="text-foreground font-semibold text-lg pt-4 border-t border-white/10 italic">"No vendemos carteles, tampoco vendemos cascos ni alquilamos vallas... VENDEMOS EXPERIENCIA Y PROFESIONALISMO!!"</p>
              </div>
            </motion.div>
            <motion.div className="lg:col-span-2 space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="relative aspect-[4/3] rounded-[6px] overflow-hidden bg-card">
                <Image src="/images/instagram-seleccionadas/nosotros-1.jpg" alt="Equipo Tecnolight" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
              <div className="bg-card border border-white/6 rounded-[4px] p-4 text-center">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider" style={BODY}>Salvador Caputto 3243, Santa Fe</p>
                <p className="text-[10px] text-white/30" style={MONO}>CUIT 30-69238932-4</p>
                <div className="inline-flex items-center gap-1.5 text-primary bg-primary/10 rounded-full px-3 py-1 text-xs font-semibold mt-2" style={BODY}>
                  <Award size={12} />
                  Cero Reclamos en +30 Años
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px] mx-auto">
            {[
              { number: '1994', label: 'Fundación' },
              { number: '+30', label: 'Años sin Reclamos' },
              { number: '10k+', label: 'Señales Instaladas' },
              { number: '500+', label: 'Proyectos' }
            ].map((stat, i) => (
              <motion.div key={i} className="bg-card border border-white/6 rounded-[4px] p-5 text-center"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="stat-number text-2xl mb-1">{stat.number}</div>
                <span className="text-xs uppercase tracking-wider text-white/50 font-medium" style={BODY}>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-background" style={{ backgroundImage: "url('/images/hex-pattern.svg')", backgroundSize: '58px 100px' }}>
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <motion.div className="text-center max-w-[700px] mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>Hitos</span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-[2.5rem] font-bold text-foreground max-md:text-3xl" style={HEADING}>Nuestra Línea de Tiempo</h2>
            <p className="text-white/50 mt-4" style={BODY}>Cada década, un paso más cerca de la excelencia. Así construimos tres décadas de confianza ininterrumpida.</p>
          </motion.div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent max-md:left-6" />
            {[
              { year: '1994', title: 'Fundación', desc: 'Tecnolight nace en Santa Fe con un taller de señales metálicas y la convicción de que la seguridad vial argentina merecía más calidad.' },
              { year: '1996', title: 'Primer Contrato Municipal', desc: 'La Municipalidad de Santa Fe confía en Tecnolight para la señalización de 12 cruces escolares.' },
              { year: '2001', title: 'Certificación IRAM 3950', desc: 'Obtenemos la certificación IRAM 3950 para señales de tránsito, uno de los primeros talleres del interior en cumplir la norma.' },
              { year: '2008', title: 'Incorporación de 3M', desc: 'Empezamos a trabajar exclusivamente con láminas reflectivas 3M grado ingeniería. La calidad dejó de ser opción para ser el estándar.' },
              { year: '2015', title: 'Nueva Planta Fabril', desc: 'Inauguramos nuestra fábrica en Parque Industrial Los Polígonos, cuadruplicando la capacidad de producción.' },
              { year: '2020', title: 'Proveedor de Vialidad Nacional', desc: 'Somos homologados como proveedor oficial de Vialidad Nacional, el estándar más exigente del país.' },
              { year: 'Hoy', title: '+500 Proyectos, Cero Reclamos', desc: 'Tres décadas después, seguimos en el mismo taller que empezó todo — con más de 10.000 señales instaladas y cero reclamos.' }
            ].map((item, idx) => (
              <motion.div key={idx} className={`flex items-start gap-8 mb-12 relative max-md:gap-4 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse max-md:flex-row'}`}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={idx}>
                <div className={`flex-1 ${idx % 2 === 0 ? 'text-right max-md:text-left' : 'text-left'} max-md:hidden`}>
                  <div className="bg-card border border-white/6 rounded-[4px] inline-block p-6 max-w-md text-left">
                    <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1" style={MONO}>{item.year}</span>
                    <h3 className="text-lg font-bold text-foreground mb-2" style={HEADING}>{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed" style={BODY}>{item.desc}</p>
                  </div>
                </div>
                <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-xs border-4 border-background shadow-md shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 block md:hidden">
                  <div className="bg-card border border-white/6 rounded-[4px] p-4">
                    <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1" style={MONO}>{item.year}</span>
                    <h3 className="text-sm font-bold text-foreground mb-1" style={HEADING}>{item.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed" style={BODY}>{item.desc}</p>
                  </div>
                </div>
                <div className="flex-1 max-md:hidden" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-background" style={{ backgroundImage: "url('/images/hex-pattern.svg')", backgroundSize: '58px 100px' }}>
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div className="relative aspect-[4/3] rounded-[6px] overflow-hidden bg-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Image src="/images/instagram-seleccionadas/nosotros-3.jpg" alt="Instalación de señalización vial" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary flex-shrink-0" />
                <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>Valores</span>
              </div>
              <h2 className="text-[2.2rem] font-bold text-foreground mb-4 max-md:text-3xl" style={HEADING}>Nuestros Valores</h2>
              <p className="text-white/50" style={BODY}>Principios que guían cada señal que fabricamos, cada proyecto que ejecutamos.</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Seguridad ante Todo', desc: 'Cada señal que fabricamos tiene una función: evitar accidentes, multas y problemas legales. No negociamos con la seguridad.' },
              { icon: Award, title: 'Calidad Certificada', desc: 'Materiales 3M, certificación IRAM 3950, aprobación de Vialidad Nacional. No decimos que somos buenos: los certificados lo demuestran.' },
              { icon: Target, title: 'Precisión sin Excepción', desc: 'Tolerancias mínimas, reflectividad exacta, tipografía oficial. Cada detalle importa porque en la ruta no hay margen para el error.' },
              { icon: Heart, title: 'Compromiso en Décadas', desc: '30 años cumpliendo plazos. 30 años sin reclamos por calidad. Esa no es casualidad: es cultura empresarial.' },
              { icon: Users, title: 'Equipo Multidisciplinario', desc: 'Ingenieros, diseñadores y técnicos trabajando coordinados para que su proyecto esté listo cuando usted lo necesita.' },
              { icon: Eye, title: 'Innovación con Propósito', desc: 'Incorporamos reflectivos de última generación y procesos industriales avanzados. La tecnología salva vidas en la ruta.' }
            ].map((v, i) => (
              <motion.div key={i} className="bg-card border border-white/6 rounded-[4px] p-6 hover:border-primary/25 transition-colors" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <span className="inline-flex mb-4 bg-primary/10 p-3 rounded-[4px] text-primary">
                  <v.icon size={24} />
                </span>
                <h3 className="font-bold text-foreground mb-2" style={HEADING}>{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed" style={BODY}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <motion.div className="max-w-[700px] mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>Avales</span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-6" style={HEADING}>Certificaciones y Avales</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Norma IRAM 3950', 'Ley Nacional N° 24.449', 'Materiales 3M', 'Vialidad Nacional', 'AFIP Act. 421000', 'ISO 9001'].map(cert => (
                <span key={cert} className="inline-flex items-center gap-2 bg-card border border-white/6 rounded-[4px] px-4 py-2 text-sm text-white/60" style={BODY}>
                  <CheckCircle2 size={14} className="text-primary" />
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden bg-background" style={{ backgroundImage: "url('/images/hex-pattern.svg')", backgroundSize: '58px 100px' }}>
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <motion.div className="text-center max-w-[600px] mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-foreground mb-4" style={HEADING}>¿Tu Próximo Proyecto?</h2>
            <p className="text-white/50 mb-8" style={BODY}>Sumate a la lista de municipios y constructoras que confían en Tecnolight.</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-8 py-4">
              <WaIcon size={18} /> Consultar por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
