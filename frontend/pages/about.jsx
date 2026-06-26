import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Award, Shield, Users, Building2, CheckCircle2, Target, Eye, Heart, ArrowRight } from 'lucide-react';

export default function About() {
  const companyHistory = {
    founded: 1993,
    years: 30,
    location: 'Santa Fe, Argentina',
    description: `
      Tecnolight SRL nació en 1993 en la ciudad de Santa Fe con la visión de transformar 
      la seguridad vial en Argentina. Fundada por un equipo de ingenieros apasionados por 
      la señalización y la seguridad en el tránsito, la empresa comenzó como un pequeño 
      taller de fabricación de señales metálicas.
      
      A lo largo de más de tres décadas, hemos crecido hasta convertirnos en referentes 
      nacionales en señalización vial y cartelería comercial. Nuestra trayectoria está 
      marcada por la innovación constante, la calidad en cada producto y el compromiso 
      inquebrantable con la seguridad de las personas.
      
      Hoy, con más de 10,000 señales instaladas en todo el país, seguimos impulsando 
      proyectos que salvan vidas y mejoran la movilidad urbana y rural.
    `
  };

  const values = [
    { icon: <Shield size={32} />, title: 'Seguridad', description: 'Priorizamos la protección de las personas en cada proyecto. Cada señal que fabricamos está diseñada para salvar vidas.' },
    { icon: <Award size={32} />, title: 'Calidad', description: 'Utilizamos materiales de primera calidad y cumplimos con normativas IRAM y Vialidad Nacional en cada producto.' },
    { icon: <Target size={32} />, title: 'Precisión', description: 'Fabricamos con tolerancias mínimas y especificaciones exactas para garantizar durabilidad y reflectividad óptima.' },
    { icon: <Heart size={32} />, title: 'Compromiso', description: 'Cumplimos con plazos de entrega y acompañamos a nuestros clientes en cada etapa del proyecto.' },
    { icon: <Users size={32} />, title: 'Trabajo en Equipo', description: 'Nuestro equipo multidisciplinario de ingenieros, diseñadores y técnicos trabaja de forma coordinada.' },
    { icon: <Eye size={32} />, title: 'Innovación', description: 'Incorporamos tecnologías de vanguardia en materiales reflectivos y procesos de fabricación.' }
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
    'Materiales Reflectivos Grado Ingeniería',
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
    <div>
      <Head>
        <title>Nosotros - Tecnolight SRL | 30 Años de Trayectoria</title>
        <meta name="description" content="Conocé la historia de Tecnolight SRL, empresa líder en señalización vial con más de 30 años de experiencia en Santa Fe, Argentina." />
        <meta name="keywords" content="Tecnolight, señalización vial Santa Fe, cartelería Santa Fe, historia empresa, IRAM, Vialidad Nacional" />
      </Head>

      <section className="py-32 container-site max-md:py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Nuestra Historia</span>
          <h1 className="text-5xl font-extrabold mt-2 mb-4 max-md:text-3xl">Más de 30 Años Guiando el Tránsito Nacional</h1>
          <p className="text-text-muted text-lg">Desde 1993, fabricando seguridad y confianza en cada señal</p>
        </motion.div>
      </section>

      <section className="py-20 container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Trayectoria</span>
            <h2 className="text-3xl font-bold mt-2 mb-6">Una Historia de Compromiso y Calidad</h2>
            <div className="text-text-muted leading-relaxed space-y-4">
              {companyHistory.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { number: '1993', label: 'Año de Fundación' },
                { number: '30+', label: 'Años de Experiencia' },
                { number: '10k+', label: 'Señales Instaladas' },
                { number: '500+', label: 'Proyectos Ejecutados' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-bg-surface border border-border p-5 rounded-xl text-center">
                  <span className="text-2xl font-extrabold text-primary block mb-1">{stat.number}</span>
                  <span className="text-xs uppercase tracking-wider text-text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="bg-bg-surface border border-border rounded-xl p-12 text-center flex flex-col items-center gap-4">
              <span className="text-primary"><Building2 size={64} /></span>
              <h3 className="text-xl font-bold">Tecnolight SRL</h3>
              <p className="text-text-muted">Santa Fe, Argentina</p>
              <div className="flex items-center gap-2 text-primary bg-[rgba(255,183,3,0.1)] border border-[rgba(255,183,3,0.35)] rounded-full px-4 py-2 text-sm font-semibold">
                <Award size={20} />
                <span>+30 Años de Trayectoria</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-[#10121A] max-md:py-20">
        <div className="container-site">
          <motion.div className="text-center max-w-[600px] mx-auto mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Nuestra Esencia</span>
            <h2 className="text-[2.5rem] font-bold mt-2 max-md:text-3xl">Misión, Visión y Valores</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <Target size={40} />,
                title: 'Misión',
                text: 'Fabricar e instalar señalización vial y cartelería de alta calidad, contribuyendo a la seguridad de las personas y el ordenamiento del tránsito en todo el territorio argentino.'
              },
              {
                icon: <Eye size={40} />,
                title: 'Visión',
                text: 'Ser la empresa líder en señalización vial de Argentina, reconocida por la excelencia en productos, innovación tecnológica y compromiso con la seguridad vial nacional.'
              },
              {
                icon: <Heart size={40} />,
                title: 'Valores',
                list: ['Seguridad y protección', 'Calidad en cada detalle', 'Compromiso con el cliente', 'Innovación constante', 'Trabajo en equipo']
              }
            ].map((item, idx) => (
              <motion.div key={idx} className="bg-bg-dark border border-border rounded-xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-glow" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (idx + 1) * 0.1 }}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center text-white mb-4">{item.icon}</div>
                <h3 className="text-primary text-2xl font-bold mt-4 mb-2">{item.title}</h3>
                {item.text && <p className="text-text-muted leading-relaxed">{item.text}</p>}
                {item.list && (
                  <ul className="list-none p-0 space-y-2">
                    {item.list.map((l, i) => (
                      <li key={i} className="flex items-center gap-2 text-text-muted"><CheckCircle2 size={16} className="text-primary shrink-0" />{l}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 container-site max-md:py-20">
        <motion.div className="text-center max-w-[600px] mx-auto mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Principios</span>
          <h2 className="text-[2.5rem] font-bold mt-2 max-md:text-3xl">Lo que nos Define</h2>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {values.map((value, idx) => (
            <motion.div key={idx} className="bg-bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-premium" variants={itemVariants}>
              <span className="text-primary inline-block mb-6">{value.icon}</span>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-text-muted leading-relaxed text-sm">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-32 bg-bg-dark max-md:py-20">
        <div className="container-site">
          <motion.div className="text-center max-w-[600px] mx-auto mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Confían en Nosotros</span>
            <h2 className="text-[2.5rem] font-bold mt-2 max-md:text-3xl">Clientes Destacados</h2>
            <p className="text-text-muted mt-2">Trabajamos con municipios, constructoras y empresas de todo el país</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {clients.map((client, idx) => (
              <motion.div key={idx} className="bg-bg-surface border border-border rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:border-primary hover:-translate-y-1" variants={itemVariants}>
                <span className="text-2xl">{client.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{client.name}</h3>
                  <span className="text-xs text-text-muted block">{client.type}</span>
                  <span className="text-xs text-primary">{client.projects} proyectos</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 container-site max-md:py-20">
        <motion.div className="text-center max-w-[600px] mx-auto mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Calidad Certificada</span>
          <h2 className="text-[2.5rem] font-bold mt-2 max-md:text-3xl">Normativas y Certificaciones</h2>
        </motion.div>
        <motion.div className="max-w-2xl mx-auto space-y-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {certifications.map((cert, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-bg-card border border-border rounded-xl p-5 transition-all duration-300 hover:border-primary">
              <CheckCircle2 size={24} className="text-primary shrink-0" />
              <span className="text-text-main font-medium">{cert}</span>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="py-32 container-site max-md:py-20">
        <motion.div className="bg-gradient-to-br from-bg-surface to-[#151a24] border border-border rounded-2xl p-20 text-center flex flex-col items-center gap-6 max-md:p-12" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold max-md:text-2xl">¿Querés ser parte de nuestra historia?</h2>
          <p className="text-text-muted max-w-[500px]">Sumate a los más de 500 proyectos que hemos realizado en todo el país. Consultanos por tu proyecto de señalización.</p>
          <div className="flex gap-4 max-md:flex-col">
            <a href="/contact" className="btn-primary">Contactanos <ArrowRight size={18} /></a>
            <a href="/catalog" className="btn-secondary">Ver Catálogo</a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
