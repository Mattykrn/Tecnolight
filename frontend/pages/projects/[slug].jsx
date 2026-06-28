import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, User, Calendar, MessageSquare } from 'lucide-react';

export default function ProjectDetail({ project }) {
  if (!project) {
    return (
      <div className="container-site py-32 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Proyecto no encontrado</h1>
        <p className="text-gray-500 mb-8">El proyecto que buscas no existe o fue eliminado.</p>
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

      <Link href="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF5A1F] transition-colors mb-8">
        <ArrowLeft size={18} /> Volver a Proyectos
      </Link>

      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#FF5A1F] bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-4">Proyecto Realizado</span>
          <h1 className="text-4xl font-extrabold mb-6 max-md:text-3xl text-gray-900">{project.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            {project.client && <span className="flex items-center gap-2"><User size={16} className="text-[#FF5A1F]" /> {project.client}</span>}
            {project.location && <span className="flex items-center gap-2"><MapPin size={16} className="text-[#FF5A1F]" /> {project.location}</span>}
            <span className="flex items-center gap-2"><Calendar size={16} className="text-[#FF5A1F]" /> {new Date(project.createdAt).toLocaleDateString('es-AR')}</span>
          </div>
        </header>

        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Descripción del Trabajo</h2>
            <p className="text-gray-500 leading-relaxed">{project.description}</p>
          </div>

          {project.images && project.images.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Galería del Proyecto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((img, i) => (
                  <motion.div key={i} className="aspect-video bg-gray-50 border border-gray-100 rounded-xl overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <img src={img} alt={`${project.title} - imagen ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {project.testimonial && (
            <div className="bg-white border border-gray-100 rounded-xl p-8 flex items-start gap-4">
              <MessageSquare size={24} className="text-[#FF5A1F] shrink-0 mt-1" />
              <blockquote className="text-lg italic leading-relaxed text-gray-700">&ldquo;{project.testimonial}&rdquo;</blockquote>
            </div>
          )}
        </div>

        <div className="mt-16 bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-12 text-center flex flex-col items-center gap-4 max-md:p-8">
          <h3 className="text-2xl font-bold text-gray-900">¿Necesitás un trabajo similar?</h3>
          <p className="text-gray-500">Contactanos para recibir asesoramiento y presupuesto personalizado.</p>
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
