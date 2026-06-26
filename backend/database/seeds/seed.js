const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de base de datos...');

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@tecnolight.com.ar' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@tecnolight.com.ar',
      password: hashedPassword,
      name: process.env.ADMIN_NAME || 'Administrador',
      role: 'admin'
    }
  });

  console.log('✅ Usuario admin creado:', admin.email);

  // Productos de ejemplo - Señales Reglamentarias
  const products = [
    {
      name: 'Señal Pare',
      slug: 'senal-pare',
      description: 'Señal reglamentaria de alto estándar fabricada en chapa de aluminio reflectivo. Cumple con normativas viales argentinas. Ideal para intersecciones y controles de tránsito.',
      category: 'Reglamentarias',
      images: ['/images/products/senal-pare.jpg'],
      price: 45000,
      specs: 'Material: Chapa de aluminio 0.8mm\nReflectivo: Grado engineering\nDimensiones: 60x60cm\nSoporte: Caño estructural 2"'
    },
    {
      name: 'Señal Velocidad Máxima 40',
      slug: 'senal-velocidad-maxima-40',
      description: 'Señal de velocidad máxima para zonas urbanas y rurales. Reflectivo de alta visibilidad para garantizar cumplimiento.',
      category: 'Reglamentarias',
      images: ['/images/products/senal-velocidad-40.jpg'],
      price: 38000,
      specs: 'Material: Chapa de aluminio\nReflectivo: Diamond grade\nDimensiones: 60x60cm\nNormativa: Ley 24.449'
    },
    {
      name: 'Señal Curva Peligrosa',
      slug: 'senal-curva-peligrosa',
      description: 'Señal preventiva para curvas cerradas y tramos peligrosos. Fabricada con materiales duraderos para exterior.',
      category: 'Preventivas',
      images: ['/images/products/senal-curva.jpg'],
      price: 42000,
      specs: 'Material: Chapa de aluminio\nReflectivo: Grado engineering\nDimensiones: 75x75cm\nIncluye: Kit de fijación'
    },
    {
      name: 'Señal Desvío',
      slug: 'senal-desvio',
      description: 'Señal informativa para desvíos y desvíos temporales. Ideal para obras viales y desvíos programados.',
      category: 'Informativas',
      images: ['/images/products/senal-desvio.jpg'],
      price: 35000,
      specs: 'Material: Chapa de aluminio\nReflectivo: Grado engineering\nDimensiones: 90x60cm\nPersonalizable'
    },
    {
      name: 'Cartel Inmobiliario Premium',
      slug: 'cartel-inmobiliario-premium',
      description: 'Cartel inmobiliario de alta gama con estructura metálica. Diseño profesional para maximizar visibilidad de propiedades.',
      category: 'Cartelería Comercial',
      images: ['/images/products/cartel-inmobiliario.jpg'],
      price: 180000,
      specs: 'Estructura: Caño estructural 3"\nPlaca: Aluminio composite\nDimensiones: 3x2m\nIncluye: Instalación'
    },
    {
      name: 'Señal Prohibido Estacionar',
      slug: 'senal-prohibido-estacionar',
      description: 'Señal reglamentaria para zonas de estacionamiento restringido. Fabricada con materiales de primera calidad.',
      category: 'Reglamentarias',
      images: ['/images/products/senal-no-estacionar.jpg'],
      price: 40000,
      specs: 'Material: Chapa de aluminio\nReflectivo: Diamond grade\nDimensiones: 60x60cm\nNormativa: Ley 24.449'
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product
    });
  }

  console.log(`✅ ${products.length} productos creados`);

  // Proyectos de ejemplo
  const projects = [
    {
      title: 'Señalización Municipal Santa Fe',
      slug: 'senalizacion-municipal-santa-fe',
      description: 'Proyecto integral de señalización vial para la ciudad de Santa Fe. Incluyó más de 500 señales de diferentes tipos: reglamentarias, preventivas e informativas. Trabajo realizado en conjunto con la Municipalidad de Santa Fe para mejorar la seguridad vial en zonas urbanas y rutas municipales.',
      client: 'Municipalidad de Santa Fe',
      location: 'Santa Fe, Argentina',
      images: [
        '/images/projects/santa-fe-1.jpg',
        '/images/projects/santa-fe-2.jpg',
        '/images/projects/santa-fe-3.jpg'
      ],
      testimonial: 'Excelente trabajo y cumplimiento en los plazos. La calidad de las señales superó nuestras expectativas. Muy recomendables para proyectos municipales.'
    },
    {
      title: 'Autopista Rosario - Córdoba',
      slug: 'autopista-rosario-cordoba',
      description: 'Señalización de tramo de autopista de 45km. Incluyó señales de velocidad máxima, curvas, desvíos y paneles informativos. Proyecto ejecutado para empresa constructora Vial.',
      client: 'Constructora Vial S.A.',
      location: 'Rosario - Córdoba, Argentina',
      images: [
        '/images/projects/autopista-1.jpg',
        '/images/projects/autopista-2.jpg'
      ],
      testimonial: 'Profesionalismo de primera. Cumplieron con todos los estándares de seguridad vial y los tiempos de entrega fueron impecables.'
    },
    {
      title: 'Cartelería Comercial Puerto',
      slug: 'carteleria-comercial-puerto',
      description: 'Diseño e instalación de cartelería comercial para zona portuaria. Incluyó carteles de gran formato, letras corpóreas y señalización interna para empresas del polo logístico.',
      client: 'Puerto de Santa Fe',
      location: 'Puerto de Santa Fe, Argentina',
      images: [
        '/images/projects/puerto-1.jpg',
        '/images/projects/puerto-2.jpg',
        '/images/projects/puerto-3.jpg'
      ],
      testimonial: 'El equipo de Tecnolight entendió perfectamente nuestras necesidades. El resultado final fue de excelente calidad y muy profesional.'
    },
    {
      title: 'Señalización Parque Industrial',
      slug: 'senalizacion-parque-industrial',
      description: 'Proyecto de señalización integral para Parque Industrial de Sauce Viejo. Incluyó señalización vial, carteles de bienvenida, señalética interna y nomencladores de calles.',
      client: 'Parque Industrial Sauce Viejo',
      location: 'Sauce Viejo, Santa Fe, Argentina',
      images: [
        '/images/projects/parque-1.jpg',
        '/images/projects/parque-2.jpg'
      ],
      testimonial: 'Trabajo muy completo y bien ejecutado. La señalización mejoró notablemente la seguridad y la imagen del parque.'
    }
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project
    });
  }

  console.log(`✅ ${projects.length} proyectos creados`);

  console.log('\n🎉 Seed completado exitosamente!');
  console.log('📧 Admin:', admin.email);
  console.log('🔑 Password:', process.env.ADMIN_PASSWORD || 'admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });