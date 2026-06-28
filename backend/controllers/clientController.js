const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.list = async (req, res) => {
  try {
    const { search, page = 1, limit = 50 } = req.query;
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { company: { contains: search, mode: 'insensitive' } }
      ];
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { quotes: true, orders: true } } }
      }),
      prisma.client.count({ where })
    ]);
    res.json({ clients, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ error: 'Error al listar clientes' });
  }
};

exports.getById = async (req, res) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: req.params.id },
      include: {
        quotes: { orderBy: { createdAt: 'desc' }, take: 10 },
        orders: { orderBy: { createdAt: 'desc' }, take: 10 }
      }
    });
    if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, phone, company, address, city, province, notes } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Nombre y email son requeridos' });
    const existing = await prisma.client.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Ya existe un cliente con ese email' });
    const client = await prisma.client.create({
      data: { name, email, phone, company, address, city, province, notes }
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, email, phone, company, address, city, province, notes } = req.body;
    if (email) {
      const existing = await prisma.client.findFirst({
        where: { email, NOT: { id: req.params.id } }
      });
      if (existing) return res.status(400).json({ error: 'Email ya en uso por otro cliente' });
    }
    const client = await prisma.client.update({
      where: { id: req.params.id },
      data: { name, email, phone, company, address, city, province, notes }
    });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

exports.remove = async (req, res) => {
  try {
    await prisma.client.delete({ where: { id: req.params.id } });
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
