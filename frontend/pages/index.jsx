import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Truck, CheckCircle2, ArrowRight, HelpCircle, Layers, BookOpen } from 'lucide-react';
import InteractiveRoadHero from '../components/InteractiveRoadHero';
import InstagramGallery from '../components/InstagramGallery';

export default function Home({ projects }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

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
    <div>
      <Head>
        <title>Tecnolight - Señalización Vial y Cartelería | Santa Fe</title>
        <meta name="description" content="Tecnolight - Más de 30 años de experiencia fabricando señalización vial homologada y cartelería premium en Santa Fe, Argentina." />
      </Head>

      <InteractiveRoadHero />

      <section className="py-32 container-site max-md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-center max-md:gap-12">
          <div>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Quiénes Somos</span>
            <h2 className="text-[2.5rem] font-bold my-2 mb-6 max-md:text-3xl">Más de 30 Años Guiando el Tránsito Nacional</h2>
            <p className="text-text-muted leading-relaxed mb-6 text-base">
              Establecidos en la Ciudad de Santa Fe, <strong>Tecnolight</strong> se ha consolidado como un referente indiscutido en el desarrollo, fabricación e instalación de señalética vial y comercial. Nos impulsa la innovación tecnológica y un estricto compromiso con la seguridad vial nacional.
            </p>
            <p className="text-text-muted leading-relaxed mb-6 text-base">
              Trabajamos junto a municipios, comunas y empresas constructoras de todo el país, garantizando materiales de alta reflectividad que cumplen con las directrices de la <strong>Ley Nacional de Tránsito N° 24.449</strong>.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { number: '30+', label: 'Años de Trayectoria' },
                { number: '10k+', label: 'Señales Instaladas' },
                { number: '100%', label: 'Material Homologado' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-bg-surface border border-border p-6 rounded-xl text-center">
                  <span className="text-4xl font-extrabold text-primary block mb-1">{stat.number}</span>
                  <span className="text-xs uppercase tracking-wider text-text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full h-[400px] bg-bg-surface border border-border rounded-xl overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-primary/70">
              <Shield size={64} />
              <span className="font-semibold uppercase tracking-wider text-text-muted text-sm">Normas IRAM y Vialidad</span>
              <span className="text-sm text-text-muted">Alta Reflectividad 3M</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#10121A] max-md:py-20">
        <div className="container-site">
          <div className="text-center max-w-[600px] mx-auto mb-20">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Por qué elegirnos</span>
            <h2 className="text-[2.5rem] font-bold mb-4 max-md:text-3xl">Tecnología Reflectiva y Calidad Vial</h2>
            <p className="text-text-muted leading-relaxed">Implementamos los mejores materiales y procesos de ingeniería para asegurar máxima durabilidad en climas extremos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-md:gap-6">
            {[
              { icon: <Shield size={40} />, title: 'Seguridad Certificada', desc: 'Fabricamos señales bajo la Norma IRAM 3950, asegurando reflectividad y tipografía oficial homologada por vialidad nacional.' },
              { icon: <Sparkles size={40} />, title: 'Durabilidad Extrema', desc: 'Estructuras metálicas galvanizadas y acabados con pintura epoxi horneada para resistir la corrosión y el paso de los años.' },
              { icon: <Truck size={40} />, title: 'Despliegue y Montaje', desc: 'Ofrecemos logística completa y montaje en obra pública y privada, contando con equipos técnicos especializados.' }
            ].map((v, idx) => (
              <motion.div key={idx} className="bg-bg-card border border-border p-10 rounded-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-premium" variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: idx * 0.15 }}>
                <span className="text-primary inline-block mb-6">{v.icon}</span>
                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                <p className="text-text-muted leading-relaxed text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 container-site max-md:py-20">
        <div className="text-center max-w-[600px] mx-auto mb-20">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Nuestra Producción</span>
          <h2 className="text-[2.5rem] font-bold mb-4 max-md:text-3xl">Líneas de Productos</h2>
          <p className="text-text-muted leading-relaxed">Explorá nuestro catálogo clasificado según el Código de Tránsito y Cartelería Comercial.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-md:gap-4">
          {categories.map((cat, idx) => (
            <Link href={`/catalog?category=${encodeURIComponent(cat.category)}`} key={idx}>
              <div className="bg-bg-card border border-border rounded-xl p-8 cursor-pointer transition-all duration-300 h-full flex flex-col hover:-translate-y-1.5 hover:border-primary hover:shadow-premium group">
                <div className="w-[50px] h-[50px] bg-[rgba(255,183,3,0.08)] rounded-lg flex items-center justify-center text-primary mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-black">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">{cat.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mt-auto">
                  Ver Más <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-32 container-site max-md:py-20">
        <div className="text-center max-w-[600px] mx-auto mb-20">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Confían en Nosotros</span>
          <h2 className="text-[2.5rem] font-bold mb-4 max-md:text-3xl">Clientes Destacados</h2>
          <p className="text-text-muted leading-relaxed">Municipios, constructoras y empresas de todo el país eligen Tecnolight</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
          {['Municipalidad de Santa Fe', 'Vialidad Nacional', 'Constructora del Litoral', 'Parque Industrial Sauce Viejo', 'Puerto de Santa Fe', 'Municipio de Rosario'].map((client, idx) => (
            <div key={idx} className="bg-bg-dark border border-border rounded-xl p-6 text-center transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(245,180,0,0.1)]">
              <span className="text-3xl block mb-2">🏛️</span>
              <span className="font-semibold text-sm">{client}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/about" className="btn-secondary">Conocé más sobre nosotros <ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className="py-32 bg-[#10121A] max-md:py-20">
        <div className="container-site">
          <div className="text-center max-w-[600px] mx-auto mb-20">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Casos de Éxito</span>
            <h2 className="text-[2.5rem] font-bold mb-4 max-md:text-3xl">Garantía de Satisfacción</h2>
            <p className="text-text-muted leading-relaxed">Conocé el testimonio de los municipios y constructoras que confían en Tecnolight.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { quote: 'Excelente trabajo en la señalización del ejido urbano. La calidad reflectiva nocturna de los nomencladores de calles mejoró notablemente la visibilidad de los vecinos y turistas.', name: 'Ing. Daniel R.', role: 'Dirección de Obras Públicas - Santa Fe' },
              { quote: 'Cumplieron perfectamente con los plazos de entrega del tramo de autopista. Sus señales de prevención e información vial aprobaron todas las auditorías viales sin objeciones.', name: 'Arq. Carlos M.', role: 'Gerente de Infraestructura Vial - Constructora del Litoral' }
            ].map((t, idx) => (
              <div key={idx} className="bg-bg-card border border-border p-12 rounded-xl flex flex-col justify-between">
                <p className="text-lg leading-relaxed italic mb-8">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-primary">{t.name}</span>
                  <span className="text-sm text-text-muted">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InstagramGallery />

      <section className="container-site py-32 max-md:py-20">
        <div className="bg-gradient-to-br from-bg-surface to-[#151a24] border border-border rounded-2xl p-20 text-center flex flex-col items-center gap-8 max-md:p-12">
          <h2 className="text-[2.5rem] font-bold max-w-[600px] max-md:text-2xl">¿Necesitás señalizar tu obra o empresa?</h2>
          <p className="text-text-muted max-w-[500px] leading-relaxed">Contactá a uno de nuestros ingenieros de ventas para recibir una cotización formal y asesoría normativa sin cargo.</p>
          <div className="flex gap-6 max-md:flex-col max-md:gap-4">
            <Link href="/contact" className="btn-primary">Iniciar Consulta <ArrowRight size={18} /></Link>
            <a href="https://wa.me/543424567890" target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp Directo</a>
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
