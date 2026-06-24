const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Configurar transporter de email
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️  Credenciales de email no configuradas. Los emails no se enviarán.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Enviar email de confirmación al cliente
const sendConfirmationEmail = async (contact) => {
  const transporter = createTransporter();
  if (!transporter) return;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: contact.email,
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

// Enviar alerta interna a Tecnolight
const sendInternalAlert = async (contact) => {
  const transporter = createTransporter();
  if (!transporter) return;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
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

// Crear contacto
const createContact = async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    // Validaciones
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Nombre, email y mensaje son requeridos.' 
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email inválido.' });
    }

    // Crear contacto en la base de datos
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

    // Enviar emails (no bloquean la respuesta)
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

// Obtener todos los contactos (admin)
const getAllContacts = async (req, res) => {
  try {
    const { read, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (read !== 'false') {
      where.read = read === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.contact.count({ where })
    ]);

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

// Marcar contacto como leído (admin)
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.update({
      where: { id },
      data: { read: true }
    });

    res.json({ message: 'Contacto marcado como leído.', contact });
  } catch (error) {
    console.error('Error al marcar como leído:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Contacto no encontrado.' });
    }
    res.status(500).json({ error: 'Error al actualizar contacto.' });
  }
};

// Eliminar contacto (admin)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contact.delete({
      where: { id }
    });

    res.json({ message: 'Contacto eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Contacto no encontrado.' });
    }
    res.status(500).json({ error: 'Error al eliminar contacto.' });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  markAsRead,
  deleteContact
};