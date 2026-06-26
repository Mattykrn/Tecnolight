import React from 'react';
import Head from 'next/head';
import { MessageSquare } from 'lucide-react';
import InstagramGallery from '../../components/InstagramGallery';

export default function Projects({ projects }) {
  return (
    <div className="container-site py-32 max-md:py-20">
      <Head>
        <title>Proyectos Realizados | Tecnolight</title>
        <meta name="description" content="Nuestra trayectoria reflejada en obras de señalización vial y cartelería para municipios y constructoras de Argentina." />
      </Head>

      <div className="text-center max-w-[600px] mx-auto mb-16">
        <span className="text-primary font-semibold tracking-wider uppercase text-sm">Obras y Trayectoria</span>
        <h1 className="text-[2.5rem] font-bold mt-2 mb-4 max-md:text-3xl">Proyectos Realizados</h1>
        <p className="text-text-muted">Trabajamos junto a organismos gubernamentales y empresas privadas para equipar rutas, avenidas y desarrollos comerciales con señalización duradera y conforme a las regulaciones nacionales.</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-premium group">
              <div className="relative h-52 bg-bg-surface flex items-center justify-center">
                <span className="absolute top-3 left-3 bg-bg-dark/80 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-text-main">{project.location}</span>
                <span className="absolute top-3 right-3 bg-primary/20 text-primary text-xs font-medium px-2.5 py-1 rounded-full">{project.client}</span>
                <div className="text-6xl">🚧</div>
              </div>
              <div className="p-6">
                <h2 className="font-bold text-lg mb-2">{project.title}</h2>
                <p className="text-text-muted text-sm leading-relaxed">{project.description}</p>
                {project.testimonial && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-text-muted text-xs italic">
                      <MessageSquare size={14} className="inline text-primary mr-1 align-middle" />
                      &ldquo;{project.testimonial}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-bold mb-2">No se encontraron proyectos</h3>
          <p className="text-text-muted">Intentá nuevamente más tarde.</p>
        </div>
      )}

      <InstagramGallery />
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
