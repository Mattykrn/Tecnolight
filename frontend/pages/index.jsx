import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, ArrowRight, HelpCircle, Layers, BookOpen, MapPin, Award, Star, TrendingUp, MessageCircle, Users } from 'lucide-react';
import InteractiveRoadHero from '../components/InteractiveRoadHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } })
};

const categories = [
  { title: 'Señales Reglamentarias', desc: 'Indican limitaciones, prohibiciones y restricciones en la vía pública. Fabricadas bajo norma IRAM 3950.', category: 'Reglamentarias', emoji: '🛑' },
  { title: 'Señales Preventivas', desc: 'Advierten al conductor sobre peligros potenciales en el camino. Esenciales para prevenir accidentes.', category: 'Preventivas', emoji: '⚠️' },
  { title: 'Señales Informativas', desc: 'Guían al usuario proporcionando información sobre destinos, servicios y distancias.', category: 'Informativas', emoji: 'ℹ️' },
  { title: 'Cartelería Comercial', desc: 'Carteles de gran formato, letras corpóreas y marquesinas que potencian marcas con diseño premium.', category: 'Cartelería Comercial', emoji: '🏢' }
];

const values = [
  { icon: <Shield size={28} />, title: 'Seguridad ante Todo', desc: 'Cada señal evita accidentes, multas y problemas legales. No negociamos con la seguridad.' },
  { icon: <Award size={28} />, title: 'Calidad Certificada', desc: 'IRAM 3950, materiales 3M y aprobación de Vialidad Nacional en cada producto.' },
  { icon: <Star size={28} />, title: 'Durabilidad Extrema', desc: 'Estructuras galvanizadas con pintura epoxi horneada que resisten décadas a la intemperie.' },
  { icon: <TrendingUp size={28} />, title: 'Cumplimiento Garantizado', desc: 'Trabajamos con gobiernos desde 1993. Las obras públicas no aceptan demoras y nosotros tampoco.' },
];

export default function Home({ projects }) {
  return (
    <div>
      <Head>
        <title>Tecnolight - Señalización Vial y Cartelería | Santa Fe</title>
        <meta name="description" content="Fabricamos e instalamos señalización vial homologada IRAM y cartelería premium en Santa Fe. Más de 30 años protegiendo vidas en la ruta." />
      </Head>

      <InteractiveRoadHero />

      <div className="section-divider" />

      <section className="py-28 relative overflow-hidden" id="productos">
        <div className="absolute inset-0">
          <Image src="/images/obras/highway-signs.webp" alt="" fill className="object-cover max-md:object-[70%]" sizes="100vw" />
          <div className="section-overlay-warm" />
        </div>
        <div className="texture-stripes" />
        <div className="glow-right" />
        <div className="container-site relative z-[1]">
          <motion.div className="text-center max-w-[650px] mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 rounded-full text-xs font-semibold text-[#FF5A1F] mb-4">
              <Layers size={14} />
              Soluciones para Cada Necesidad
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Nuestros Productos</h2>
            <p className="text-gray-500 leading-relaxed">No son solo señales. Son herramientas que ordenan el tránsito, previenen accidentes, evitan multas y <strong className="text-gray-900">protegen a su comunidad</strong>.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link href={`/catalog?category=${encodeURIComponent(cat.category)}`} key={i}>
                <motion.div className="group bg-white/90 backdrop-blur-sm rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 h-full flex flex-col hover:-translate-y-2 hover:border-[#FF5A1F] hover:shadow-[0_12px_40px_-12px_rgba(255,90,31,0.2)]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                  <div className="h-36 bg-gradient-to-br from-orange-50 to-white flex items-center justify-center relative">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
                    <div className="absolute top-3 right-3 bg-[#FF5A1F] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">IRAM</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#FF5A1F] transition-colors">{cat.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{cat.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5A1F] mt-auto">Ver Más <ArrowRight size={16} /></span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 relative overflow-hidden" id="proyectos">
        <div className="absolute inset-0">
          <Image src="/images/obras/construction-team.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="section-overlay-dark" />
        </div>
        <div className="texture-grid" />
        <div className="container-site relative z-[1]">
          <motion.div className="text-center max-w-[650px] mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 rounded-full text-xs font-semibold text-[#FF5A1F] mb-4">
              <Award size={14} />
              Resultados que Hablan
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Proyectos Realizados</h2>
            <p className="text-white/60 leading-relaxed"><strong className="text-white">Cero reclamos por calidad.</strong> Esa es nuestra mejor carta de presentación. Municipios y constructoras confían en nosotros.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? projects.slice(0, 6).map((project, i) => (
              <motion.div key={project.id} className="group card-glass overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#FF5A1F] hover:shadow-[0_20px_60px_-15px_rgba(255,90,31,0.25)]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-5xl opacity-20">🚧</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {project.location && <span className="absolute top-3 left-3 bg-black/40 text-white/80 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">{project.location}</span>}
                  {project.client && <span className="absolute top-3 right-3 bg-[#FF5A1F]/80 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">{project.client}</span>}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-base mb-2 text-white">{project.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                  {project.testimonial && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-white/40 text-xs italic leading-relaxed line-clamp-2">&ldquo;{project.testimonial}&rdquo;</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )) : (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card-glass p-8 text-center">
                  <span className="text-4xl block mb-4 opacity-30">🚧</span>
                  <h3 className="font-bold text-white mb-2">Proyecto {i + 1}</h3>
                  <p className="text-white/50 text-sm">Señalización vial completa para municipio de Santa Fe.</p>
                </div>
              ))
            )}
          </div>

          <motion.div className="text-center mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Link href="/projects" className="inline-flex items-center gap-2.5 bg-[#FF5A1F] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:bg-[#E04E1A] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FF5A1F]/25">
              Ver Todos los Proyectos <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-28 relative overflow-hidden" id="nosotros">
        <div className="absolute inset-0">
          <Image src="/images/obras/construction-team.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="section-overlay-warm" />
        </div>
        <div className="texture-stripes" />
        <div className="glow-left" />
        <div className="container-site relative z-[1]">
          <motion.div className="text-center max-w-[650px] mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 rounded-full text-xs font-semibold text-[#FF5A1F] mb-4">
              <Users size={14} />
              Quiénes Somos
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">30 Años Cuidando tu Camino</h2>
            <p className="text-gray-500 leading-relaxed max-w-[550px] mx-auto">Desde 1993 fabricamos señalización vial homologada en Santa Fe. <strong className="text-gray-900">Cero reclamos por calidad en tres décadas.</strong></p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {values.map((v, i) => (
              <motion.div key={i} className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:border-[#FF5A1F] hover:shadow-card-hover text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <span className="inline-flex mb-4 bg-[#FF5A1F]/10 p-3 rounded-xl text-[#FF5A1F] group-hover:bg-[#FF5A1F] group-hover:text-white transition-all duration-300">{v.icon}</span>
                <h3 className="text-base font-bold mb-2 text-gray-900">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px] mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {[
              { number: '1993', label: 'Fundación' },
              { number: '30+', label: 'Años sin Reclamos' },
              { number: '10k+', label: 'Señales Instaladas' },
              { number: '500+', label: 'Proyectos' }
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-b from-orange-50 to-white border border-orange-100/50 rounded-xl p-5 text-center">
                <span className="text-2xl font-extrabold text-[#FF5A1F] block mb-1">{stat.number}</span>
                <span className="text-xs uppercase tracking-wider text-gray-400">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Link href="/about" className="inline-flex items-center gap-2 text-[#FF5A1F] font-semibold text-sm transition-all duration-300 hover:gap-3">
              Conocer más sobre nosotros <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {[
              { name: 'Municipalidad de Santa Fe', icon: '🏛️' },
              { name: 'Vialidad Nacional', icon: '🛣️' },
              { name: 'Constructora del Litoral', icon: '🏗️' },
              { name: 'Parque Industrial', icon: '🏭' },
              { name: 'Puerto de Santa Fe', icon: '⚓' },
              { name: 'Municipio de Rosario', icon: '🏛️' }
            ].map((client, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center border border-gray-100 transition-all duration-300 hover:border-[#FF5A1F] hover:-translate-y-1 hover:shadow-sm">
                <span className="text-2xl block mb-1.5">{client.icon}</span>
                <span className="font-semibold text-[11px] text-gray-800 leading-tight block">{client.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-28 relative overflow-hidden" id="contacto">
        <div className="absolute inset-0">
          <Image src="/images/obras/projects-aerial.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="section-overlay-warm" />
        </div>
        <div className="texture-stripes" />
        <div className="container-site relative z-[1]">
          <motion.div className="text-center max-w-[600px] mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full text-xs font-semibold text-[#25D366] mb-4">
              <MessageCircle size={14} />
              Respuesta Inmediata
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Hablemos de tu Proyecto</h2>
            <p className="text-gray-500 leading-relaxed">Consultas técnicas, presupuestos y asesoría normativa sin cargo. Estamos listos para ayudarte.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1000px] mx-auto">
            <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-100 shadow-premium">
                <div className="w-20 h-20 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#25D366]/20">
                  <MessageCircle size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contáctanos por WhatsApp</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Recibí asesoría técnica personalizada y presupuestos en minutos.</p>
                <a href="https://wa.me/543424567890?text=Hola%20Tecnolight%2C%20quiero%20solicitar%20informaci%C3%B3n%20sobre%20se%C3%B1alizaci%C3%B3n%20vial" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/30">
                  <MessageCircle size={24} />
                  +54 342 456-7890
                </a>
                <p className="text-xs text-gray-400 mt-4">Lun a Vie 8:00 - 18:00 hs</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 space-y-4 border border-gray-100 shadow-premium">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#FF5A1F]/10 rounded-lg flex items-center justify-center text-[#FF5A1F] shrink-0"><MapPin size={20} /></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Sede Comercial</h4>
                    <p className="text-gray-500 text-sm">Salvador Caputto 3243, Santa Fe</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#FF5A1F]/10 rounded-lg flex items-center justify-center text-[#FF5A1F] shrink-0"><MapPin size={20} /></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Fábrica</h4>
                    <p className="text-gray-500 text-sm">Cv Oeste, Santa Fe</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-gray-100 shadow-premium">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><MapPin size={16} className="text-[#FF5A1F]" /> Sede Comercial</h4>
                <div className="w-full h-[200px] rounded-lg overflow-hidden border border-gray-100">
                  <iframe src="https://www.google.com/maps?q=Salvador+Caputto+3243+Santa+Fe+Argentina&output=embed" className="w-full h-full" allowFullScreen="" loading="lazy" title="Sede Comercial" />
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-gray-100 shadow-premium">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><MapPin size={16} className="text-[#FF5A1F]" /> Fábrica</h4>
                <div className="w-full h-[200px] rounded-lg overflow-hidden border border-gray-100">
                  <iframe src="https://www.google.com/maps?q=Cv+Oeste+Santa+Fe+Argentina&output=embed" className="w-full h-full" allowFullScreen="" loading="lazy" title="Fábrica Tecnolight" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects?active=true`);
    const data = await res.json();
    return { props: { projects: data.projects || [] } };
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    return { props: { projects: [] } };
  }
}
