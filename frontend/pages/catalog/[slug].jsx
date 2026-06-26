/**
 * ============================================
 * PÁGINA DE DETALLE DE PRODUCTO
 * ============================================
 * 
 * Muestra la ficha técnica completa de un producto específico.
 * Incluye especificaciones técnicas, precio y llamadas a la acción.
 * 
 * Características:
 * - SSR para obtener producto por slug desde el servidor
 * - Parsing de especificaciones técnicas (formato clave:valor)
 * - CTAs para solicitar presupuesto y consultar por WhatsApp
 * - Manejo de estados: loading, error, producto no encontrado
 * 
 * Datos recibidos:
 * - product: Objeto completo del producto desde la API
 * 
 * @module ProductDetailPage
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Hook para detectar fallback de SSR
import { ArrowLeft, Send, Phone } from 'lucide-react'; // Iconos
import styles from '../../styles/ProductDetail.module.css';

/**
 * Componente de detalle de producto
 * 
 * @param {Object} props - Props del componente
 * @param {Object|null} props.product - Datos del producto (null si no existe)
 */
export default function ProductDetail({ product }) {
  const router = useRouter();

  // ============================================
  // ESTADOS DE CARGA Y ERROR
  // ============================================
  
  // Fallback de SSR: Next.js está generando la página
  if (router.isFallback) {
    return <div className="container" style={{ padding: '5rem 0' }}>Cargando ficha técnica...</div>;
  }

  // Producto no encontrado (slug inválido o eliminado)
  if (!product) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Producto no encontrado</h2>
        <Link href="/catalog" className={styles.backBtn} style={{ marginTop: '2rem' }}>
          <ArrowLeft size={16} /> Volver al catálogo
        </Link>
      </div>
    );
  }

  // ============================================
  // UTILIDADES
  // ============================================
  
  /**
   * Parsea el string de especificaciones técnicas
   * 
   * Formato esperado: "Clave: Valor\nClave2: Valor2"
   * Ejemplo:
   *   "Material: Aluminio\nReflectivo: Grado engineering\nDimensiones: 60x60cm"
   * 
   * @param {string} specsString - String con especificaciones
   * @returns {Array} Array de objetos {key, value, id}
   */
  const parseSpecs = (specsString) => {
    if (!specsString) return [];
    return specsString.split('\n').map((line, idx) => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        return {
          key: parts[0].trim(),
          value: parts.slice(1).join(':').trim(),
          id: idx
        };
      }
      return {
        key: '',
        value: line.trim(),
        id: idx
      };
    });
  };

  const specsList = parseSpecs(product.specs);

  // ============================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================
  
  return (
    <div className={`${styles.wrapper} container`}>
      {/* ============================================
          HEAD: Meta tags SEO para producto específico
          ============================================ */}
      <Head>
        <title>{product.name} | Ficha Técnica Tecnolight</title>
        <meta name="description" content={`Ficha técnica de ${product.name}. ${product.description}`} />
      </Head>

      {/* ============================================
          NAVEGACIÓN: Volver al catálogo
          ============================================ */}
      <Link href="/catalog" className={styles.backBtn}>
        <ArrowLeft size={18} /> Volver al catálogo
      </Link>

      {/* ============================================
          CONTENIDO PRINCIPAL
          ============================================ */}
      <div className={styles.grid}>
        {/* ============================================
            COLUMNA IZQUIERDA: Imagen y categoría
            ============================================ */}
        <div className={styles.imageArea}>
          <span className={styles.tag}>{product.category}</span>
          <div className={styles.largeSignGraphic}>
            <span className={styles.largeSignText}>
              {product.category === 'Reglamentarias' ? '🛑' : product.category === 'Preventivas' ? '⚠️' : 'ℹ️'}
            </span>
          </div>
        </div>

        {/* ============================================
            COLUMNA DERECHA: Detalles y especificaciones
            ============================================ */}
        <div className={styles.details}>
          <div className={styles.titleArea}>
            <h1>{product.name}</h1>
            <span className={styles.price}>
              {product.price ? `$${product.price.toLocaleString('es-AR')}` : 'Cotización requerida'}
            </span>
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* ============================================
              ESPECIFICACIONES TÉCNICAS
              ============================================ */}
          {specsList.length > 0 && (
            <div className={styles.specsArea}>
              <h3>Especificaciones Técnicas</h3>
              <ul className={styles.specsList}>
                {specsList.map((spec) => (
                  <li key={spec.id} className={styles.specItem}>
                    {spec.key ? (
                      <>
                        <span className={spec.key ? styles.specKey : ''}>{spec.key}</span>
                        <span className={styles.specVal}>{spec.value}</span>
                      </>
                    ) : (
                      <span className={styles.specVal} style={{ fontStyle: 'italic' }}>{spec.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ============================================
              CALL-TO-ACTION: Botones de contacto
              ============================================ */}
          <div className={styles.actions}>
            <Link 
              href={`/contact?product=${encodeURIComponent(product.name)}`} 
              className="btn-primary"
            >
              Solicitar Presupuesto <Send size={16} />
            </Link>
            <a 
              href={`https://wa.me/543424567890?text=${encodeURIComponent(`Hola Tecnolight, me interesa cotizar el producto: ${product.name}`)}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
            >
              Consultar por WhatsApp <Phone size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// FIN DEL COMPONENTE
// ============================================

// ============================================
// SERVER-SIDE RENDERING (SSR)
// ============================================

/**
 * getServerSideProps: Obtiene producto por slug desde el servidor
 * 
 * Flujo:
 * 1. Next.js extrae el slug de la URL (ej: /catalog/senal-pare)
 * 2. Hace fetch a la API para obtener el producto
 * 3. Si existe, lo pasa como prop al componente
 * 4. Si no existe (404), retorna product: null
 * 
 * Ventajas:
 * - SEO: Cada producto tiene su URL única indexable
 * - Performance: El producto se carga antes de mostrar la página
 * - Manejo de errores: Muestra mensaje amigable si no existe
 * 
 * @param {Object} context - Contexto de Next.js
 * @param {string} context.params.slug - Slug del producto desde la URL
 * @returns {Object} props con el producto o null
 */
export async function getServerSideProps({ params }) {
  // Extraer slug de la URL
  const { slug } = params;

  try {
    // Fetch a la API para obtener producto por slug
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${slug}`);
    
    // Manejar caso de producto no encontrado
    if (res.status === 404) {
      return {
        props: {
          product: null
        }
      };
    }

    // Parsear respuesta
    const data = await res.json();

    // Retornar producto como prop
    return {
      props: {
        product: data.product || null
      }
    };
  } catch (error) {
    // En caso de error, retornar null
    console.error('Error fetching product in SSR:', error);
    return {
      props: {
        product: null
      }
    };
  }
}
