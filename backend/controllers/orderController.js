const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.list = async (req, res) => {
  try {
    const { status, clientId, page = 1, limit = 50 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: { client: { select: { id: true, name: true, email: true, phone: true } }, _count: { select: { items: true } } }
      }),
      prisma.order.count({ where })
    ]);
    res.json({ orders, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ error: 'Error al listar pedidos' });
  }
};

exports.getById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { client: true, items: true }
    });
    if (!order) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedido' });
  }
};

exports.create = async (req, res) => {
  try {
    const { clientId, items, notes, quoteId, deliveryDate, createdBy } = req.body;
    if (!clientId || !items || !items.length) {
      return res.status(400).json({ error: 'Cliente y al menos un item son requeridos' });
    }
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const tax = subtotal * 0.21;
    const total = subtotal + tax;
    const order = await prisma.order.create({
      data: {
        clientId,
        notes,
        quoteId,
        createdBy,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
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
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear pedido' });
  }
};

exports.update = async (req, res) => {
  try {
    const { items, notes, deliveryDate, status } = req.body;
    const data = {};
    if (notes !== undefined) data.notes = notes;
    if (deliveryDate !== undefined) data.deliveryDate = new Date(deliveryDate);
    if (status) data.status = status;

    if (items) {
      const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      const tax = subtotal * 0.21;
      data.subtotal = subtotal;
      data.tax = tax;
      data.total = subtotal + tax;

      await prisma.orderItem.deleteMany({ where: { orderId: req.params.id } });
      await prisma.orderItem.createMany({
        data: items.map(item => ({
          orderId: req.params.id,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice
        }))
      });
    }

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data,
      include: { client: true, items: true }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pedido' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['PENDING', 'CONFIRMED', 'IN_PRODUCTION', 'READY', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
      include: { client: true, items: true }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};

exports.createQuick = async (req, res) => {
  try {
    const { items, notes, total } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ error: 'Se requiere al menos un item.' });
    }

    // Buscar o crear cliente genérico "Web"
    let client = await prisma.client.findUnique({ where: { email: 'web@tecnolight.com.ar' } });
    if (!client) {
      client = await prisma.client.create({
        data: {
          name: 'Cliente Web',
          email: 'web@tecnolight.com.ar',
          phone: '',
          company: 'Web',
          city: '',
          province: ''
        }
      });
    }

    const subtotal = items.reduce((s, item) => s + (item.unitPrice || 0) * (item.quantity || 1), 0);
    const tax = Math.round(subtotal * 0.21 * 100) / 100;
    const orderTotal = total || subtotal + tax;

    const order = await prisma.order.create({
      data: {
        clientId: client.id,
        notes: notes || 'Pedido desde carrito web',
        subtotal,
        tax,
        total: orderTotal,
        createdBy: 'web',
        items: {
          create: items.map(item => ({
            description: item.description || 'Producto',
            quantity: item.quantity || 1,
            unitPrice: item.unitPrice || 0,
            total: (item.unitPrice || 0) * (item.quantity || 1)
          }))
        }
      },
      include: { items: true }
    });

    res.status(201).json({ message: 'Pedido confirmado.', order });
  } catch (error) {
    console.error('Error al crear pedido rápido:', error);
    res.status(500).json({ error: 'Error al confirmar pedido.' });
  }
};

exports.remove = async (req, res) => {
  try {
    await prisma.order.delete({ where: { id: req.params.id } });
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pedido' });
  }
};
