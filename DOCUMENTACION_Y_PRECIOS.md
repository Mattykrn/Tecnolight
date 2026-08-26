# Documentacion Tecno Light — Sitio Web

## Descripcion del Sitio

Sitio web institucional para **Tecno Light SRL**, empresa santafesina de senializacion vial con mas de 30 anos de trayectoria. El sitio presenta la empresa, sus tres rubros (Seguridad Vial, Carteleria, Seguridad del Trabajador), proyectos realizados, galeria de Instagram integrada y canales de contacto via WhatsApp.

### Paginas

| Pagina  | Ruta          | Contenido                                                    |
|---------|---------------|--------------------------------------------------------------|
| Inicio  | `/`           | Hero, trayectoria, 3 rubros, proceso, proyectos, galeria, CTA |
| Nosotros| `/about`      | Historia, estadisticas, linea de tiempo, valores, certificaciones |
| Proyectos| `/projects`  | Grilla de proyectos con fallback, testimonios                |
| Contacto| `/contact`    | WhatsApp, direccion, mapas embed, datos fiscales             |
| Galeria | `/instagram`  | Feed de Instagram con filtro por categorias y modal          |

### Funcionalidades Clave

- **Header fijo** con efecto blur al scrollear, menu mobile animado
- **Hero con parallax** y senales SVG flotantes que siguen el mouse
- **WhatsApp FAB** (boton flotante) en todas las paginas
- **Galerias** con imagenes obtenidas via API de Instagram
- **Proyectos** con datos de respaldo (fallback) si la API no responde
- **SEO completo**: Open Graph, Twitter Cards, Schema.org LocalBusiness, sitemap XML
- **Google Analytics** configurado (carga condicional segun variable de entorno)

---

## Stack Tecnologico

| Componente     | Tecnologia                         |
|----------------|------------------------------------|
| Framework      | Next.js 14 (React)                |
| Lenguaje       | JavaScript (JSX)                  |
| Estilos        | Tailwind CSS + CSS personalizado  |
| Animaciones    | Framer Motion                     |
| Iconos         | Lucide React                      |
| Fuente         | Google Fonts — Outfit             |
| Despliegue     | Vercel (recomendado)              |
| Backend / API  | Node.js + Express (puerto 5000)   |
| Dominio        | tecnolight.com.ar                 |

---

## Precios

### 1. Venta del Sitio Web

| Concepto                        | Precio         |
|---------------------------------|----------------|
| Diseno y desarrollo completo    | $1.600.000 ARS |
| Maquetacion responsive          | incluido       |
| Optimizacion SEO                | incluido       |
| Integracion WhatsApp            | incluido       |
| Galeria Instagram dinamica      | incluido       |
| Sitemap XML + Schema.org        | incluido       |
| Capacitacion basica             | incluida       |
| **Total unico**                 | **$1.600.000 ARS** |

### 2. Mantenimiento Mensual

| Concepto                                  | Precio mensual  |
|-------------------------------------------|-----------------|
| Hosting Vercel (plan Pro)                | $25 USD aprox   |
| Dominio .com.ar (anual / 12)             | $3 USD aprox    |
| Backend API (servidor Node.js)           | $15 USD aprox   |
| Actualizacion de contenido (textos, imagenes) | $50 USD aprox |
| Soporte tecnico y monitoreo              | $35 USD aprox   |
| Backup semanal + SSL                     | incluido        |
| **Total mensual estimado**               | **$128 USD / $45.000 ARS** |

> Los precios en ARS se ajustan segun inflacion. Los precios en USD se facturan al tipo de cambio oficial + impuestos vigentes.

### 3. Servicios Adicionales

| Concepto                         | Precio          |
|----------------------------------|-----------------|
| Panel administrador de proyectos | $350.000 ARS    |
| Landing page extra               | $280.000 ARS    |
| Seccion nueva en el sitio        | $200.000 ARS    |
| Optimizacion de performance      | $120.000 ARS    |
| Reportes de trafico mensual      | $45.000 ARS     |

---

## Hosting y Dominio

- **Hosting**: Vercel (plan Hobby, suficiente para el sitio actual)
- **Dominio**: `tecnolight.com.ar` registrado en NIC Argentina. La renovacion es anual.
- **Base de datos**: No requiere (los datos de proyectos/productos se cargan via API propia o fallback estatico)
- **API backend**: Servidor Node.js en el mismo hosting o VPS separado (actualmente en `localhost:5000` para desarrollo)

## Variables de Entorno Requeridas

| Variable                         | Ejemplo                                        |
|----------------------------------|-------------------------------------------------|
| `NEXT_PUBLIC_API_URL`           | `http://localhost:5000`                         |
| `NEXT_PUBLIC_SITE_URL`          | `https://tecnolight.com.ar`                     |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | `G-XXXXXXXXXX`                               |

---

*Documento generado el 09/07/2026*
