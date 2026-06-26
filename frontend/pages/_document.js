import { Html, Head, Main, NextScript } from 'next/document';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Tecnolight - Señalización Vial y Cartelería en Santa Fe, Argentina. Más de 30 años de experiencia fabricando seguridad vial premium: señales reglamentarias, preventivas, informativas y cartelería comercial."
        />
        <meta
          name="keywords"
          content="señalización vial Santa Fe, carteles Tecnolight, señales reglamentarias Argentina, cartelería comercial, seguridad vial, señales preventivas, Tecnolight Santa Fe"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tecnolight.com.ar/" />
        <meta property="og:title" content="Tecnolight – Señalización Vial y Cartelería | Santa Fe" />
        <meta
          property="og:description"
          content="Más de 30 años de trayectoria en señalización vial y cartelería. Señales reglamentarias, preventivas e informativas de alta calidad para municipios y empresas."
        />
        <meta property="og:image" content="https://tecnolight.com.ar/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tecnolight – Señalización Vial | Santa Fe, Argentina" />
        <meta
          name="twitter:description"
          content="Más de 30 años de trayectoria en señalización vial y cartelería de alta calidad."
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Google Fonts – Inter + Outfit */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@300;400;600;700;800&display=swap"
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
              name: 'Tecnolight',
              description:
                'Empresa líder en señalización vial y cartelería con más de 30 años de trayectoria en Santa Fe, Argentina.',
              url: 'https://tecnolight.com.ar',
              telephone: '+54-342-000-0000',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Santa Fe',
                addressLocality: 'Santa Fe',
                addressRegion: 'Santa Fe',
                addressCountry: 'AR',
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
              sameAs: [
                'https://www.facebook.com/tecnolight',
                'https://www.instagram.com/tecnolight',
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
