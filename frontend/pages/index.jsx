// ============================================================
// PÁGINA PRINCIPAL — Tecnolight SRL
// Hero animado + 7 secciones de ventas con fondos de obra vial
// ============================================================
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Truck, CheckCircle2, ArrowRight, HelpCircle, Layers, BookOpen, MapPin, Phone, Scale, AlertTriangle, TrendingUp } from 'lucide-react';
import InteractiveRoadHero from '../components/InteractiveRoadHero';

// -------------------------------------------------------
// Componente reutilizable: sección con fondo de obra vial
// Props: src (Unsplash URL), overlay ('dark'|'orange')
// Usa CSS classes definidas en globals.css
// -------------------------------------------------------
const ObraBgSection = ({ src, children, overlay = 'dark', className = '' }) => (
  <section className={`obra-bg-section py-32 max-md:py-20 ${className}`}>
    <div className="obra-bg-image" style={{ backgroundImage: `url(${src})` }} />
    <div className={overlay === 'orange' ? 'obra-bg-overlay-orange' : 'obra-bg-overlay'} />
    <div className="relative z-10 container-site">
      {children}
    </div>
  </section>
);

export default function Home({ projects }) {
  // Animaciones Framer Motion para cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Catálogo de productos (4 categorías)
  const categories = [
    {
      title: 'Señales Reglamentarias',
      desc: 'Indican limitaciones, prohibiciones y restricciones en la vía pública. Fabricadas bajo norma IRAM.',
      category: 'Reglamentarias',
      icon: <CheckCircle2 size={24} />
    },
    {
      title: 'Señales Preventivas',
      desc: 'Advierten al usuario de la existencia y naturaleza de un peligro en el camino.',
      category: 'Preventivas',
      icon: <HelpCircle size={24} />
    },
    {
      title: 'Señales Informativas',
      desc: 'Guían al conductor en su camino, proporcionando información sobre destinos y servicios.',
      category: 'Informativas',
      icon: <BookOpen size={24} />
    },
    {
      title: 'Cartelería Comercial',
      desc: 'Carteles de gran formato, letras corpóreas y marquesinas para potenciar marcas comerciales.',
      category: 'Cartelería Comercial',
      icon: <Layers size={24} />
    }
  ];

  return (
    <div className="body-bg-obras">
      <Head>
        <title>Tecnolight - Señalización Vial y Cartelería | Santa Fe</title>
        <meta name="description" content="Tecnolight - Más de 30 años de experiencia fabricando señalización vial homologada y cartelería premium en Santa Fe, Argentina." />
      </Head>

      {/* Hero principal con animación de ruta y señales flotantes */}
      <InteractiveRoadHero />

      {/* SECCIÓN 1 — ¿Señalización o Riesgo? (fondo: autopista nocturna) */}
      <ObraBgSection
        src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80"
        overlay="dark"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-center max-md:gap-12">
          <div>
            <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">¿Señalización o Riesgo?</span>
            <h2 className="text-[2.5rem] font-bold my-2 mb-6 max-md:text-3xl text-white">¿Sabe lo que Cuesta una Señalización Deficiente?</h2>
            <p className="text-white/80 leading-relaxed mb-6 text-base">
              En Argentina, la <strong className="text-white">Ley Nacional de Tránsito N° 24.449</strong> exige señalización homologada. Pero cumplir la ley es apenas el piso. El verdadero objetivo es proteger vidas, evitar multas millonarias y blindar su responsabilidad civil.
            </p>
            <p className="text-white/80 leading-relaxed mb-6 text-base">
              Con más de <strong className="text-white">30 años en el rubro</strong> y más de 10.000 señales instaladas, Tecnolight es la empresa que municipios, constructoras y Vialidad Nacional eligen cuando no pueden darse el lujo de fallar. <strong className="text-white">Cero reclamos por calidad en tres décadas.</strong> No es casualidad: es certificación IRAM 3950, materiales 3M y un seguro de responsabilidad civil que respalda cada señal que fabricamos.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { number: '30+', label: 'Años sin Reclamos' },
                { number: '10k+', label: 'Señales Instaladas' },
                { number: '100%', label: 'Material Homologado' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl text-center">
                  <span className="text-4xl font-extrabold text-[#FF5A1F] block mb-1">{stat.number}</span>
                  <span className="text-xs uppercase tracking-wider text-white/60">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full h-[400px] bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Scale size={64} className="text-[#FF5A1F]" />
              <span className="font-semibold uppercase tracking-wider text-white/70 text-sm">Responsabilidad Civil Blindada</span>
              <span className="text-sm text-white/50">Normas IRAM 3950 · Vialidad Nacional</span>
            </div>
          </div>
        </div>
      </ObraBgSection>

      {/* SECCIÓN 2 — Tres Razones (Protección 24/7, fondo gris con patrón vial) */}
      <section className="py-32 bg-gray-50 max-md:py-20 section-with-pattern">
        <div className="container-site">
          <div className="text-center max-w-[700px] mx-auto mb-6">
            <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Protección 24/7</span>
            <h2 className="text-[2.5rem] font-bold mb-4 max-md:text-3xl text-gray-900">Tres Razones por las que Clientes Exigentes Nos Eligen</h2>
            <p className="text-gray-500 leading-relaxed">No somos la opción más barata del mercado. Somos la opción que le garantiza dormir tranquilo sabiendo que su señalización cumple, resiste y protege.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-md:gap-6">
            {[
              { icon: <Shield size={40} />, title: 'Responsabilidad Civil Blindada', desc: 'Si su señal falla y ocurre un accidente, usted responde. Las nuestras están certificadas bajo IRAM 3950 con materiales reflectivos 3M grado ingeniería. No arriesgue su patrimonio por ahorrar unos pesos.' },
              { icon: <Sparkles size={40} />, title: 'Durabilidad que Resiste Décadas', desc: 'Calor extremo, lluvias torrenciales, salinidad costera, vientos. Nuestras estructuras galvanizadas con pintura epoxi horneada no se oxidan ni pierden reflectividad. Reemplazar señales cada 2 años sale más caro que invertir en calidad una sola vez.' },
              { icon: <Truck size={40} />, title: 'Cumplimiento en Tiempo y Forma', desc: 'Las obras públicas no aceptan demoras. Trabajamos con contratistas y gobiernos desde 1993. Sabemos lo que significa cumplir un cronograma al pie de la letra, con logística y montaje incluidos.' }
            ].map((v, idx) => (
              <motion.div key={idx} className="bg-white border border-gray-100 p-10 rounded-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF5A1F] hover:shadow-card-hover" variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: idx * 0.15 }}>
                <span className="text-[#FF5A1F] inline-block mb-6">{v.icon}</span>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{v.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — Categorías de Productos (fondo blanco con patrón vial) */}
      <section className="py-32 container-site max-md:py-20 section-with-pattern">
        <div className="text-center max-w-[700px] mx-auto mb-20">
          <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Soluciones para Cada Necesidad</span>
          <h2 className="text-[2.5rem] font-bold mb-4 max-md:text-3xl text-gray-900">Cada Categoría es una Solución a un Problema Real</h2>
          <p className="text-gray-500 leading-relaxed">No son solo señales. Son herramientas que ordenan el tránsito, previenen accidentes, evitan multas y protegen a su comunidad. Elegir la categoría incorrecta lo expone a riesgos innecesarios.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-md:gap-4">
          {categories.map((cat, idx) => (
            <Link href={`/catalog?category=${encodeURIComponent(cat.category)}`} key={idx}>
              <div className="bg-white border border-gray-100 rounded-xl p-8 cursor-pointer transition-all duration-300 h-full flex flex-col hover:-translate-y-1.5 hover:border-[#FF5A1F] hover:shadow-card-hover group">
                <div className="w-[50px] h-[50px] bg-orange-50 rounded-lg flex items-center justify-center text-[#FF5A1F] mb-6 transition-all duration-300 group-hover:bg-[#FF5A1F] group-hover:text-white">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{cat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{cat.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5A1F] mt-auto">
                  Ver Más <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECCIÓN 4 — Proyectos Destacados (fondo: obra vial con conos, overlay naranja) */}
      <ObraBgSection
        src="https://images.unsplash.com/photo-1590674899484-d5640d0f3e9f?auto=format&fit=crop&w=1920&q=80"
        overlay="orange"
        className="!py-24"
      >
        <div className="text-center max-w-[800px] mx-auto">
          <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Resultados que Hablan</span>
          <h2 className="text-[2.5rem] font-bold mb-4 max-md:text-3xl text-white">Más de 500 Proyectos Ejecutados. Cero Reclamos por Calidad.</h2>
          <p className="text-white/80 leading-relaxed text-lg">Esa es nuestra mejor carta de presentación. Municipios, vialidades, constructoras y empresas confían en nosotros porque saben que una mala señalización no es una opción.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projects.length > 0 ? projects.slice(0, 6).map((project) => (
            <div key={project.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF5A1F] hover:shadow-card-hover group">
              <div className="relative h-52 bg-white/5 flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-5xl opacity-30">🚧</div>
                )}
                <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{project.location || 'Santa Fe'}</span>
                {project.client && (
                  <span className="absolute top-3 right-3 bg-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">{project.client}</span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-white">{project.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed line-clamp-3">{project.description}</p>
              </div>
            </div>
          )) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
                <div className="text-4xl mb-4 opacity-40">🚧</div>
                <h3 className="font-bold text-white mb-2">Proyecto {i}</h3>
                <p className="text-white/60 text-sm">Señalización vial completa para municipio de la provincia de Santa Fe.</p>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-12">
          <Link href="/projects" className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/90 hover:-translate-y-1 hover:shadow-lg">
            Ver Todos los Proyectos <ArrowRight size={18} />
          </Link>
        </div>
      </ObraBgSection>

      {/* SECCIÓN 5 — Clientes (fondo blanco con patrón vial) */}
      <section className="py-32 container-site max-md:py-20 section-with-pattern">
        <div className="text-center max-w-[700px] mx-auto mb-20">
          <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Confían en Nosotros</span>
          <h2 className="text-[2.5rem] font-bold mb-4 max-md:text-3xl text-gray-900">Los que ya Nos Pusieron a Prueba</h2>
          <p className="text-gray-500 leading-relaxed">Municipios, constructoras y entes viales de todo el país nos eligen porque no hay margen para el error. ¿Su proyecto puede permitirse menos?</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
          {['Municipalidad de Santa Fe', 'Vialidad Nacional', 'Constructora del Litoral', 'Parque Industrial Sauce Viejo', 'Puerto de Santa Fe', 'Municipio de Rosario'].map((client, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center transition-all duration-300 hover:border-[#FF5A1F] hover:-translate-y-1">
              <span className="text-3xl block mb-2">🏛️</span>
              <span className="font-semibold text-sm text-gray-900">{client}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/about" className="btn-secondary">Conozca Nuestra Trayectoria <ArrowRight size={18} /></Link>
        </div>
      </section>

      {/* SECCIÓN 6 — Testimonios (fondo gris con patrón vial) */}
      <section className="py-32 bg-gray-50 max-md:py-20 section-with-pattern">
        <div className="container-site">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">La Voz de la Experiencia</span>
            <h2 className="text-[2.5rem] font-bold mb-4 max-md:text-3xl text-gray-900">Ellos Confiaron, los Resultados Hablan Solos</h2>
            <p className="text-gray-500 leading-relaxed">No lo digamos nosotros. Lo dicen los ingenieros y arquitectos que nos eligieron para sus proyectos más exigentes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { quote: 'Trabajamos con Tecnolight en la señalización del ejido urbano completo. La calidad reflectiva nocturna de los nomencladores mejoró drásticamente la visibilidad. Recibimos felicitaciones de vecinos y turistas. Definitivamente los volveríamos a contratar.', name: 'Ing. Daniel R.', role: 'Dirección de Obras Públicas - Santa Fe' },
              { quote: 'Necesitábamos señales para un tramo de autopista con plazos muy ajustados. Tecnolight no solo cumplió antes de tiempo, sino que sus señales aprobaron todas las auditorías viales sin una sola objeción. Eso no pasa con cualquier proveedor.', name: 'Arq. Carlos M.', role: 'Gerente de Infraestructura Vial - Constructora del Litoral' }
            ].map((t, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-12 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[#FF5A1F] text-4xl leading-none block mb-4">&ldquo;</span>
                  <p className="text-lg leading-relaxed italic mb-8 text-gray-700">{t.quote}</p>
                </div>
                <div className="flex flex-col gap-1 border-t border-gray-100 pt-6">
                  <span className="font-bold text-[#FF5A1F]">{t.name}</span>
                  <span className="text-sm text-gray-500">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 7 — Contacto (fondo blanco con patrón vial) */}
      <section className="py-32 container-site max-md:py-20 section-with-pattern" id="contacto">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">¿Está Cubierto?</span>
          <h2 className="text-[2.5rem] font-bold mb-4 max-md:text-3xl text-gray-900">¿Necesita una Cotización o Verificar que su Señalización Actual Cumple Normativa?</h2>
          <p className="text-gray-500 leading-relaxed">Ofrecemos asesoría normativa sin cargo. Un llamado puede ahorrarle multas, accidentes y dolores de cabeza. Respondemos consultas técnicas y presupuestos de forma inmediata.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#FF5A1F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Respuesta Inmediata por WhatsApp</h3>
              <p className="text-gray-500 text-sm mb-6">Consultas técnicas, presupuestos y asesoría normativa. Estamos listos para ayudarlo.</p>
              <a
                href="https://wa.me/543424567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-[#1DA851] hover:-translate-y-1 hover:shadow-lg"
              >
                <Phone size={22} />
                Consultar por WhatsApp
              </a>
              <p className="text-xs text-gray-400 mt-4">Disponible de Lunes a Viernes de 8 a 18 hs.</p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-[#FF5A1F] shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Sede Comercial</h4>
                  <p className="text-gray-500 text-sm">Salvador Caputto 3243, Santa Fe</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-[#FF5A1F] shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Fábrica</h4>
                  <p className="text-gray-500 text-sm">Cv Oeste, Santa Fe</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Sede Comercial</h4>
              <div className="w-full h-[220px] rounded-xl overflow-hidden border border-gray-100">
                <iframe
                  src="https://www.google.com/maps?q=Salvador+Caputto+3243+Santa+Fe+Argentina&output=embed"
                  className="w-full h-full"
                  allowFullScreen=""
                  loading="lazy"
                  title="Sede Comercial Tecnolight"
                />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Fábrica</h4>
              <div className="w-full h-[220px] rounded-xl overflow-hidden border border-gray-100">
                <iframe
                  src="https://www.google.com/maps?q=Cv+Oeste+Santa+Fe+Argentina&output=embed"
                  className="w-full h-full"
                  allowFullScreen=""
                  loading="lazy"
                  title="Fábrica Tecnolight"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8 — CTA Final (fondo: ruta con líneas pintadas, overlay oscuro) */}
      <ObraBgSection
        src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1920&q=80"
        overlay="dark"
        className="!py-28"
      >
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-20 text-center flex flex-col items-center gap-8 max-md:p-12">
          <h2 className="text-[2.5rem] font-bold max-w-[700px] max-md:text-2xl text-white">Señalizar Correctamente No es un Gasto. Es una Inversión que Protege Vidas y su Negocio.</h2>
          <p className="text-white/80 max-w-[600px] leading-relaxed text-lg">Mientras usted lee esto, hay cientos de kilómetros de ruta que necesitan señalización urgente. ¿Los suyos están cubiertos? Contacte a nuestros ingenieros y reciba una cotización con asesoría normativa sin cargo.</p>
          <div className="flex gap-6 max-md:flex-col max-md:gap-4">
            <a href="https://wa.me/543424567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-[#1DA851] hover:-translate-y-1 hover:shadow-lg">
              <Phone size={20} /> Cotizar por WhatsApp
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/90 hover:-translate-y-1 hover:shadow-lg">
              Solicitar Asesoría <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </ObraBgSection>
    </div>
  );
}

// -------------------------------------------------------
// SSR: obtiene proyectos activos desde la API de backend
// Usa NEXT_PUBLIC_API_URL o fallback a localhost:5000
// -------------------------------------------------------
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
