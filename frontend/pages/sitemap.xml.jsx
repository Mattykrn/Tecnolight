const FRONTEND_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tecnolight.com.ar';

const PROJECT_SLUGS = [
  'senalizacion-urbana-santa-fe', 'autopista-rosario-cordoba', 'puerto-de-santa-fe',
  'parque-industrial-santa-fe', 'autopista-rosario-cordoba-tramo-ii',
  'puerto-santa-fe-etapa-ii', 'demarcacion-ruta-9', 'puerto-san-martin'
];

export async function getServerSideProps({ res }) {
  const now = new Date().toISOString();
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/projects', priority: '0.8', changefreq: 'monthly' },
    { loc: '/about', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.7', changefreq: 'yearly' },
  ];

  const projectUrls = PROJECT_SLUGS.map(slug => `  <url>
    <loc>${FRONTEND_URL}/projects/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.65</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Páginas estáticas -->
${staticPages.map(p => `  <url>
    <loc>${FRONTEND_URL}${p.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}

  <!-- Proyectos realizados -->
${projectUrls}

</urlset>`;

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function SiteMap() { return null; }
