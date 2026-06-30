import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Shield, CheckCircle2, Package, TrendingUp } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Catalog({ initialProducts, categories }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  useEffect(() => {
    if (router.query.category) setActiveCategory(router.query.category);
    else setActiveCategory('Todas');
  }, [router.query.category]);

  useEffect(() => {
    let result = initialProducts;
    if (activeCategory !== 'Todas') result = result.filter(p => p.category === activeCategory);
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        (p.specs && p.specs.toLowerCase().includes(term))
      );
    }
    setFilteredProducts(result);
  }, [searchTerm, activeCategory, initialProducts]);

  const handleCategoryChange = (category) => {
    if (category === 'Todas') {
      const { category: _, ...rest } = router.query;
      router.push({ pathname: '/catalog', query: rest }, undefined, { shallow: true });
    } else {
      router.push({ pathname: '/catalog', query: { ...router.query, category } }, undefined, { shallow: true });
    }
  };

  return (
    <div>
      <Head>
        <title>Catálogo de Señales Viales y Cartelería | Tecnolight</title>
        <meta name="description" content="Explorá nuestro catálogo de señales de tránsito reglamentarias, preventivas, informativas y cartelería especial homologadas. Tecnolight Santa Fe." />
      </Head>

      <section className="relative min-h-[70vh] flex items-center overflow-hidden py-32 max-md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/obras/highway-signs.webp" alt="" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,0.12)_0%,transparent_60%)]" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />
        </div>
        <div className="texture-stripes" />
        <div className="container-site relative z-[1]">
          <motion.div className="max-w-[700px]" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 rounded-full text-xs font-semibold text-[#FF5A1F] mb-6">
              <Package size={14} />
              Catálogo Oficial
            </div>
            <h1 className="text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white m-0">
              Señalización Vial{' '}
              <span className="relative text-[#FF5A1F] inline-block">
                de Alta Especificación
                <motion.span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF5A1F] to-transparent rounded origin-left"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-[580px] mt-4">
              Fabricamos señales reglamentarias, preventivas e informativas con láminas reflectivas homologadas por Vialidad Nacional. Calidad certificada bajo norma IRAM 3950.
            </p>
            <motion.div className="flex flex-wrap items-center gap-4 text-sm text-white/40 mt-4" variants={fadeUp}>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#FF5A1F]" /> Norma IRAM 3950</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#FF5A1F]" /> Materiales 3M</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#FF5A1F]" /> Vialidad Nacional</span>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-[15%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-[400px] mx-auto" />
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/obras/hero-night.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="section-overlay-warm" />
        </div>
        <div className="texture-stripes" />
        <div className="container-site relative z-[1]">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-colors shadow-sm" placeholder="Buscar señal por nombre o especificación..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-2">
              <button className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === 'Todas' ? 'bg-[#FF5A1F] text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-900 hover:border-gray-400 shadow-sm'}`} onClick={() => handleCategoryChange('Todas')}>Todas</button>
              {categories.map((cat) => (
                <button key={cat} className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat ? 'bg-[#FF5A1F] text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-900 hover:border-gray-400 shadow-sm'}`} onClick={() => handleCategoryChange(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF5A1F] hover:shadow-card-hover group">
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    <span className="text-6xl transition-transform duration-500 group-hover:scale-110">
                      {product.category === 'Reglamentarias' ? '🛑' : product.category === 'Preventivas' ? '⚠️' : 'ℹ️'}
                    </span>
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">{product.category}</span>
                    {product.price && (
                      <span className="absolute top-3 left-3 bg-[#FF5A1F] text-white text-xs font-bold px-2.5 py-1 rounded-full">${product.price.toLocaleString('es-AR')}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{product.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{product.description.substring(0, 120)}...</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                      <span className="text-[#FF5A1F] font-semibold text-sm">{product.price ? `$${product.price.toLocaleString('es-AR')}` : 'A cotizar'}</span>
                      <Link href={`/catalog/${product.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF5A1F] hover:text-[#E04E1A] transition-colors">
                        Ver Ficha <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-30">🔍</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">No se encontraron productos</h3>
              <p className="text-gray-500">Intentá cambiando los términos de búsqueda o filtros.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/obras/projects-aerial.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="section-overlay-warm" />
        </div>
        <div className="texture-stripes" />
        <div className="container-site relative z-[1]">
          <motion.div className="text-center max-w-[600px] mx-auto mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Necesitas una Señal Especial?</h2>
            <p className="text-gray-500">Fabricamos cartelería personalizada para proyectos municipales, rutas provinciales y desarrollos privados. Consultanos sin compromiso.</p>
          </motion.div>
          <motion.div className="flex justify-center gap-4 max-md:flex-col max-md:items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Link href="/contact" className="btn-primary text-base">
              Solicitar Cotización <ArrowRight size={18} />
            </Link>
            <Link href="/projects" className="btn-secondary">
              Ver Proyectos Realizados
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products?active=true`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/categories`)
    ]);
    const productsData = await productsRes.json();
    const categoriesData = await categoriesRes.json();
    return { props: { initialProducts: productsData.products || [], categories: categoriesData.categories || [] } };
  } catch (error) {
    console.error('Error in catalog SSR:', error);
    return { props: { initialProducts: [], categories: ['Reglamentarias', 'Preventivas', 'Informativas', 'Cartelería Comercial'] } };
  }
}
