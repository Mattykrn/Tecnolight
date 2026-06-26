/**
 * ============================================
 * PÁGINA DE CATÁLOGO - LISTADO DE PRODUCTOS
 * ============================================
 * 
 * Muestra el catálogo completo de señales viales y cartelería.
 * Incluye sistema de filtrado por categoría y búsqueda por texto.
 * 
 * Características:
 * - Filtrado dinámico por categorías (Reglamentarias, Preventivas, etc.)
 * - Búsqueda en tiempo real por nombre, descripción y especificaciones
 * - Sincronización con URL query params para compartir filtros
 * - SSR inicial para SEO (productos cargados desde el servidor)
 * 
 * Datos recibidos:
 * - initialProducts: Array de productos desde la API (SSR)
 * - categories: Array de categorías disponibles
 * 
 * @module CatalogPage
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Hook para acceder a la URL y query params
import { Search, ArrowRight, Layers, FileSpreadsheet } from 'lucide-react'; // Iconos
import styles from '../../styles/Catalog.module.css';

/**
 * Componente principal del catálogo
 * 
 * @param {Object} props - Props del componente
 * @param {Array} props.initialProducts - Productos iniciales desde SSR
 * @param {Array} props.categories - Lista de categorías disponibles
 */
export default function Catalog({ initialProducts, categories }) {
  const router = useRouter();
  
  // ============================================
  // ESTADOS LOCALES
  // ============================================
  
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  const [activeCategory, setActiveCategory] = useState('Todas'); // Categoría seleccionada
  const [filteredProducts, setFilteredProducts] = useState(initialProducts); // Productos filtrados

  // ============================================
  // SINCRONIZACIÓN CON URL
  // ============================================
  
  /**
   * useEffect: Sincronizar categoría desde query params de la URL
   * 
   * Permite compartir URLs con filtros aplicados.
   * Ejemplo: /catalog?category=Preventivas
   * 
   * Se ejecuta cuando cambia router.query.category
   */
  useEffect(() => {
    if (router.query.category) {
      setActiveCategory(router.query.category);
    } else {
      setActiveCategory('Todas');
    }
  }, [router.query.category]);

  // ============================================
  // FILTRADO DE PRODUCTOS
  // ============================================
  
  /**
   * useEffect: Aplicar filtros de búsqueda y categoría
   * 
   * Se ejecuta cuando cambia:
   * - searchTerm: Usuario escribe en el buscador
   * - activeCategory: Usuario cambia de categoría
   * - initialProducts: Cambian los productos base
   * 
   * Filtros aplicados:
   * 1. Por categoría (si no es "Todas")
   * 2. Por texto en nombre, descripción y especificaciones
   */
  useEffect(() => {
    let result = initialProducts;

    // Filtro por categoría
    if (activeCategory !== 'Todas') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filtro por texto de búsqueda
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          (p.specs && p.specs.toLowerCase().includes(term))
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, activeCategory, initialProducts]);

  // ============================================
  // MANEJO DE CAMBIO DE CATEGORÍA
  // ============================================
  
  /**
   * Cambia la categoría activa y actualiza la URL
   * 
   * @param {string} category - Nombre de la categoría a filtrar
   */
  const handleCategoryChange = (category) => {
    if (category === 'Todas') {
      const { category: _, ...rest } = router.query;
      router.push({ pathname: '/catalog', query: rest }, undefined, { shallow: true });
    } else {
      router.push({ pathname: '/catalog', query: { ...router.query, category } }, undefined, { shallow: true });
    }
  };

  // ============================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================
  
  return (
    <div className={`${styles.catalogContainer} container`}>
      {/* ============================================
          HEAD: Meta tags SEO
          ============================================ */}
      <Head>
        <title>Catálogo de Señales Viales y Cartelería | Tecnolight</title>
        <meta name="description" content="Explorá nuestro catálogo de señales de tránsito reglamentarias, preventivas, informativas y cartelería especial homologadas. Tecnolight Santa Fe." />
      </Head>

      {/* ============================================
          ENCABEZADO DE LA PÁGINA
          ============================================ */}
      <div className={styles.intro}>
        <span style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Catálogo Oficial</span>
        <h1>Señales y Cartelería</h1>
        <p>
          Fabricamos productos de señalización de alta especificación técnica utilizando láminas reflectivas homologadas por Vialidad Nacional. Seleccioná una categoría para explorar especificaciones y solicitar cotizaciones.
        </p>
      </div>

      {/* ============================================
          CONTROLES: BUSCADOR Y FILTROS
          ============================================ */}
      <div className={styles.controls}>
        {/* Buscador de texto */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar señal por nombre o especificación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtros de categoría */}
        <div className={styles.categoriesNav}>
          <button
            className={`${styles.filterBtn} ${activeCategory === 'Todas' ? styles.filterBtnActive : ''}`}
            onClick={() => handleCategoryChange('Todas')}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================
          GRID DE PRODUCTOS
          ============================================ */}
      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imgArea}>
                {/* Indicador visual cuando no hay imagen */}
                <div className={styles.placeholderSign}>
                  <span className={styles.placeholderSignText}>
                    {product.category === 'Reglamentarias' ? '🛑' : product.category === 'Preventivas' ? '⚠️' : 'ℹ️'}
                  </span>
                </div>
                <span className={styles.categoryTag}>{product.category}</span>
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p>{product.description.substring(0, 120)}...</p>
                <div className={styles.cardFooter}>
                  <span className={styles.price}>
                    {product.price ? `$${product.price.toLocaleString('es-AR')}` : 'Cotizar'}
                  </span>
                  <Link href={`/catalog/${product.slug}`} className={styles.link}>
                    Ver Ficha <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>No se encontraron productos</h3>
          <p>Intentá cambiando los términos de búsqueda o filtros.</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// SERVER-SIDE RENDERING (SSR)
// ============================================

/**
 * getServerSideProps: Carga datos iniciales del catálogo
 * 
 * Se ejecuta en el servidor antes de renderizar la página.
 * Obtiene productos activos y categorías en paralelo.
 * 
 * Ventajas:
 * - SEO: Contenido indexable por Google
 * - Performance: Datos listos al cargar la página
 * - Compartibilidad: URLs con filtros pre-aplicados
 * 
 * @returns {Object} props con productos y categorías
 */
export async function getServerSideProps() {
  try {
    // Fetch paralelo de productos y categorías (mejor performance)
    const [productsRes, categoriesRes] = await Promise.all([
      // Obtener todos los productos activos
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products?active=true`),
      // Obtener lista de categorías únicas
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/categories`)
    ]);

    // Parsear respuestas JSON
    const productsData = await productsRes.json();
    const categoriesData = await categoriesRes.json();

    // Pasar datos como props al componente
    return {
      props: {
        initialProducts: productsData.products || [],
        categories: categoriesData.categories || []
      }
    };
  } catch (error) {
    // En caso de error, retornar valores por defecto
    console.error('Error in catalog SSR:', error);
    return {
      props: {
        initialProducts: [],
        categories: ['Reglamentarias', 'Preventivas', 'Informativas', 'Cartelería Comercial']
      }
    };
  }
}