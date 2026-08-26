import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, User, Calendar, MessageSquare } from 'lucide-react';

const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const HEADING = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 };
const BODY = { fontFamily: "'Inter', sans-serif" };

const ALL_PROJECTS = [
  { slug: 'senalizacion-urbana-santa-fe', title: 'Señalización Urbana - Santa Fe', cat: 'Cartelería', year: '2024', image: '/images/projects/santa-fe-1.jpg', location: 'Santa Fe', client: 'Municipalidad de Santa Fe', description: 'Proyecto integral de señalización vial para la ciudad de Santa Fe. Incluyó más de 500 señales de diferentes tipos: reglamentarias, preventivas e informativas. Trabajo realizado en conjunto con la Municipalidad de Santa Fe para mejorar la seguridad vial en zonas urbanas y rutas municipales.', images: ['/images/projects/santa-fe-1.jpg', '/images/projects/santa-fe-2.jpg', '/images/projects/santa-fe-3.jpg'], testimonial: 'Excelente trabajo y cumplimiento en los plazos. La calidad de las señales superó nuestras expectativas.' },
  { slug: 'autopista-rosario-cordoba', title: 'Autopista Rosario-Córdoba', cat: 'Señalización', year: '2024', image: '/images/projects/autopista-1.jpg', location: 'Santa Fe/Córdoba', client: 'Constructora Vial S.A.', description: 'Señalización de tramo de autopista de 45km. Incluyó señales de velocidad máxima, curvas, desvíos y paneles informativos.', images: ['/images/projects/autopista-1.jpg', '/images/projects/autopista-2.jpg'], testimonial: 'Profesionalismo de primera. Cumplieron con todos los estándares de seguridad vial.' },
  { slug: 'puerto-de-santa-fe', title: 'Puerto de Santa Fe', cat: 'Cartelería', year: '2023', image: '/images/projects/puerto-1.jpg', location: 'Santa Fe', client: 'Puerto de Santa Fe', description: 'Diseño e instalación de cartelería comercial para zona portuaria. Incluyó carteles de gran formato y señalización interna.', images: ['/images/projects/puerto-1.jpg', '/images/projects/puerto-2.jpg', '/images/projects/puerto-3.jpg'], testimonial: 'El equipo entendió perfectamente nuestras necesidades. Resultado excelente.' },
  { slug: 'parque-industrial-santa-fe', title: 'Parque Industrial Santa Fe', cat: 'Señalización', year: '2023', image: '/images/projects/parque-1.jpg', location: 'Santa Fe', client: 'Parque Industrial Sauce Viejo', description: 'Señalización integral para Parque Industrial. Incluyó señalización vial, carteles de bienvenida y nomencladores de calles.', images: ['/images/projects/parque-1.jpg', '/images/projects/parque-2.jpg'], testimonial: 'Trabajo muy completo y bien ejecutado.' },
  { slug: 'autopista-rosario-cordoba-tramo-ii', title: 'Autopista Rosario-Córdoba Tramo II', cat: 'Cartelería', year: '2023', image: '/images/projects/autopista-2.jpg', location: 'Santa Fe', client: 'Constructora Vial S.A.', description: 'Segunda etapa de señalización de autopista. Señales informativas y cartelería de gran formato.', images: ['/images/projects/autopista-2.jpg', '/images/projects/autopista-1.jpg'], testimonial: null },
  { slug: 'puerto-santa-fe-etapa-ii', title: 'Puerto de Santa Fe - Etapa II', cat: 'Seguridad', year: '2022', image: '/images/projects/puerto-2.jpg', location: 'Santa Fe', client: 'Puerto de Santa Fe', description: 'Señalización de seguridad y demarcación horizontal en zona portuaria.', images: ['/images/projects/puerto-2.jpg', '/images/projects/puerto-3.jpg'], testimonial: null },
  { slug: 'demarcacion-ruta-9', title: 'Demarcación Ruta 9', cat: 'Demarcación', year: '2023', image: '/images/projects/santa-fe-3.jpg', location: 'Santa Fe', client: 'Vialidad Provincial', description: 'Demarcación horizontal de 30km de ruta provincial. Pintado de líneas, flechas y sendas peatonales.', images: ['/images/projects/santa-fe-3.jpg'], testimonial: null },
  { slug: 'puerto-san-martin', title: 'Puerto San Martín', cat: 'Seguridad', year: '2021', image: '/images/projects/santa-fe-2.jpg', location: 'Santa Fe', client: 'Puerto San Martín', description: 'Equipamiento de seguridad y señalización para terminal portuaria.', images: ['/images/projects/santa-fe-2.jpg'], testimonial: null },
];

export default function ProjectDetail({ project }) {
  if (!project) {
    return (
      <div className="max-w-site mx-auto px-5 lg:px-10 py-32 text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground" style={HEADING}>Proyecto no encontrado</h1>
        <p className="text-muted-foreground mb-8" style={BODY}>El proyecto que buscas no existe o fue eliminado.</p>
        <Link href="/projects" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-[4px] hover:bg-primary/80 transition-colors"><ArrowLeft size={18} /> Volver a Proyectos</Link>
      </div>
    );
  }

  return (
    <div className="max-w-site mx-auto px-5 lg:px-10 py-32 max-md:py-20">
      <Head>
        <title>{project.title} | Tecnolight SRL</title>
        <meta name="description" content={project.description?.substring(0, 160)} />
      </Head>

      <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8" style={BODY}>
        <ArrowLeft size={18} /> Volver a Proyectos
      </Link>

      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-[4px] px-4 py-1.5 mb-4" style={MONO}>Proyecto Realizado</span>
          <h1 className="text-foreground leading-tight mb-6" style={{ ...HEADING, fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>{project.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground" style={BODY}>
            {project.client && <span className="flex items-center gap-2"><User size={16} className="text-primary" /> {project.client}</span>}
            {project.location && <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {project.location}</span>}
            <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {project.year}</span>
          </div>
        </header>

        <div className="space-y-12">
          <div>
            <h2 className="text-foreground mb-4" style={{ ...HEADING, fontSize: '1.5rem' }}>Descripción del Trabajo</h2>
            <p className="text-muted-foreground leading-relaxed" style={BODY}>{project.description}</p>
          </div>

          {project.images && project.images.length > 0 && (
            <div>
              <h2 className="text-foreground mb-6" style={{ ...HEADING, fontSize: '1.5rem' }}>Galería del Proyecto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((img, i) => (
                  <motion.div key={i} className="aspect-video bg-card border border-white/6 rounded-[4px] overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <img src={img} alt={`${project.title} - imagen ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {project.testimonial && (
            <div className="bg-card border border-white/6 rounded-[4px] p-8 flex items-start gap-4">
              <MessageSquare size={24} className="text-primary shrink-0 mt-1" />
              <blockquote className="text-lg italic leading-relaxed text-muted-foreground" style={BODY}>&ldquo;{project.testimonial}&rdquo;</blockquote>
            </div>
          )}
        </div>

        <div className="mt-16 bg-card border border-white/6 rounded-[4px] p-12 text-center flex flex-col items-center gap-4 max-md:p-8">
          <h3 className="text-foreground" style={{ ...HEADING, fontSize: '1.8rem' }}>¿Necesitás un trabajo similar?</h3>
          <p className="text-muted-foreground" style={BODY}>Contactanos para recibir asesoramiento y presupuesto personalizado.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-[4px] hover:bg-primary/80 transition-colors mt-2" style={BODY}>Solicitar Presupuesto</Link>
        </div>
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = ALL_PROJECTS.map(p => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = ALL_PROJECTS.find(p => p.slug === params.slug) || null;
  return { props: { project } };
}
