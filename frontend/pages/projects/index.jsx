import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Shield, MapPin, Quote } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } })
};

export default function Projects({ projects }) {
  return (
    <div>
      <Head>
        <title>Proyectos Realizados | Tecnolight</title>
        <meta name="description" content="Nuestra trayectoria reflejada en obras de señalización vial y cartelería para municipios y constructoras de Argentina." />
      </Head>

      <section className="relative min-h-[60vh] flex items-center overflow-hidden py-32 max-md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/obras/construction-team.webp" alt="" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,0.1)_0%,transparent_60%)]" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />
        </div>
        <div className="texture-stripes" />
        <div className="container-site relative z-[1]">
          <motion.div className="max-w-[650px]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 rounded-full text-xs font-semibold text-[#FF5A1F] mb-6">
              <Award size={14} />
              Obras y Trayectoria
            </div>
            <h1 className="text-[clamp(2.5rem,4.5vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white m-0">
              Proyectos{' '}
              <span className="relative text-[#FF5A1F] inline-block">
                Realizados
                <motion.span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF5A1F] to-transparent rounded origin-left"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-[560px] mt-4">
              Trabajamos junto a organismos gubernamentales y empresas privadas para equipar rutas, avenidas y desarrollos comerciales con señalización duradera y conforme a las regulaciones nacionales.
            </p>
            <motion.div className="flex flex-wrap items-center gap-4 text-sm text-white/40 mt-6" variants={fadeUp}>
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-[#FF5A1F]" /> +30 años de experiencia</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><Award size={14} className="text-[#FF5A1F]" /> Cero reclamos</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#FF5A1F]" /> Santa Fe, Argentina</span>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-[15%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-[400px] mx-auto" />
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/obras/projects-aerial.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="section-overlay-warm" />
        </div>
        <div className="texture-stripes" />
        <div className="container-site relative z-[1]">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div key={project.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF5A1F] hover:shadow-card-hover group">
                  <div className="relative h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform duration-300">🚧</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">{project.location || 'Santa Fe'}</span>
                    {project.client && (
                      <span className="absolute top-3 right-3 bg-[#FF5A1F] text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">{project.client}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-[#FF5A1F] transition-colors">{project.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                    {project.testimonial && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-start gap-2">
                          <Quote size={14} className="text-[#FF5A1F] shrink-0 mt-0.5" />
                          <p className="text-gray-400 text-xs italic leading-relaxed">&ldquo;{project.testimonial}&rdquo;</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div className="text-center py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🚧</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Próximamente</h3>
              <p className="text-gray-500 max-w-md mx-auto">Estamos documentando nuestros proyectos para mostrarlos aquí. Mientras tanto, conocé nuestro catálogo de productos.</p>
              <div className="flex gap-4 justify-center mt-8 max-md:flex-col max-md:items-center">
                <Link href="/catalog" className="btn-primary">Explorar Catálogo <ArrowRight size={18} /></Link>
                <Link href="/contact" className="btn-secondary">Consultar por Obras</Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {projects.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/obras/construction-team.webp" alt="" fill className="object-cover" sizes="100vw" />
            <div className="section-overlay-warm" />
          </div>
          <div className="texture-stripes" />
          <div className="container-site relative z-[1]">
            <motion.div className="text-center max-w-[600px] mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Tu Próximo Proyecto?</h2>
              <p className="text-gray-500 mb-8">Sumate a la lista de municipios y constructoras que confían en Tecnolight para su señalización vial.</p>
              <Link href="/contact" className="btn-primary text-base">
                Solicitar Presupuesto <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects?active=true`);
    const data = await res.json();
    return { props: { projects: data.projects || [] } };
  } catch (error) {
    console.error('Error fetching projects in SSR:', error);
    return { props: { projects: [] } };
  }
}
