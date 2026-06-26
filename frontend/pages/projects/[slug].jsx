import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, User, Calendar, MessageSquare } from 'lucide-react';

export default function ProjectDetail({ project }) {
  if (!project) {
    return (
      <div className="container-site py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Proyecto no encontrado</h1>
        <p className="text-text-muted mb-8">El proyecto que buscas no existe o fue eliminado.</p>
        <Link href="/projects" className="btn-primary inline-flex"><ArrowLeft size={18} /> Volver a Proyectos</Link>
      </div>
    );
  }

  return (
    <div className="container-site py-32 max-md:py-20">
      <Head>
        <title>{project.title} | Tecnolight</title>
        <meta name="description" content={project.description?.substring(0, 160)} />
      </Head>

      <Link href="/projects" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
        <ArrowLeft size={18} /> Volver a Proyectos
      </Link>

      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/35 rounded-full px-4 py-1.5 mb-4">Proyecto Realizado</span>
          <h1 className="text-4xl font-extrabold mb-6 max-md:text-3xl">{project.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-text-muted">
            {project.client && <span className="flex items-center gap-2"><User size={16} className="text-primary" /> {project.client}</span>}
            {project.location && <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {project.location}</span>}
            <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {new Date(project.createdAt).toLocaleDateString('es-AR')}</span>
          </div>
        </header>

        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Descripción del Trabajo</h2>
            <p className="text-text-muted leading-relaxed">{project.description}</p>
          </div>

          {project.images && project.images.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Galería del Proyecto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((img, i) => (
                  <motion.div key={i} className="aspect-video bg-bg-surface border border-border rounded-xl overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <img src={img} alt={`${project.title} - imagen ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {project.testimonial && (
            <div className="bg-bg-card border border-border rounded-xl p-8 flex items-start gap-4">
              <MessageSquare size={24} className="text-primary shrink-0 mt-1" />
              <blockquote className="text-lg italic leading-relaxed text-text-main">&ldquo;{project.testimonial}&rdquo;</blockquote>
            </div>
          )}
        </div>

        <div className="mt-16 bg-gradient-to-br from-bg-surface to-[#151a24] border border-border rounded-2xl p-12 text-center flex flex-col items-center gap-4 max-md:p-8">
          <h3 className="text-2xl font-bold">¿Necesitás un trabajo similar?</h3>
          <p className="text-text-muted">Contactanos para recibir asesoramiento y presupuesto personalizado.</p>
          <Link href="/contact" className="btn-primary mt-2">Solicitar Presupuesto</Link>
        </div>
      </article>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects/${params.slug}`);
    if (!res.ok) return { props: { project: null } };
    const data = await res.json();
    return { props: { project: data.project || data } };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { props: { project: null } };
  }
}
