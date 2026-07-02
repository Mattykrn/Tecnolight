import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Send, MessageCircle, Ruler, Shield, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

const categoryStyles = {
  Reglamentarias: { icon: '🛑', color: 'from-red-500 to-red-700', bg: 'bg-red-50' },
  Preventivas: { icon: '⚠️', color: 'from-yellow-500 to-yellow-700', bg: 'bg-yellow-50' },
  Informativas: { icon: 'ℹ️', color: 'from-blue-500 to-blue-700', bg: 'bg-blue-50' },
  'Cartelería Comercial': { icon: '🏪', color: 'from-purple-500 to-purple-700', bg: 'bg-purple-50' }
};

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="container-site py-20 text-center text-text-muted">Cargando ficha técnica...</div>;
  }

  if (!product) {
    return (
      <div className="container-site py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <Link href="/catalog" className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-semibold mt-8"><ArrowLeft size={16} /> Volver al catálogo</Link>
      </div>
    );
  }

  const parseSpecs = (specsString) => {
    if (!specsString) return [];
    return specsString.split('\n').map((line, idx) => {
      const parts = line.split(':');
      if (parts.length >= 2) return { key: parts[0].trim(), value: parts.slice(1).join(':').trim(), id: idx };
      return { key: '', value: line.trim(), id: idx };
    });
  };

  const specsList = parseSpecs(product.specs);
  const catStyle = categoryStyles[product.category] || { icon: '📋', color: 'from-gray-500 to-gray-700', bg: 'bg-gray-50' };

  const materialSpec = specsList.find(s => s.key.toLowerCase() === 'material');
  const dimensionSpec = specsList.find(s => s.key.toLowerCase().includes('dimension') || s.key.toLowerCase().includes('medida'));
  const reflectivoSpec = specsList.find(s => s.key.toLowerCase().includes('reflectivo') || s.key.toLowerCase().includes('reflectivo'));
  const normativaSpec = specsList.find(s => s.key.toLowerCase().includes('normativa') || s.key.toLowerCase().includes('norma'));

  return (
    <div className="container-site py-32 max-md:py-20">
      <Head>
        <title>{product.name} | Ficha Técnica Tecnolight</title>
        <meta name="description" content={`Ficha técnica de ${product.name}. ${product.description}`} />
      </Head>

      <Link href="/catalog" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
        <ArrowLeft size={18} /> Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="relative">
          <span className="inline-block bg-bg-dark/80 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full text-text-main mb-4">{product.category}</span>
          <div className={`w-full aspect-square ${catStyle.bg} border border-border rounded-2xl flex items-center justify-center`}>
            <span className="text-[8rem] leading-none">{catStyle.icon}</span>
          </div>
          {(materialSpec || dimensionSpec) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {materialSpec && <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"><Ruler size={13} /> {materialSpec.value}</span>}
              {dimensionSpec && <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"><Info size={13} /> {dimensionSpec.value}</span>}
              {reflectivoSpec && <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"><AlertTriangle size={13} /> {reflectivoSpec.value}</span>}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-3">{product.name}</h1>
            <span className="text-2xl font-bold text-primary">{product.price ? `$${product.price.toLocaleString('es-AR')}` : 'Cotización requerida'}</span>
            {product.stock !== undefined && (
              <span className={`ml-3 inline-flex items-center gap-1 text-sm font-medium ${product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-yellow-500' : 'text-green-500'}`}>
                <CheckCircle2 size={14} />
                {product.stock === 0 ? 'Consultar disponibilidad' : `${product.stock} uds. disponibles`}
              </span>
            )}
          </div>

          <p className="text-gray-500 leading-relaxed">{product.description}</p>

          {(normativaSpec || reflectivoSpec) && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
              <Shield size={20} className="text-green-600 shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-semibold mb-0.5">Certificación y Calidad</p>
                <p>{normativaSpec?.value ? `Normativa: ${normativaSpec.value}.` : ''} Fabricado con materiales reflectivos de alta durabilidad. Homologado bajo norma IRAM 3950.</p>
              </div>
            </div>
          )}

          {specsList.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-4">Especificaciones Técnicas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specsList.map((spec) => (
                  spec.key ? (
                    <div key={spec.id} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                      <span className="text-xs text-gray-400 block mb-0.5">{spec.key}</span>
                      <span className="text-sm font-semibold text-gray-900">{spec.value}</span>
                    </div>
                  ) : (
                    <div key={spec.id} className="sm:col-span-2 text-sm text-gray-500 italic">{spec.value}</div>
                  )
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            <a href={`https://wa.me/543424567890?text=${encodeURIComponent(`Hola Tecnolight, me interesa cotizar el producto: ${product.name} (${product.category})`)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-[#1DA851] hover:-translate-y-0.5 hover:shadow-lg">
              <MessageCircle size={18} /> Consultar por WhatsApp
            </a>
            <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="inline-flex items-center gap-2 bg-[#FF5A1F] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-[#E04E1A] hover:-translate-y-0.5 hover:shadow-lg">
              Solicitar Presupuesto <Send size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${slug}`);
    if (res.status === 404) return { props: { product: null } };
    const data = await res.json();
    return { props: { product: data.product || null } };
  } catch (error) {
    console.error('Error fetching product in SSR:', error);
    return { props: { product: null } };
  }
}
