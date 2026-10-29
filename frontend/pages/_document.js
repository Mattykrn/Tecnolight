import { Html, Head, Main, NextScript } from 'next/document';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function Document() {
  return (
    <Html lang="es" className="scroll-smooth">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Fabricación y provisión integral de señalización vial e industrial, indumentaria de trabajo y elementos de protección personal en Santa Fe."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="señalización vial santa fe, carteles viales obra, indumentaria epp, impresión retrorreflectiva Avery Dennison, señales reglamentarias, seguridad vial, demarcación horizontal, Tecno Light Santa Fe, cartelería de obra"
        />

        {/* Open Graph / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tecno Light S.R.L." />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:url" content="https://www.tecnolight.com.ar" />
        <meta property="og:title" content="Tecno Light S.R.L. | Señalización Vial, EPP y Servicios en Obra" />
        <meta
          property="og:description"
          content="Fabricación y provisión integral de señalización vial e industrial, indumentaria de trabajo y elementos de protección personal en Santa Fe."
        />
        <meta property="og:image" content="https://www.tecnolight.com.ar/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://www.tecnolight.com.ar/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Tecno Light S.R.L. | Señalización Vial, EPP y Servicios en Obra" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tecno Light S.R.L. | Señalización Vial, EPP y Servicios en Obra" />
        <meta
          name="twitter:description"
          content="Fabricación y provisión integral de señalización vial e industrial, indumentaria de trabajo y elementos de protección personal en Santa Fe."
        />
        <meta name="twitter:image" content="https://www.tecnolight.com.ar/og-image.jpg" />
        <meta name="twitter:image:alt" content="Tecno Light S.R.L. | Señalización Vial, EPP y Servicios en Obra" />

        {/* Icons & Manifest */}
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png?v=2" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/manifest.json?v=2" />
        <meta name="theme-color" content="#0b111e" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@700;800&family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        {/* Schema.org LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Tecno Light S.R.L.',
              image: 'https://www.tecnolight.com.ar/og-image.jpg',
              description: 'Provisión de señalización vial, industrial y equipamiento para obras.',
              url: 'https://www.tecnolight.com.ar',
              telephone: '+54-342-455-3582',
              email: 'tecnolightsrl@tecnolightsrl.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Suipacha 3248',
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
              areaServed: [
                {
                  '@type': 'AdministrativeArea',
                  name: 'Santa Fe',
                },
                {
                  '@type': 'Country',
                  name: 'Argentina',
                },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Servicios Principales',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Señalización reglamentaria',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Indumentaria de trabajo',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Alquiler de equipamiento vial',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Colocación de señalización y elementos viales',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Entrega de pedidos en obra',
                    },
                  },
                ],
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
                  opens: '08:00',
                  closes: '17:00',
                },
              ],
              priceRange: '$$',
              taxID: '30-69238932-4',
              sameAs: [
                'https://www.facebook.com/tecnolight',
                'https://www.instagram.com/tecnolight.srl',
              ],
            }),
          }}
        />

        {/* Google Analytics */}
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
