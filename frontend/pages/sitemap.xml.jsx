/**
 * pages/sitemap.xml.jsx
 * Genera un sitemap dinámico para SEO incluyendo productos y proyectos.
 * Se accede en: /sitemap.xml
 */

const FRONTEND_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tecnolight.com.ar';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function generateSiteMap(products, projects) {
  const now = new Date().toISOString();

  // Páginas estáticas
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/catalog', priority: '0.9', changefreq: 'weekly' },
    { loc: '/projects', priority: '0.8', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.7', changefreq: 'yearly' },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Páginas estáticas -->
${staticPages
  .map(
    (page) => `  <url>
    <loc>${FRONTEND_URL}${page.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}

  <!-- Productos del catálogo -->
${products
  .map(
    (product) => `  <url>
    <loc>${FRONTEND_URL}/catalog/${product.slug}</loc>
    <lastmod>${new Date(product.updatedAt || now).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`
  )
  .join('\n')}

  <!-- Proyectos realizados -->
${projects
  .map(
    (project) => `  <url>
    <loc>${FRONTEND_URL}/projects/${project.slug}</loc>
    <lastmod>${new Date(project.updatedAt || now).toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.65</priority>
  </url>`
  )
  .join('\n')}

</urlset>`;
}

function SiteMap() {
  // No renderiza nada — el sitemap se genera en getServerSideProps
  return null;
}

export async function getServerSideProps({ res }) {
  let products = [];
  let projects = [];

  try {
    const [productsRes, projectsRes] = await Promise.all([
      fetch(`${API_URL}/api/products`),
      fetch(`${API_URL}/api/projects`),
    ]);

    if (productsRes.ok) {
      const data = await productsRes.json();
      products = data.products || [];
    }

    if (projectsRes.ok) {
      const data = await projectsRes.json();
      projects = data.projects || [];
    }
  } catch (error) {
    console.warn('[sitemap] No se pudo conectar a la API:', error.message);
  }

  const sitemap = generateSiteMap(products, projects);

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default SiteMap;
