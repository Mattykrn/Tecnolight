/* ============================================================
   pages/_document.js — Documento HTML personalizado
   SEO: meta tags, Open Graph, Twitter Cards, favicon,
   Google Fonts, Google Analytics, Schema.org LocalBusiness
   ============================================================ */

import { Html, Head, Main, NextScript } from 'next/document';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Tecno Light - Señalización Vial y Cartelería en Santa Fe, Argentina. Más de 30 años de experiencia fabricando seguridad vial premium: señales reglamentarias, preventivas, informativas y cartelería comercial."
        />
        <meta
          name="keywords"
          content="señalización vial Santa Fe, carteles Tecno Light, señales reglamentarias Argentina, cartelería comercial, seguridad vial, señales preventivas, Tecno Light Santa Fe"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tecnolight.com.ar/" />
        <meta property="og:title" content="Tecno Light – Señalización Vial y Cartelería | Santa Fe" />
        <meta
          property="og:description"
          content="Más de 30 años de trayectoria en señalización vial y cartelería. Señales reglamentarias, preventivas e informativas de alta calidad para municipios y empresas."
        />
        <meta property="og:image" content="https://tecnolight.com.ar/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tecno Light – Señalización Vial | Santa Fe, Argentina" />
        <meta
          name="twitter:description"
          content="Más de 30 años de trayectoria en señalización vial y cartelería de alta calidad."
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/logo-tecnolight.png" type="image/png" sizes="160x160" />
        <link rel="apple-touch-icon" href="/images/logo-tecnolight.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Google Fonts – Barlow Condensed + JetBrains Mono + Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics (carga condicional) */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true
                  });
                `,
              }}
            />
          </>
        )}

        {/* Schema.org – LocalBusiness (SEO estructurado) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Tecno Light',
              description:
                'Empresa líder en señalización vial y cartelería con más de 30 años de trayectoria en Santa Fe, Argentina.',
              url: 'https://tecnolight.com.ar',
              telephone: '+54-342-455-3582',
              email: 'ventas@tecnolight.com.ar',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Salvador Caputto 3243',
                addressLocality: 'Santa Fe',
                addressRegion: 'Santa Fe',
                addressCountry: 'AR',
                postalCode: 'S3000',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -31.6333,
                longitude: -60.7,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '17:00',
                },
              ],
              taxID: '30-69238932-4',
              sameAs: [
                'https://www.facebook.com/tecnolight',
                'https://www.instagram.com/tecnolight.srl',
              ],
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
