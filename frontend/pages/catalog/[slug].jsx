import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Send, Phone } from 'lucide-react';

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
          <div className="w-full aspect-square bg-bg-surface border border-border rounded-2xl flex items-center justify-center">
            <span className="text-[8rem] leading-none">
              {product.category === 'Reglamentarias' ? '🛑' : product.category === 'Preventivas' ? '⚠️' : 'ℹ️'}
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-3">{product.name}</h1>
            <span className="text-2xl font-bold text-primary">{product.price ? `$${product.price.toLocaleString('es-AR')}` : 'Cotización requerida'}</span>
          </div>

          <p className="text-text-muted leading-relaxed">{product.description}</p>

          {specsList.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-4">Especificaciones Técnicas</h3>
              <ul className="space-y-3">
                {specsList.map((spec) => (
                  <li key={spec.id} className="flex items-start gap-3">
                    {spec.key ? (
                      <>
                        <span className="font-medium text-text-main min-w-[140px] text-sm">{spec.key}</span>
                        <span className="text-text-muted text-sm">{spec.value}</span>
                      </>
                    ) : (
                      <span className="text-text-muted text-sm italic">{spec.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="btn-primary">
              Solicitar Presupuesto <Send size={16} />
            </Link>
            <a href={`https://wa.me/543424567890?text=${encodeURIComponent(`Hola Tecnolight, me interesa cotizar el producto: ${product.name}`)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Consultar por WhatsApp <Phone size={16} />
            </a>
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
