import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/globals.css';
import Layout from '../components/Layout';

// ─── Google Analytics ───────────────────────────────────────
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag && GA_ID) {
    window.gtag('config', GA_ID, { page_path: url });
  }
};

// ─── Variantes de animación de transición entre páginas ─────
const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  enter:  { opacity: 1, y: 0 },
  exit:   { opacity: 0, y: -10 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.25,
};

// ─── App ─────────────────────────────────────────────────────
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Trackear navegación con Google Analytics
  useEffect(() => {
    if (!GA_ID) return;

    const handleRouteChange = (url) => pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Páginas del panel admin no usan el Layout público
  const isAdminPage = router.pathname.startsWith('/admin');

  return (
    <>
      {isAdminPage ? (
        // Admin pages: sin Layout público, sin animaciones de transición
        <Component {...pageProps} />
      ) : (
        <Layout>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.pathname}
              variants={pageVariants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={pageTransition}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      )}
    </>
  );
}

export default MyApp;
