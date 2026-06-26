/**
 * ============================================
 * CONTROLADOR DE CONTACTO
 * ============================================
 * 
 * Maneja el formulario de contacto del sitio web y el sistema de notificaciones por email.
 * Es el puente entre los visitantes del sitio y el equipo de Tecnolight.
 * 
 * Funcionalidades:
 * - Recepción y validación de consultas del formulario público
 * - Almacenamiento en base de datos para seguimiento
 * - Envío automático de email de confirmación al cliente
 * - Alerta interna por email al equipo de Tecnolight
 * - Gestión de estado de lecturas (leído/pendiente)
 * 
 * Flujo de emails:
 * 1. Cliente envía formulario → Se guarda en DB
 * 2. Email automático al cliente confirmando recepción
 * 3. Email de alerta al equipo con datos del contacto
 * 
 * @module ContactController
 */

const nodemailer = require('nodemailer'); // Librería para envío de emails
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ============================================
// CONFIGURACIÓN DE EMAIL (NODEMAILER)
// ============================================

/**
 * Crea y configura el transporter de Nodemailer
 * Usa las credenciales del archivo .env (EMAIL_USER, EMAIL_PASS)
 * 
 * Configuración soportada:
 * - Gmail (smtp.gmail.com:587)
 * - Outlook (smtp.office365.com:587)
 * - Servidor SMTP personalizado
 * 
 * @returns {Object|null} Transporter configurado o null si faltan credenciales
 */
const createTransporter = () => {
  // Validar que existan credenciales de email
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️  Credenciales de email no configuradas. Los emails no se enviarán.');
    return null;
  }

  // Configurar transporter según proveedor SMTP
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,        // Servidor SMTP (ej: smtp.gmail.com)
    port: process.env.EMAIL_PORT,        // Puerto (587 para TLS, 465 para SSL)
    secure: process.env.EMAIL_SECURE === 'true', // true para puerto 465, false para 587
    auth: {
      user: process.env.EMAIL_USER,      // Email de la cuenta
      pass: process.env.EMAIL_PASS       // Contraseña de aplicación (no la contraseña normal)
    }
  });
};

// ============================================
// EMAILS AUTOMÁTICOS
// ============================================

/**
 * Enviar email de confirmación al cliente
 * 
 * Se ejecuta automáticamente después de que el cliente envía el formulario.
 * Le confirma que su mensaje fue recibido y será respondido a la brevedad.
 * 
 * @param {Object} contact - Datos del contacto desde la base de datos
 * @param {string} contact.name - Nombre del cliente
 * @param {string} contact.email - Email del cliente
 * @param {string} contact.message - Mensaje enviado
 * 
 * @returns {Promise<void>}
 */
const sendConfirmationEmail = async (contact) => {
  const transporter = createTransporter();
  if (!transporter) return;

  try {
    // Enviar email con template HTML
    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Remitente (ej: "Tecnolight <noreply@tecnolight.com.ar>")
      to: contact.email,            // Destinatario: el cliente que llenó el formulario
      subject: 'Gracias por contactarnos - Tecnolight',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f5b400;">¡Gracias por contactarnos!</h2>
          <p>Hola <strong>${contact.name}</strong>,</p>
          <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad.</p>
          <p><strong>Detalles de tu consulta:</strong></p>
          <ul>
            <li>Nombre: ${contact.name}</li>
            <li>Email: ${contact.email}</li>
            ${contact.phone ? `<li>Teléfono: ${contact.phone}</li>` : ''}
            ${contact.company ? `<li>Empresa: ${contact.company}</li>` : ''}
          </ul>
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #f5b400;">${contact.message}</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            <strong>Tecnolight</strong><br>
            Señalización Vial y Cartelería<br>
            Santa Fe, Argentina<br>
            Más de 30 años de trayectoria
          </p>
        </div>
      `
    });
    console.log('✅ Email de confirmación enviado a:', contact.email);
  } catch (error) {
    console.error('❌ Error al enviar email de confirmación:', error);
  }
};

/**
 * Enviar alerta interna al equipo de Tecnolight
 * 
 * Notifica al equipo por email cuando llega una nueva consulta.
 * Incluye todos los datos del cliente para facilitar el seguimiento.
 * 
 * @param {Object} contact - Datos del contacto desde la base de datos
 * @returns {Promise<void>}
 */
const sendInternalAlert = async (contact) => {
  const transporter = createTransporter();
  if (!transporter) return;

  try {
    // Enviar email de alerta al equipo
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Email del equipo (mismo que EMAIL_USER)
      subject: `Nuevo contacto desde la web - ${contact.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f5b400;">🔔 Nuevo Contacto Recibido</h2>
          <p><strong>Nombre:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          ${contact.phone ? `<p><strong>Teléfono:</strong> ${contact.phone}</p>` : ''}
          ${contact.company ? `<p><strong>Empresa:</strong> ${contact.company}</p>` : ''}
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #f5b400;">${contact.message}</p>
          <p style="color: #666; font-size: 14px;">
            <strong>Fecha:</strong> ${new Date(contact.createdAt).toLocaleString('es-AR')}
          </p>
        </div>
      `
    });
    console.log('✅ Alerta interna enviada a Tecnolight');
  } catch (error) {
    console.error('❌ Error al enviar alerta interna:', error);
  }
};

// ============================================
// ENDPOINTS
// ============================================

/**
 * Crear nuevo contacto desde el formulario público
 * 
 * Flujo:
 * 1. Validar datos recibidos (name, email, message requeridos)
 * 2. Guardar en base de datos
 * 3. Enviar email de confirmación al cliente (async, no bloquea)
 * 4. Enviar alerta interna al equipo (async, no bloquea)
 * 5. Responder al frontend inmediatamente
 * 
 * @route POST /api/contact
 * @access Public
 * 
 * @param {string} req.body.name - Nombre completo del cliente
 * @param {string} req.body.email - Email de contacto
 * @param {string} req.body.phone - Teléfono (opcional)
 * @param {string} req.body.company - Empresa/Municipio (opcional)
 * @param {string} req.body.message - Mensaje/consulta
 */
const createContact = async (req, res) => {
  try {
    // Extraer datos del body
    const { name, email, phone, company, message } = req.body;

    // Validaciones de campos requeridos
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Nombre, email y mensaje son requeridos.' 
      });
    }

    // Validación de formato de email con regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email inválido.' });
    }

    // Guardar contacto en base de datos
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        company,
        message
      }
    });

    console.log('✅ Nuevo contacto creado:', contact.id);

    // Enviar emails en segundo plano (no bloquean la respuesta)
    // El cliente recibe la respuesta inmediatamente sin esperar los emails
    sendConfirmationEmail(contact);
    sendInternalAlert(contact);

    res.status(201).json({
      message: 'Mensaje enviado exitosamente. Te contactaremos a la brevedad.',
      contact
    });
  } catch (error) {
    console.error('Error al crear contacto:', error);
    res.status(500).json({ error: 'Error al enviar mensaje. Intenta nuevamente.' });
  }
};

/**
 * Obtener todos los contactos (admin)
 * 
 * Query params:
 * - read (opcional): 'true'/'false' para filtrar por estado de lectura
 * - page (opcional): Número de página (default: 1)
 * - limit (opcional): Cantidad por página (default: 10)
 * 
 * @route GET /api/contact
 * @access Private (Admin)
 */
const getAllContacts = async (req, res) => {
  try {
    // Extraer parámetros de paginación y filtros
    const { read, page = 1, limit = 10 } = req.query;
    
    // Construir filtro de búsqueda
    const where = {};
    if (read !== 'false') {
      where.read = read === 'true'; // Filtrar por estado de lectura
    }

    // Calcular offset para paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Ejecutar consultas en paralelo (lista + total)
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' }, // Más recientes primero
        skip,
        take: parseInt(limit)
      }),
      prisma.contact.count({ where }) // Contar total para paginación
    ]);

    // Retornar datos con metadata de paginación
    res.json({
      contacts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ error: 'Error al obtener contactos.' });
  }
};

/**
 * Marcar contacto como leído
 * 
 * Cambia el estado del contacto de "pendiente" a "leído"
 * El dashboard usa esto para marcar consultas como atendidas
 * 
 * @route PUT /api/contact/:id/read
 * @access Private (Admin)
 * @param {string} req.params.id - ID único del contacto
 */
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    // Actualizar campo read a true
    const contact = await prisma.contact.update({
      where: { id },
      data: { read: true }
    });

    res.json({ message: 'Contacto marcado como leído.', contact });
  } catch (error) {
    console.error('Error al marcar como leído:', error);
    // Contacto no existe
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Contacto no encontrado.' });
    }
    res.status(500).json({ error: 'Error al actualizar contacto.' });
  }
};

/**
 * Eliminar contacto permanentemente
 * 
 * @route DELETE /api/contact/:id
 * @access Private (Admin)
 * @param {string} req.params.id - ID único del contacto a eliminar
 */
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminación permanente de la base de datos
    await prisma.contact.delete({
      where: { id }
    });

    res.json({ message: 'Contacto eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    // Contacto no existe
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Contacto no encontrado.' });
    }
    res.status(500).json({ error: 'Error al eliminar contacto.' });
  }
};

// ============================================
// EXPORTACIÓN DE MÉTODOS
// ============================================
module.exports = {
  createContact,    // POST /api/contact - Crear contacto (público)
  getAllContacts,   // GET /api/contact - Listar contactos (admin)
  markAsRead,       // PUT /api/contact/:id/read - Marcar leído (admin)
  deleteContact     // DELETE /api/contact/:id - Eliminar (admin)
};
