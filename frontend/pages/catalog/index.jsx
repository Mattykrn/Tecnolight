import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search, ArrowRight } from 'lucide-react';

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
    <div className="container-site py-32 max-md:py-20">
      <Head>
        <title>Catálogo de Señales Viales y Cartelería | Tecnolight</title>
        <meta name="description" content="Explorá nuestro catálogo de señales de tránsito reglamentarias, preventivas, informativas y cartelería especial homologadas. Tecnolight Santa Fe." />
      </Head>

      <div className="text-center max-w-[600px] mx-auto mb-16">
        <span className="text-primary font-semibold tracking-wider uppercase text-sm">Catálogo Oficial</span>
        <h1 className="text-[2.5rem] font-bold mt-2 mb-4 max-md:text-3xl">Señales y Cartelería</h1>
        <p className="text-text-muted">Fabricamos productos de señalización de alta especificación técnica utilizando láminas reflectivas homologadas por Vialidad Nacional. Seleccioná una categoría para explorar especificaciones y solicitar cotizaciones.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input type="text" className="w-full bg-bg-surface border border-border rounded-xl pl-12 pr-4 py-3.5 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Buscar señal por nombre o especificación..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === 'Todas' ? 'bg-primary text-bg-dark' : 'bg-bg-surface text-text-muted border border-border hover:text-text-main hover:border-text-main'}`} onClick={() => handleCategoryChange('Todas')}>Todas</button>
          {categories.map((cat) => (
            <button key={cat} className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat ? 'bg-primary text-bg-dark' : 'bg-bg-surface text-text-muted border border-border hover:text-text-main hover:border-text-main'}`} onClick={() => handleCategoryChange(cat)}>{cat}</button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-premium group">
              <div className="relative h-48 bg-bg-surface flex items-center justify-center">
                <div className="text-6xl">
                  {product.category === 'Reglamentarias' ? '🛑' : product.category === 'Preventivas' ? '⚠️' : 'ℹ️'}
                </div>
                <span className="absolute top-3 right-3 bg-bg-dark/80 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-text-main">{product.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">{product.description.substring(0, 120)}...</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-primary font-semibold">{product.price ? `$${product.price.toLocaleString('es-AR')}` : 'Cotizar'}</span>
                  <Link href={`/catalog/${product.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors">Ver Ficha <ArrowRight size={16} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
          <p className="text-text-muted">Intentá cambiando los términos de búsqueda o filtros.</p>
        </div>
      )}
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
