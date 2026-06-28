import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Award, Shield, Users, Building2, CheckCircle2, Target, Eye, Heart, ArrowRight, Scale, TrendingUp } from 'lucide-react';

const ObraBgHero = ({ src, children }) => (
  <section className="obra-bg-section py-32 max-md:py-20">
    <div className="obra-bg-image" style={{ backgroundImage: `url(${src})` }} />
    <div className="obra-bg-overlay" />
    <div className="relative z-10 container-site">
      {children}
    </div>
  </section>
);

export default function About() {
  const companyHistory = {
    founded: 1993,
    years: 30,
    location: 'Santa Fe, Argentina',
    description: `
      Tecnolight SRL nació en 1993 en la ciudad de Santa Fe con una convicción clara:
      la señalización vial en Argentina necesitaba un salto de calidad. Lo que empezó
      como un pequeño taller de señales metálicas se convirtió en el proveedor de
      confianza de municipios, vialidades y constructoras de todo el país.
      
      Hoy, con más de 10.000 señales instaladas y cero reclamos por calidad en más de
      tres décadas, somos la opción de quienes no pueden darse el lujo de fallar.
      Mientras otros compiten por precio, nosotros competimos por estándares —
      certificación IRAM 3950, materiales 3M grado ingeniería, y un seguro de
      responsabilidad civil que respalda cada señal que fabricamos.
      
      No fabricamos señales. Fabricamos tranquilidad, cumplimiento normativo y
      protección para las personas que circulan por las rutas y calles que señalizamos.
    `
  };

  const values = [
    { icon: <Shield size={32} />, title: 'Seguridad ante Todo', description: 'Cada señal que fabricamos tiene una función: evitar que alguien termine herido, multado o peor. No negociamos con la seguridad.' },
    { icon: <Award size={32} />, title: 'Calidad que se Exige, No se Promete', description: 'Materiales 3M, certificación IRAM 3950, aprobación de Vialidad Nacional. No decimos que somos buenos: los certificados lo demuestran.' },
    { icon: <Target size={32} />, title: 'Precisión sin Excepción', description: 'Tolerancias mínimas, reflectividad exacta, tipografía oficial. Cada detalle importa porque en la ruta no hay margen para el error.' },
    { icon: <Heart size={32} />, title: 'Compromiso que se Mide en Décadas', description: '30 años cumpliendo plazos. 30 años sin reclamos por calidad. Esa no es casualidad: es cultura empresarial.' },
    { icon: <Users size={32} />, title: 'Equipo Multidisciplinario', description: 'Ingenieros, diseñadores y técnicos trabajando coordinados para que su proyecto esté listo cuando usted lo necesita, no cuando a ellos les conviene.' },
    { icon: <Eye size={32} />, title: 'Innovación con Propósito', description: 'Incorporamos reflectivos de última generación y procesos industriales avanzados. No por moda: porque la tecnología salva vidas en la ruta.' }
  ];

  const clients = [
    { name: 'Municipalidad de Santa Fe', type: 'Gobierno', projects: 15, icon: '🏛️' },
    { name: 'Vialidad Nacional', type: 'Gobierno', projects: 8, icon: '🛣️' },
    { name: 'Constructora del Litoral', type: 'Privada', projects: 12, icon: '🏗️' },
    { name: 'Parque Industrial Sauce Viejo', type: 'Privado', projects: 3, icon: '🏭' },
    { name: 'Puerto de Santa Fe', type: 'Estatal', projects: 5, icon: '⚓' },
    { name: 'Municipio de Rosario', type: 'Gobierno', projects: 10, icon: '🏛️' },
    { name: 'Autopista Rosario-Córdoba', type: 'Concesionaria', projects: 2, icon: '🛣️' },
    { name: 'Municipio de Córdoba', type: 'Gobierno', projects: 7, icon: '🏛️' }
  ];

  const certifications = [
    'Norma IRAM 3950 - Señales de Tránsito',
    'Ley Nacional de Tránsito N° 24.449',
    'Materiales Reflectivos Grado Ingeniería (3M)',
    'ISO 9001 - Gestión de Calidad',
    'Vialidad Nacional - Proveedor Homologado'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="body-bg-obras">
      <Head>
        <title>Nosotros - Tecnolight SRL | 30 Años Protegiendo Vidas en la Ruta</title>
        <meta name="description" content="Conocé la trayectoria de Tecnolight SRL: más de 30 años fabricando señalización vial certificada bajo IRAM 3950 en Santa Fe, Argentina. Cero reclamos, miles de señales instaladas." />
        <meta name="keywords" content="Tecnolight, señalización vial Santa Fe, cartelería Santa Fe, historia empresa, IRAM, Vialidad Nacional" />
      </Head>

      <ObraBgHero src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Trayectoria que Inspira Confianza</span>
          <h1 className="text-5xl font-extrabold mt-2 mb-4 max-md:text-3xl text-white">30 Años sin un Solo Reclamo por Calidad</h1>
          <p className="text-white/80 text-lg max-w-[600px]">Desde 1993, fabricando señales que protegen vidas, cumplen normativas y blindan la responsabilidad de nuestros clientes.</p>
        </motion.div>
      </ObraBgHero>

      <section className="py-20 container-site section-with-pattern">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">De 1993 a Hoy</span>
            <h2 className="text-3xl font-bold mt-2 mb-6 text-gray-900">No Competimos por Precio. Competimos por Estándares.</h2>
            <div className="text-gray-500 leading-relaxed space-y-4">
              {companyHistory.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { number: '1993', label: 'Año de Fundación' },
                { number: '30+', label: 'Años sin Reclamos' },
                { number: '10k+', label: 'Señales Instaladas' },
                { number: '500+', label: 'Proyectos Ejecutados' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-100 p-5 rounded-xl text-center">
                  <span className="text-2xl font-extrabold text-[#FF5A1F] block mb-1">{stat.number}</span>
                  <span className="text-xs uppercase tracking-wider text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-12 text-center flex flex-col items-center gap-4">
              <span className="text-[#FF5A1F]"><Scale size={64} /></span>
              <h3 className="text-xl font-bold text-gray-900">Tecnolight SRL</h3>
              <p className="text-gray-500">Santa Fe, Argentina</p>
              <div className="flex items-center gap-2 text-[#FF5A1F] bg-orange-50 border border-orange-200 rounded-full px-4 py-2 text-sm font-semibold">
                <Award size={20} />
                <span>Cero Reclamos en +30 Años</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-gray-50 max-md:py-20 section-with-pattern">
        <div className="container-site">
          <motion.div className="text-center max-w-[700px] mx-auto mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Nuestra Razón de Ser</span>
            <h2 className="text-[2.5rem] font-bold mt-2 max-md:text-3xl text-gray-900">Misión, Visión y Valores que Salvan Vidas</h2>
            <p className="text-gray-500 mt-4">No son frases decorativas. Son principios que aplicamos en cada señal que fabricamos y cada proyecto que ejecutamos.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <Target size={40} />,
                title: 'Misión',
                text: 'Fabricar e instalar señalización vial y cartelería de alta calidad certificada, contribuyendo activamente a la seguridad vial y la protección legal de municipios, constructoras y empresas en todo el territorio argentino.'
              },
              {
                icon: <Eye size={40} />,
                title: 'Visión',
                text: 'Ser la empresa de referencia en señalización vial de Argentina. Que cuando un proyecto exija cero riesgos, cero reclamos y cero desvíos normativos, piensen en Tecnolight.'
              },
              {
                icon: <Heart size={40} />,
                title: 'Valores',
                list: ['Seguridad ante todo', 'Calidad certificada, no prometida', 'Compromiso con los plazos', 'Innovación con propósito vial', 'Responsabilidad civil blindada']
              }
            ].map((item, idx) => (
              <motion.div key={idx} className="bg-white border border-gray-100 rounded-xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF5A1F] hover:shadow-card-hover" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (idx + 1) * 0.1 }}>
                <div className="w-16 h-16 bg-[#FF5A1F] rounded-xl flex items-center justify-center text-white mb-4">{item.icon}</div>
                <h3 className="text-[#FF5A1F] text-2xl font-bold mt-4 mb-2">{item.title}</h3>
                {item.text && <p className="text-gray-500 leading-relaxed">{item.text}</p>}
                {item.list && (
                  <ul className="list-none p-0 space-y-2">
                    {item.list.map((l, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-500"><CheckCircle2 size={16} className="text-[#FF5A1F] shrink-0" />{l}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 container-site max-md:py-20 section-with-pattern">
        <motion.div className="text-center max-w-[700px] mx-auto mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Principios que nos Diferencian</span>
          <h2 className="text-[2.5rem] font-bold mt-2 max-md:text-3xl text-gray-900">Lo que nos Distingue de la Competencia</h2>
          <p className="text-gray-500 mt-4">Mientras otros compiten por precio, nosotros construimos confianza. Estas son las razones por las que clientes exigentes nos eligen.</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {values.map((value, idx) => (
            <motion.div key={idx} className="bg-white border border-gray-100 rounded-xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF5A1F] hover:shadow-card-hover" variants={itemVariants}>
              <span className="text-[#FF5A1F] inline-block mb-6">{value.icon}</span>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-32 bg-gray-50 max-md:py-20 section-with-pattern">
        <div className="container-site">
          <motion.div className="text-center max-w-[700px] mx-auto mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Los que ya nos Pusieron a Prueba</span>
            <h2 className="text-[2.5rem] font-bold mt-2 max-md:text-3xl text-gray-900">Clientes que Confían su Seguridad a Tecnolight</h2>
            <p className="text-gray-500 mt-4">Gobiernos, entes viales y constructoras que no pueden darse el lujo de fallar. Todos nos eligieron. ¿Su proyecto puede permitirse menos?</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {clients.map((client, idx) => (
              <motion.div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:border-[#FF5A1F] hover:-translate-y-1" variants={itemVariants}>
                <span className="text-2xl">{client.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{client.name}</h3>
                  <span className="text-xs text-gray-500 block">{client.type}</span>
                  <span className="text-xs text-[#FF5A1F]">{client.projects} proyectos</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 container-site max-md:py-20 section-with-pattern">
        <motion.div className="text-center max-w-[700px] mx-auto mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Calidad que se Demuestra</span>
          <h2 className="text-[2.5rem] font-bold mt-2 max-md:text-3xl text-gray-900">Certificaciones que Respaldan cada Señal</h2>
          <p className="text-gray-500 mt-4">No decimos que somos buenos. Son organismos oficiales y normas internacionales las que lo certifican.</p>
        </motion.div>
        <motion.div className="max-w-2xl mx-auto space-y-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {certifications.map((cert, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 transition-all duration-300 hover:border-[#FF5A1F]">
              <CheckCircle2 size={24} className="text-[#FF5A1F] shrink-0" />
              <span className="text-gray-900 font-medium">{cert}</span>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="container-site py-32 max-md:py-20 section-with-pattern">
        <motion.div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-20 text-center flex flex-col items-center gap-6 max-md:p-12" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold max-md:text-2xl text-gray-900">Su Próximo Proyecto Merece esta Trayectoria</h2>
          <p className="text-gray-500 max-w-[550px]">Más de 500 proyectos nos avalan. No arriesgue su obra con proveedores sin certificación. Consúltenos y reciba asesoría normativa sin cargo.</p>
          <div className="flex gap-4 max-md:flex-col">
            <a href="/contact" className="btn-primary">Solicitar Cotización <ArrowRight size={18} /></a>
            <a href="/catalog" className="btn-secondary">Explorar Catálogo</a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
