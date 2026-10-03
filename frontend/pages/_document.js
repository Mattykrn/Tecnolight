import { Html, Head, Main, NextScript } from 'next/document';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function Document() {
  return (
    <Html lang="es" className="scroll-smooth">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Empresa líder en fabricación integral de señales viales, cartelería de gran porte, protección personal y tecnología de impresión Avery Dennison TrafficJet™ Xpress bajo normativas DNV y DPV."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="señalización vial Santa Fe, carteles Tecno Light, señales reglamentarias Argentina, cartelería comercial, seguridad vial, señales preventivas, Tecno Light Santa Fe, TrafficJet Xpress, Avery Dennison"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tecno Light S.R.L." />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:url" content="https://tecno-light-v3-irux.vercel.app" />
        <meta property="og:title" content="TECNO LIGHT S.R.L. | Señalización Vial e Industrial" />
        <meta
          property="og:description"
          content="Fabricación integral de señales viales reglamentarias, cartelería de obra y seguridad industrial. Tecnología TrafficJet™ Xpress con láminas microprismáticas homologadas."
        />
        <meta property="og:image" content="https://tecno-light-v3-irux.vercel.app/images/og-share.jpg" />
        <meta property="og:image:secure_url" content="https://tecno-light-v3-irux.vercel.app/images/og-share.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TECNO LIGHT S.R.L. - Señalización Vial" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TECNO LIGHT S.R.L. | Señalización Vial e Industrial" />
        <meta
          name="twitter:description"
          content="Fabricación integral de señales viales reglamentarias, cartelería de obra y seguridad industrial. Tecnología TrafficJet™ Xpress con láminas microprismáticas homologadas."
        />
        <meta name="twitter:image" content="https://tecno-light-v3-irux.vercel.app/images/og-share.jpg" />
        <meta name="twitter:image:alt" content="TECNO LIGHT S.R.L. - Señalización Vial" />

        {/* Icons & Manifest */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
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
              name: 'Tecno Light',
              description:
                'Empresa líder en señalización vial y cartelería con más de 30 años de trayectoria en Santa Fe, Argentina.',
              url: 'https://tecno-light-v3-irux.vercel.app',
              telephone: '+54-342-455-3582',
              email: 'ventas@tecnolight.com.ar',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Suipacha 3243',
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
