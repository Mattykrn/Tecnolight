const { PrismaClient } = require('@prisma/client');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

exports.list = async (req, res) => {
  try {
    const { status, clientId, page = 1, limit = 50 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [quotes, total] = await Promise.all([
      prisma.quote.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: { client: { select: { id: true, name: true, email: true, phone: true } }, _count: { select: { items: true } } }
      }),
      prisma.quote.count({ where })
    ]);
    res.json({ quotes, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al listar cotizaciones' });
  }
};

exports.getById = async (req, res) => {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: req.params.id },
      include: { client: true, items: true }
    });
    if (!quote) return res.status(404).json({ error: 'Cotización no encontrada' });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cotización' });
  }
};

exports.create = async (req, res) => {
  try {
    const { clientId, items, notes, validUntil, createdBy } = req.body;
    if (!clientId || !items || !items.length) {
      return res.status(400).json({ error: 'Cliente y al menos un item son requeridos' });
    }
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const tax = subtotal * 0.21;
    const total = subtotal + tax;
    const quote = await prisma.quote.create({
      data: {
        clientId,
        notes,
        validUntil: validUntil ? new Date(validUntil) : null,
        createdBy,
        subtotal,
        tax,
        total,
        items: {
          create: items.map(item => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.quantity * item.unitPrice
          }))
        }
      },
      include: { client: true, items: true }
    });
    res.status(201).json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear cotización' });
  }
};

exports.update = async (req, res) => {
  try {
    const { items, notes, validUntil, status } = req.body;
    const data = {};
    if (notes !== undefined) data.notes = notes;
    if (validUntil !== undefined) data.validUntil = new Date(validUntil);
    if (status) data.status = status;

    if (items) {
      const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      const tax = subtotal * 0.21;
      data.subtotal = subtotal;
      data.tax = tax;
      data.total = subtotal + tax;

      await prisma.quoteItem.deleteMany({ where: { quoteId: req.params.id } });
      await prisma.quoteItem.createMany({
        data: items.map(item => ({
          quoteId: req.params.id,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice
        }))
      });
    }

    const quote = await prisma.quote.update({
      where: { id: req.params.id },
      data,
      include: { client: true, items: true }
    });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cotización' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['DRAFT', 'SENT', 'APPROVED', 'REJECTED', 'EXPIRED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }
    const quote = await prisma.quote.update({
      where: { id: req.params.id },
      data: { status },
      include: { client: true, items: true }
    });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};

exports.remove = async (req, res) => {
  try {
    await prisma.quote.delete({ where: { id: req.params.id } });
    res.json({ message: 'Cotización eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cotización' });
  }
};

exports.generatePdf = async (req, res) => {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: req.params.id },
      include: { client: true, items: true }
    });
    if (!quote) return res.status(404).json({ error: 'Cotización no encontrada' });

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const pdfDir = path.join(__dirname, '..', 'uploads', 'pdfs');
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
    const filename = `cotizacion-${String(quote.number).padStart(5, '0')}.pdf`;
    const filePath = path.join(pdfDir, filename);
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const primary = '#FF5A1F';
    const gray = '#6B7280';

    doc.rect(0, 0, doc.page.width, 120).fill(primary);
    doc.fill('#FFFFFF').fontSize(28).font('Helvetica-Bold').text('TECNOLIGHT', 50, 35);
    doc.fontSize(10).font('Helvetica').text('Señalización Vial · Santa Fe, Argentina', 50, 70);
    doc.text('www.tecnolight.com.ar', 50, 85);

    doc.fill('#FFFFFF').fontSize(14).font('Helvetica-Bold').text(`COTIZACIÓN N° ${String(quote.number).padStart(5, '0')}`, 350, 45, { align: 'right' });
    doc.fontSize(10).font('Helvetica').text(`Estado: ${getStatusText(quote.status)}`, { align: 'right' });
    doc.text(`Fecha: ${new Date(quote.createdAt).toLocaleDateString('es-AR')}`, { align: 'right' });
    if (quote.validUntil) {
      doc.text(`Válida hasta: ${new Date(quote.validUntil).toLocaleDateString('es-AR')}`, { align: 'right' });
    }

    doc.fill('#1F2937').fontSize(12).font('Helvetica-Bold').text('Cliente', 50, 145);
    doc.fill(gray).fontSize(10).font('Helvetica');
    doc.text(`Nombre: ${quote.client.name}`, 50, 162);
    doc.text(`Email: ${quote.client.email}`, 50, 177);
    if (quote.client.phone) doc.text(`Teléfono: ${quote.client.phone}`, 50, 192);
    if (quote.client.company) doc.text(`Empresa: ${quote.client.company}`, 50, 207);

    doc.fill('#1F2937').fontSize(12).font('Helvetica-Bold').text('Detalle de la Cotización', 50, 250);

    const tableTop = 270;
    doc.rect(50, tableTop, 495, 20).fill('#F3F4F6');
    doc.fill('#1F2937').fontSize(9).font('Helvetica-Bold');
    doc.text('#', 55, tableTop + 5, { width: 25 });
    doc.text('Descripción', 80, tableTop + 5, { width: 220 });
    doc.text('Cant.', 310, tableTop + 5, { width: 50, align: 'center' });
    doc.text('P. Unitario', 365, tableTop + 5, { width: 85, align: 'right' });
    doc.text('Subtotal', 455, tableTop + 5, { width: 85, align: 'right' });

    let yPos = tableTop + 25;
    quote.items.forEach((item, i) => {
      if (yPos > 700) { doc.addPage(); yPos = 50; }
      if (i % 2 === 0) doc.rect(50, yPos - 4, 495, 20).fill('#F9FAFB');
      doc.fill('#1F2937').fontSize(9).font('Helvetica');
      doc.text(String(i + 1), 55, yPos, { width: 25 });
      doc.text(item.description, 80, yPos, { width: 220 });
      doc.text(String(item.quantity), 310, yPos, { width: 50, align: 'center' });
      doc.text(`$${item.unitPrice.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, 365, yPos, { width: 85, align: 'right' });
      doc.text(`$${item.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, 455, yPos, { width: 85, align: 'right' });
      yPos += 20;
    });

    yPos += 15;
    doc.rect(350, yPos, 195, 75).fill('#F3F4F6');
    doc.fill('#1F2937').fontSize(10);
    doc.font('Helvetica').text('Subtotal:', 360, yPos + 10, { width: 85, align: 'left' });
    doc.font('Helvetica-Bold').text(`$${quote.subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, 450, yPos + 10, { width: 85, align: 'right' });
    doc.font('Helvetica').text('IVA (21%):', 360, yPos + 30, { width: 85, align: 'left' });
    doc.font('Helvetica-Bold').text(`$${quote.tax.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, 450, yPos + 30, { width: 85, align: 'right' });
    doc.font('Helvetica-Bold').fontSize(12).fill(primary).text('TOTAL:', 360, yPos + 55, { width: 85, align: 'left' });
    doc.text(`$${quote.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, 450, yPos + 55, { width: 85, align: 'right' });

    if (quote.notes) {
      doc.fill('#1F2937').fontSize(10).font('Helvetica-Bold').text('Notas:', 50, yPos + 100);
      doc.fill(gray).fontSize(9).font('Helvetica').text(quote.notes, 50, yPos + 118, { width: 495 });
    }

    doc.fill(gray).fontSize(8).font('Helvetica').text(
      'Tecnolight SRL · Salvador Caputto 3243, Santa Fe, Argentina · Tel: +54 342 456-7890',
      50, doc.page.height - 50, { align: 'center' }
    );

    doc.end();

    stream.on('finish', async () => {
      const pdfUrl = `/uploads/pdfs/${filename}`;
      await prisma.quote.update({
        where: { id: req.params.id },
        data: { pdfUrl }
      });
      res.json({ pdfUrl, filename });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar PDF' });
  }
};

function getStatusText(status) {
  const map = { DRAFT: 'Borrador', SENT: 'Enviada', APPROVED: 'Aprobada', REJECTED: 'Rechazada', EXPIRED: 'Vencida' };
  return map[status] || status;
}
