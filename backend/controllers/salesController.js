const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.dashboard = async (req, res) => {
  try {
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstOfYear = new Date(now.getFullYear(), 0, 1);

    const [
      totalClients,
      totalQuotes,
      totalOrders,
      monthlyOrders,
      monthlyRevenue,
      yearlyRevenue,
      quotesByStatus,
      ordersByStatus,
      recentOrders,
      recentQuotes
    ] = await Promise.all([
      prisma.client.count(),
      prisma.quote.count(),
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: firstOfMonth } } }),
      prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELLED' }, createdAt: { gte: firstOfMonth } } }),
      prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELLED' }, createdAt: { gte: firstOfYear } } }),
      prisma.quote.groupBy({ by: ['status'], _count: true }),
      prisma.order.groupBy({ by: ['status'], _count: true }),
      prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { client: { select: { name: true } } } }),
      prisma.quote.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { client: { select: { name: true } } } })
    ]);

    res.json({
      metrics: {
        totalClients,
        totalQuotes,
        totalOrders,
        monthlyOrders,
        monthlyRevenue: monthlyRevenue._sum.total || 0,
        yearlyRevenue: yearlyRevenue._sum.total || 0
      },
      quotesByStatus,
      ordersByStatus,
      recentOrders,
      recentQuotes
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener métricas del dashboard' });
  }
};

exports.revenue = async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;
    const startDate = new Date(parseInt(year), 0, 1);
    const endDate = new Date(parseInt(year) + 1, 0, 1);

    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: startDate, lt: endDate }, status: { not: 'CANCELLED' } },
      select: { total: true, createdAt: true }
    });

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      revenue: 0,
      orders: 0
    }));

    orders.forEach(order => {
      const month = new Date(order.createdAt).getMonth();
      monthlyData[month].revenue += order.total;
      monthlyData[month].orders += 1;
    });

    res.json({ year: parseInt(year), data: monthlyData });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de ingresos' });
  }
};

exports.topProducts = async (req, res) => {
  try {
    const orderItems = await prisma.orderItem.groupBy({
      by: ['description'],
      _sum: { quantity: true, total: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 10
    });

    res.json(orderItems.map(item => ({
      description: item.description,
      quantity: item._sum.quantity || 0,
      total: item._sum.total || 0
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener top productos' });
  }
};
