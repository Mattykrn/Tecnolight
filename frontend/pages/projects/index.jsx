import React from 'react';
import Head from 'next/head';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Projects({ projects }) {
  return (
    <div className="container-site py-32 max-md:py-20">
      <Head>
        <title>Proyectos Realizados | Tecnolight</title>
        <meta name="description" content="Nuestra trayectoria reflejada en obras de señalización vial y cartelería para municipios y constructoras de Argentina." />
      </Head>

      <div className="text-center max-w-[600px] mx-auto mb-16">
        <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Obras y Trayectoria</span>
        <h1 className="text-[2.5rem] font-bold mt-2 mb-4 max-md:text-3xl text-gray-900">Proyectos Realizados</h1>
        <p className="text-gray-500">Trabajamos junto a organismos gubernamentales y empresas privadas para equipar rutas, avenidas y desarrollos comerciales con señalización duradera y conforme a las regulaciones nacionales.</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF5A1F] hover:shadow-card-hover group">
              <div className="relative h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-6xl opacity-30">🚧</div>
                )}
                <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{project.location || 'Santa Fe'}</span>
                {project.client && (
                  <span className="absolute top-3 right-3 bg-[#FF5A1F]/10 text-[#FF5A1F] text-xs font-medium px-2.5 py-1 rounded-full">{project.client}</span>
                )}
              </div>
              <div className="p-6">
                <h2 className="font-bold text-lg mb-2 text-gray-900">{project.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{project.description}</p>
                {project.testimonial && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-500 text-xs italic">
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
          <h3 className="text-xl font-bold mb-2 text-gray-900">No se encontraron proyectos</h3>
          <p className="text-gray-500">Intentá nuevamente más tarde.</p>
        </div>
      )}

      <div className="text-center mt-12">
        <Link href="/contact" className="btn-primary">
          Solicitar Presupuesto <ArrowRight size={18} />
        </Link>
      </div>
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
