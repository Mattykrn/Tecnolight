import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  LayoutDashboard, Users, FileText, ShoppingCart, Mail, Package,
  Compass, Shield, LogOut, Plus, Edit, Trash2, X, Eye, Check, Phone,
  MapPin, User, Download, Search, Calendar, DollarSign, TrendingUp,
  Activity, AlertCircle, ArrowUpRight, Clock,
  Filter, FileDown, CreditCard
} from 'lucide-react';
import { useToast } from '../../components/Toast';

const API = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const authHeaders = () => ({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });

function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 flex gap-8">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-3 bg-gray-200 rounded-full animate-pulse flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="border-t border-gray-100 px-4 py-3.5 flex gap-8">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-3 bg-gray-100 rounded-full animate-pulse flex-1" style={{ animationDelay: `${r * 0.1}s` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

const STATUS_COLORS = {
  DRAFT: 'bg-gray-100 text-gray-600', SENT: 'bg-blue-100 text-blue-700',
  APPROVED: 'bg-green-100 text-green-700', REJECTED: 'bg-red-100 text-red-700',
  EXPIRED: 'bg-yellow-100 text-yellow-700', PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700', IN_PRODUCTION: 'bg-purple-100 text-purple-700',
  READY: 'bg-green-100 text-green-700', DELIVERED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-700'
};
const STATUS_TEXT = {
  DRAFT: 'Borrador', SENT: 'Enviada', APPROVED: 'Aprobada', REJECTED: 'Rechazada',
  EXPIRED: 'Vencida', PENDING: 'Pendiente', CONFIRMED: 'Confirmado',
  IN_PRODUCTION: 'En Producción', READY: 'Listo', DELIVERED: 'Entregado', CANCELLED: 'Cancelado'
};

function StatCard({ icon: Icon, label, value, sub, color, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
      className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-300 cursor-default">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </motion.div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-600'}`}>
      {STATUS_TEXT[status] || status}
    </span>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [dashboardData, setDashboardData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [topProducts, setTopProducts] = useState([]);

  const [contacts, setContacts] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientsSearch, setClientsSearch] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [quotesFilter, setQuotesFilter] = useState('');
  const [orders, setOrders] = useState([]);
  const [ordersFilter, setOrdersFilter] = useState('');

  const [contactViewModal, setContactViewModal] = useState({ open: false, data: null });
  const [productModal, setProductModal] = useState({ open: false, mode: 'create', data: null });
  const [projectModal, setProjectModal] = useState({ open: false, mode: 'create', data: null });
  const [clientModal, setClientModal] = useState({ open: false, mode: 'create', data: null });
  const [quoteModal, setQuoteModal] = useState({ open: false, mode: 'create', data: null });
  const [orderModal, setOrderModal] = useState({ open: false, mode: 'create', data: null });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorSetup, setTwoFactorSetup] = useState({ qrCode: '', secret: '' });
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorPassword, setTwoFactorPassword] = useState('');

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) { router.push('/admin/login'); return; }
    setUser(JSON.parse(userData));
    fetchAll(token);
  }, [router]);

  const fetchAll = async (token) => {
    setLoading(true);
    const h = { 'Authorization': `Bearer ${token}` };
    try {
      const [dRes, rRes, tRes, cRes, pRes, pjRes, clRes, qRes, oRes, _2faRes] = await Promise.all([
        fetch(`${API()}/api/sales/dashboard`, { headers: h }),
        fetch(`${API()}/api/sales/revenue`, { headers: h }),
        fetch(`${API()}/api/sales/top-products`, { headers: h }),
        fetch(`${API()}/api/contact?read=all`, { headers: h }),
        fetch(`${API()}/api/products?active=false`),
        fetch(`${API()}/api/projects?active=false`),
        fetch(`${API()}/api/clients`, { headers: h }),
        fetch(`${API()}/api/quotes`, { headers: h }),
        fetch(`${API()}/api/orders`, { headers: h }),
        fetch(`${API()}/api/auth/2fa-status`, { headers: h })
      ]);
      if (cRes.status === 401) { handleLogout(); return; }
      const parse = (r) => r.json().catch(() => ({}));
      const [d, r, t, c, p, pj, cl, q, o, f] = await Promise.all([
        parse(dRes), parse(rRes), parse(tRes), parse(cRes), parse(p), parse(pj), parse(cl), parse(q), parse(o), parse(_2faRes)
      ]);
      setDashboardData(d); setRevenueData(r); setTopProducts(t || []);
      setContacts(c.contacts || []); setProducts(p.products || []);
      setProjects(pj.projects || []); setClients(cl.clients || []);
      setQuotes(q.quotes || []); setOrders(o.orders || []);
      if (f.enabled !== undefined) setTwoFactorEnabled(f.enabled);
    } catch (err) { setError('Error al cargar datos del servidor'); }
    finally { setLoading(false); }
  };

  const handleMarkContactRead = async (id) => {
    const res = await fetch(`${API()}/api/contact/${id}/read`, { method: 'PUT', headers: getHeaders() });
    if (res.ok) {
      setContacts(prev => prev.map(c => c.id === id ? { ...c, read: true } : c));
      if (contactViewModal.open && contactViewModal.data?.id === id)
        setContactViewModal(prev => ({ ...prev, data: { ...prev.data, read: true } }));
    }
  };

  const handleDeleteContact = async (id) => {
    if (!confirm('¿Eliminar este contacto?')) return;
    toast('Eliminando contacto...', 'info');
    const res = await fetch(`${API()}/api/contact/${id}`, { method: 'DELETE', headers: getHeaders() });
    if (res.ok) { setContacts(prev => prev.filter(c => c.id !== id)); setContactViewModal({ open: false, data: null }); }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault(); const fd = new FormData(e.target);
    const payload = { name: fd.get('name'), slug: fd.get('slug'), description: fd.get('description'), category: fd.get('category'), price: parseFloat(fd.get('price')) || null, stock: parseInt(fd.get('stock')) || 0, specs: fd.get('specs'), active: fd.get('active') === 'true' };
    const method = productModal.mode === 'create' ? 'POST' : 'PUT';
    const url = productModal.mode === 'create' ? `${API()}/api/products` : `${API()}/api/products/${productModal.data.id}`;

    const imageFile = fd.get('productImage');
    if (imageFile && imageFile.size > 0) {
      const weekNum = getWeekNumber(new Date());
      const imgFd = new FormData();
      imgFd.append('image', imageFile);
      try {
        const uploadRes = await fetch(`${API()}/api/upload/stock?folder=semana-${weekNum}`, { method: 'POST', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: imgFd });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok && uploadData.url) {
          payload.images = [uploadData.url];
        }
      } catch (err) { console.warn('Upload failed, saving without image:', err.message); }
    }

    try {
      const res = await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setProductModal({ open: false, mode: 'create', data: null });
      toast('Producto guardado correctamente', 'success');
      fetchAll(localStorage.getItem('token'));
    } catch (err) { toast(err.message, 'error'); }
  };

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    const res = await fetch(`${API()}/api/products/${id}`, { method: 'DELETE', headers: getHeaders() });
    if (res.ok) setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault(); const fd = new FormData(e.target);
    const payload = { title: fd.get('title'), slug: fd.get('slug'), description: fd.get('description'), client: fd.get('client'), location: fd.get('location'), testimonial: fd.get('testimonial'), active: fd.get('active') === 'true', images: [] };
    const method = projectModal.mode === 'create' ? 'POST' : 'PUT';
    const url = projectModal.mode === 'create' ? `${API()}/api/projects` : `${API()}/api/projects/${projectModal.data.id}`;
    try {
      const res = await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setProjectModal({ open: false, mode: 'create', data: null });
      toast('Proyecto guardado correctamente', 'success');
      fetchAll(localStorage.getItem('token'));
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('¿Eliminar este proyecto?')) return;
    const res = await fetch(`${API()}/api/projects/${id}`, { method: 'DELETE', headers: getHeaders() });
    if (res.ok) setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault(); const fd = new FormData(e.target);
    const payload = { name: fd.get('name'), email: fd.get('email'), phone: fd.get('phone'), company: fd.get('company'), address: fd.get('address'), city: fd.get('city'), province: fd.get('province'), notes: fd.get('notes') };
    const method = clientModal.mode === 'create' ? 'POST' : 'PUT';
    const url = clientModal.mode === 'create' ? `${API()}/api/clients` : `${API()}/api/clients/${clientModal.data.id}`;
    try {
      const res = await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setClientModal({ open: false, mode: 'create', data: null });
      toast('Cliente guardado correctamente', 'success');
      fetchAll(localStorage.getItem('token'));
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleDeleteClient = async (id) => {
    if (!confirm('¿Eliminar este cliente?')) return;
    const res = await fetch(`${API()}/api/clients/${id}`, { method: 'DELETE', headers: getHeaders() });
    if (res.ok) setClients(prev => prev.filter(c => c.id !== id));
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault(); const fd = new FormData(e.target);
    const itemsStr = fd.get('items');
    let items;
    try { items = JSON.parse(itemsStr); } catch { items = [{ description: fd.get('item_desc') || 'Producto', quantity: parseInt(fd.get('item_qty')) || 1, unitPrice: parseFloat(fd.get('item_price')) || 0 }]; }
    const payload = { clientId: fd.get('clientId'), items, notes: fd.get('notes'), validUntil: fd.get('validUntil') || null, createdBy: user?.name || 'admin' };
    const method = quoteModal.mode === 'create' ? 'POST' : 'PUT';
    const url = quoteModal.mode === 'create' ? `${API()}/api/quotes` : `${API()}/api/quotes/${quoteModal.data.id}`;
    try {
      const res = await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setQuoteModal({ open: false, mode: 'create', data: null });
      toast(quoteModal.mode === 'create' ? 'Cotización creada' : 'Cotización actualizada', 'success');
      fetchAll(localStorage.getItem('token'));
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleQuoteStatus = async (id, status) => {
    const res = await fetch(`${API()}/api/quotes/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ status }) });
    if (res.ok) fetchAll(localStorage.getItem('token'));
  };

  const handleQuotePdf = async (id) => {
    const res = await fetch(`${API()}/api/quotes/${id}/pdf`, { headers: getHeaders() });
    const data = await res.json();
    if (data.pdfUrl) { window.open(`${API()}${data.pdfUrl}`, '_blank'); toast('PDF generado', 'success'); }
    else toast('Error al generar PDF', 'error');
  };

  const handleDeleteQuote = async (id) => {
    if (!confirm('¿Eliminar esta cotización?')) return;
    await fetch(`${API()}/api/quotes/${id}`, { method: 'DELETE', headers: getHeaders() });
    fetchAll(localStorage.getItem('token'));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault(); const fd = new FormData(e.target);
    const itemsStr = fd.get('items');
    let items;
    try { items = JSON.parse(itemsStr); } catch { items = [{ description: fd.get('item_desc') || 'Producto', quantity: parseInt(fd.get('item_qty')) || 1, unitPrice: parseFloat(fd.get('item_price')) || 0 }]; }
    const payload = { clientId: fd.get('clientId'), items, notes: fd.get('notes'), deliveryDate: fd.get('deliveryDate') || null, createdBy: user?.name || 'admin' };
    const method = orderModal.mode === 'create' ? 'POST' : 'PUT';
    const url = orderModal.mode === 'create' ? `${API()}/api/orders` : `${API()}/api/orders/${orderModal.data.id}`;
    try {
      const res = await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setOrderModal({ open: false, mode: 'create', data: null });
      toast(orderModal.mode === 'create' ? 'Pedido creado' : 'Pedido actualizado', 'success');
      fetchAll(localStorage.getItem('token'));
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleOrderStatus = async (id, status) => {
    const res = await fetch(`${API()}/api/orders/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ status }) });
    if (res.ok) fetchAll(localStorage.getItem('token'));
  };

  const handleDeleteOrder = async (id) => {
    if (!confirm('¿Eliminar este pedido?')) return;
    await fetch(`${API()}/api/orders/${id}`, { method: 'DELETE', headers: getHeaders() });
    fetchAll(localStorage.getItem('token'));
  };

  const handleSetup2FA = async () => {
    const res = await fetch(`${API()}/api/auth/setup-2fa`, { headers: getHeaders() });
    const data = await res.json();
    if (res.ok) setTwoFactorSetup({ qrCode: data.qrCode, secret: data.secret });
    else toast(data.error, 'error');
  };

  const handleEnable2FA = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API()}/api/auth/enable-2fa`, { method: 'POST', headers: getHeaders(), body: JSON.stringify({ secret: twoFactorSetup.secret, code: twoFactorCode }) });
    if (res.ok) { setTwoFactorEnabled(true); setTwoFactorSetup({ qrCode: '', secret: '' }); setTwoFactorCode(''); toast('2FA activado', 'success'); }
    else { const d = await res.json(); toast(d.error, 'error'); }
  };

  const handleDisable2FA = async (e) => {
    e.preventDefault();
    if (!confirm('¿Deshabilitar 2FA?')) return;
    const res = await fetch(`${API()}/api/auth/disable-2fa`, { method: 'POST', headers: getHeaders(), body: JSON.stringify({ password: twoFactorPassword }) });
    if (res.ok) { setTwoFactorEnabled(false); setTwoFactorPassword(''); toast('2FA desactivado', 'success'); }
    else { const d = await res.json(); toast(d.error, 'error'); }
  };

  const filteredClients = clients.filter(c =>
    !clientsSearch || c.name?.toLowerCase().includes(clientsSearch.toLowerCase()) ||
    c.email?.toLowerCase().includes(clientsSearch.toLowerCase()) ||
    c.phone?.includes(clientsSearch)
  );

  const filteredQuotes = quotes.filter(q =>
    !quotesFilter || q.status === quotesFilter || q.client?.name?.toLowerCase().includes(quotesFilter.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    !ordersFilter || o.status === ordersFilter || o.client?.name?.toLowerCase().includes(ordersFilter.toLowerCase())
  );

  const metrics = dashboardData?.metrics || {};
  const qByStatus = dashboardData?.quotesByStatus || [];
  const oByStatus = dashboardData?.ordersByStatus || [];
  const recentOrders = dashboardData?.recentOrders || [];
  const recentQuotes = dashboardData?.recentQuotes || [];

  const unreadCount = contacts.filter(c => !c.read).length;

  const renderSidebar = () => (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 max-md:hidden">
      <div className="p-5 border-b border-gray-100">
        <span className="text-lg font-extrabold tracking-wider text-[#FF5A1F] block">TECNOLIGHT</span>
        <span className="text-[10px] text-gray-400 uppercase tracking-widest block mt-0.5">Administración</span>
      </div>
      {user && (
        <div className="px-5 py-3 border-b border-gray-100">
          <span className="block text-sm font-semibold text-gray-900">{user.name}</span>
          <span className="block text-xs text-gray-400 mt-0.5 capitalize">{user.role}</span>
        </div>
      )}
      <nav className="flex-1 flex flex-col p-3 gap-0.5 overflow-y-auto">
        {[
          { id: 'home', icon: LayoutDashboard, label: 'Dashboard' },
          { id: 'clients', icon: Users, label: 'Clientes', count: clients.length },
          { id: 'quotes', icon: FileText, label: 'Cotizaciones', count: quotes.length },
          { id: 'orders', icon: ShoppingCart, label: 'Pedidos', count: orders.length },
          { id: 'contacts', icon: Mail, label: 'Consultas', count: unreadCount },
          { id: 'products', icon: Package, label: 'Productos', count: products.length },
          { id: 'projects', icon: Compass, label: 'Proyectos', count: projects.length },
          { id: 'settings', icon: Shield, label: 'Seguridad' },
        ].map(item => (
          <button key={item.id}
            className={`flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left ${
              activeTab === item.id ? 'bg-[#FF5A1F] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={18} />
            <span className="flex-1">{item.label}</span>
            {item.count !== undefined && (
              <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                activeTab === item.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>{item.count}</span>
            )}
          </button>
        ))}
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 mt-auto transition-colors"
        >
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </nav>
    </aside>
  );

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#FF5A1F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Cargando panel de control...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Head>
        <title>Panel de Administración | Tecnolight</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {renderSidebar()}

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 p-3 flex items-center gap-3">
        <span className="text-lg font-extrabold text-[#FF5A1F]">TL</span>
        <span className="text-sm font-semibold text-gray-900 flex-1">Administración</span>
        <button onClick={handleLogout} className="text-red-500 text-sm px-3 py-1.5 rounded-lg hover:bg-red-50">
          <LogOut size={16} />
        </button>
      </div>

      <main className="flex-1 p-6 pt-4 max-md:pt-16 overflow-y-auto">
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            <AlertCircle size={16} /> {error}
            <button onClick={() => setError('')} className="ml-auto"><X size={16} /></button>
          </div>
        )}

        {/* ===================== DASHBOARD HOME ===================== */}
        {activeTab === 'home' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <button onClick={() => fetchAll(localStorage.getItem('token'))}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
                <Activity size={14} /> Actualizar
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={Users} label="Clientes" value={metrics.totalClients || 0} sub="Registrados" color="bg-blue-50 text-blue-600" delay={0} />
              <StatCard icon={FileText} label="Cotizaciones" value={metrics.totalQuotes || 0} sub={qByStatus.find(s => s.status === 'APPROVED')?._count + ' aprobadas' || '0 aprobadas'} color="bg-orange-50 text-[#FF5A1F]" delay={0.05} />
              <StatCard icon={ShoppingCart} label="Pedidos" value={metrics.totalOrders || 0} sub={metrics.monthlyOrders + ' este mes'} color="bg-green-50 text-green-600" delay={0.1} />
              <StatCard icon={DollarSign} label="Ingresos Anuales" value={`$${(metrics.yearlyRevenue || 0).toLocaleString('es-AR')}`} sub={`$${(metrics.monthlyRevenue || 0).toLocaleString('es-AR')} este mes`} color="bg-purple-50 text-purple-600" delay={0.15} />
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={16} className="text-[#FF5A1F]" /> Control de Stock
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {(() => {
                  const totalStock = products.reduce((s, p) => s + (p.stock || 0), 0);
                  const lowStock = products.filter(p => (p.stock || 0) <= 5);
                  const outOfStock = products.filter(p => !p.stock || p.stock === 0);
                  const totalProducts = products.length;
                  return <>
                    <StatCard icon={Package} label="Productos" value={totalProducts} sub="Registrados" color="bg-blue-50 text-blue-600" delay={0} />
                    <StatCard icon={Package} label="Stock Total" value={totalStock} sub="Unidades" color="bg-green-50 text-green-600" delay={0.05} />
                    <StatCard icon={Activity} label="Stock Bajo (≤5)" value={lowStock.length} sub={lowStock.map(p => p.name).slice(0, 2).join(', ')} color="bg-yellow-50 text-yellow-600" delay={0.1} />
                    <StatCard icon={AlertCircle} label="Sin Stock" value={outOfStock.length} sub={outOfStock.length > 0 ? 'Requiere reposición' : 'Todo en orden'} color={outOfStock.length > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'} delay={0.15} />
                  </>;
                })()}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#FF5A1F]" /> Ingresos Mensuales
                </h3>
                {revenueData?.data && revenueData.data.some(d => d.revenue > 0) ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={revenueData.data.map((d, i) => ({ ...d, month: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][i] }))}>
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '13px' }}
                        formatter={(v) => [`$${v.toLocaleString('es-AR')}`, 'Ingresos']}
                      />
                      <Bar dataKey="revenue" fill="#FF5A1F" radius={[6, 6, 0, 0]} maxBarSize={40}
                        animationBegin={0} animationDuration={800} animationEasing="ease-out" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-400 text-sm">Sin datos de ingresos</div>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity size={16} className="text-[#FF5A1F]" /> Pedidos por Estado
                </h3>
                {oByStatus.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>
                        <Pie data={oByStatus.map(s => ({ name: STATUS_TEXT[s.status] || s.status, value: s._count }))}
                          cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value"
                          animationBegin={200} animationDuration={800}>
                          {oByStatus.map((s, i) => (
                            <Cell key={s.status} fill={['#FF5A1F','#3B82F6','#8B5CF6','#10B981','#F59E0B','#EF4444'][i] || '#9CA3AF'} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {oByStatus.map((s, i) => (
                        <div key={s.status} className="flex items-center gap-2 text-xs">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: ['#FF5A1F','#3B82F6','#8B5CF6','#10B981','#F59E0B','#EF4444'][i] || '#9CA3AF' }} />
                          <span className="text-gray-500">{STATUS_TEXT[s.status] || s.status}</span>
                          <span className="font-semibold text-gray-900 ml-auto">{s._count}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : <p className="text-sm text-gray-400 py-8 text-center">Sin pedidos</p>}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
                className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#FF5A1F]" /> Top Productos
                </h3>
                <div className="space-y-2">
                  {topProducts.length > 0 ? topProducts.slice(0, 5).map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 truncate flex-1">{p.description}</span>
                      <span className="font-semibold text-gray-900 ml-2">{p.quantity} uds</span>
                    </div>
                  )) : <p className="text-sm text-gray-400">Sin ventas</p>}
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-[#FF5A1F]" /> Últimas Cotizaciones
                </h3>
                {recentQuotes.length > 0 ? recentQuotes.map((q, i) => (
                  <motion.div key={q.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 px-2 -mx-2 rounded-lg transition-colors">
                    <div>
                      <span className="text-sm font-medium text-gray-900">#{String(q.number).padStart(5, '0')}</span>
                      <span className="text-xs text-gray-400 ml-2">{q.client?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={q.status} />
                      <span className="text-xs text-gray-400">{new Date(q.createdAt).toLocaleDateString('es-AR')}</span>
                    </div>
                  </motion.div>
                )) : <p className="text-sm text-gray-400 py-8 text-center">Sin cotizaciones recientes</p>}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-[#FF5A1F]" /> Últimos Pedidos
                </h3>
                {recentOrders.length > 0 ? recentOrders.map((o, i) => (
                  <motion.div key={o.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 px-2 -mx-2 rounded-lg transition-colors">
                    <div>
                      <span className="text-sm font-medium text-gray-900">#{String(o.number).padStart(5, '0')}</span>
                      <span className="text-xs text-gray-400 ml-2">{o.client?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={o.status} />
                      <span className="text-xs text-gray-400">${o.total?.toLocaleString('es-AR')}</span>
                    </div>
                  </motion.div>
                )) : <p className="text-sm text-gray-400 py-8 text-center">Sin pedidos recientes</p>}
              </div>
            </motion.div>
          </div>
        )}

        {/* ===================== CLIENTS ===================== */}
        {activeTab === 'clients' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Buscar cliente..." value={clientsSearch} onChange={e => setClientsSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <button onClick={() => setClientModal({ open: true, mode: 'create', data: null })}
                  className="inline-flex items-center gap-2 bg-[#FF5A1F] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#E04E1A] transition-all whitespace-nowrap">
                  <Plus size={16} /> Nuevo
                </button>
              </div>
            </div>

            {loading ? <TableSkeleton rows={4} cols={6} /> : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Nombre</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Teléfono</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Empresa</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Actividad</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((c) => (
                    <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{c.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{c.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{c.phone || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{c.company || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <span className="text-xs">{c._count?.quotes || 0} cotiz. · {c._count?.orders || 0} pedidos</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setClientModal({ open: true, mode: 'edit', data: c })}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <Edit size={15} />
                          </button>
                          <button onClick={() => handleDeleteClient(c.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredClients.length === 0 && (
                    <tr><td colSpan="6" className="text-center text-gray-400 py-8 text-sm">No hay clientes registrados</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            )}
          </div>
        )}

        {/* ===================== QUOTES ===================== */}
        {activeTab === 'quotes' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Cotizaciones</h1>
              <div className="flex items-center gap-3">
                <select value={quotesFilter} onChange={e => setQuotesFilter(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#FF5A1F]">
                  <option value="">Todos los estados</option>
                  {['DRAFT', 'SENT', 'APPROVED', 'REJECTED', 'EXPIRED'].map(s => (
                    <option key={s} value={s}>{STATUS_TEXT[s]}</option>
                  ))}
                </select>
                <button onClick={() => setQuoteModal({ open: true, mode: 'create', data: null })}
                  className="inline-flex items-center gap-2 bg-[#FF5A1F] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#E04E1A] transition-all">
                  <Plus size={16} /> Nueva
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">N°</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Cliente</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Fecha</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((q) => (
                    <tr key={q.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">#{String(q.number).padStart(5, '0')}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{q.client?.name || '-'}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">${(q.total || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
                      <td className="px-4 py-3 text-sm text-gray-500">{new Date(q.createdAt).toLocaleDateString('es-AR')}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {q.status === 'DRAFT' && (
                            <button onClick={() => handleQuoteStatus(q.id, 'SENT')} title="Marcar Enviada"
                              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                              <ArrowUpRight size={14} />
                            </button>
                          )}
                          {q.status === 'SENT' && (
                            <button onClick={() => handleQuoteStatus(q.id, 'APPROVED')} title="Aprobar"
                              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors">
                              <Check size={14} />
                            </button>
                          )}
                          {(q.status === 'SENT' || q.status === 'DRAFT') && (
                            <button onClick={() => handleQuoteStatus(q.id, 'REJECTED')} title="Rechazar"
                              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                              <X size={14} />
                            </button>
                          )}
                          <button onClick={() => handleQuotePdf(q.id)} title="Descargar PDF"
                            className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <FileDown size={14} />
                          </button>
                          <button onClick={() => setQuoteModal({ open: true, mode: 'edit', data: q })}
                            className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleDeleteQuote(q.id)}
                            className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredQuotes.length === 0 && (
                    <tr><td colSpan="6" className="text-center text-gray-400 py-8 text-sm">No hay cotizaciones</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== ORDERS ===================== */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
              <div className="flex items-center gap-3">
                <select value={ordersFilter} onChange={e => setOrdersFilter(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#FF5A1F]">
                  <option value="">Todos los estados</option>
                  {['PENDING', 'CONFIRMED', 'IN_PRODUCTION', 'READY', 'DELIVERED', 'CANCELLED'].map(s => (
                    <option key={s} value={s}>{STATUS_TEXT[s]}</option>
                  ))}
                </select>
                <button onClick={() => setOrderModal({ open: true, mode: 'create', data: null })}
                  className="inline-flex items-center gap-2 bg-[#FF5A1F] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#E04E1A] transition-all">
                  <Plus size={16} /> Nuevo
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">N°</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Cliente</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Fecha</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">#{String(o.number).padStart(5, '0')}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{o.client?.name || '-'}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">${(o.total || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                      <td className="px-4 py-3 text-sm text-gray-500">{new Date(o.createdAt).toLocaleDateString('es-AR')}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {o.status === 'PENDING' && (
                            <button onClick={() => handleOrderStatus(o.id, 'CONFIRMED')} title="Confirmar"
                              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                              <Check size={14} />
                            </button>
                          )}
                          {o.status === 'CONFIRMED' && (
                            <button onClick={() => handleOrderStatus(o.id, 'IN_PRODUCTION')} title="Iniciar Producción"
                              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                              <Package size={14} />
                            </button>
                          )}
                          {o.status === 'IN_PRODUCTION' && (
                            <button onClick={() => handleOrderStatus(o.id, 'READY')} title="Marcar Listo"
                              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors">
                              <Check size={14} />
                            </button>
                          )}
                          {o.status === 'READY' && (
                            <button onClick={() => handleOrderStatus(o.id, 'DELIVERED')} title="Marcar Entregado"
                              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                              <Check size={14} />
                            </button>
                          )}
                          {(o.status !== 'DELIVERED' && o.status !== 'CANCELLED') && (
                            <button onClick={() => handleOrderStatus(o.id, 'CANCELLED')} title="Cancelar"
                              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                              <X size={14} />
                            </button>
                          )}
                          <button onClick={() => setOrderModal({ open: true, mode: 'edit', data: o })}
                            className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleDeleteOrder(o.id)}
                            className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr><td colSpan="6" className="text-center text-gray-400 py-8 text-sm">No hay pedidos</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== CONTACTS ===================== */}
        {activeTab === 'contacts' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Consultas Recibidas</h1>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Fecha</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Remitente</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Mensaje</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-t border-gray-100 transition-colors hover:bg-gray-50/50" style={{ opacity: contact.read ? 0.7 : 1 }}>
                      <td className="px-4 py-3 text-sm text-gray-600">{new Date(contact.createdAt).toLocaleDateString('es-AR')}</td>
                      <td className="px-4 py-3 text-sm" style={{ fontWeight: contact.read ? 500 : 700 }}>{contact.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{contact.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">{contact.message}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contact.read ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-[#FF5A1F]'}`}>
                          {contact.read ? 'Leído' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setContactViewModal({ open: true, data: contact })}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <Eye size={16} />
                          </button>
                          {!contact.read && (
                            <button onClick={() => handleMarkContactRead(contact.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors">
                              <Check size={16} />
                            </button>
                          )}
                          <button onClick={() => handleDeleteContact(contact.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr><td colSpan="6" className="text-center text-gray-400 py-8 text-sm">No hay consultas registradas</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== PRODUCTS ===================== */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Base de Productos</h1>
              <button onClick={() => setProductModal({ open: true, mode: 'create', data: null })}
                className="inline-flex items-center gap-2 bg-[#FF5A1F] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#E04E1A] transition-all">
                <Plus size={16} /> Agregar
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Nombre</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Categoría</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Stock</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Precio</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Imagen</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const stock = product.stock || 0;
                    const stockColor = stock === 0 ? 'text-red-500' : stock <= 5 ? 'text-yellow-600' : 'text-green-600';
                    const stockBg = stock === 0 ? 'bg-red-50' : stock <= 5 ? 'bg-yellow-50' : 'bg-green-50';
                    return (
                    <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{product.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${stockBg} ${stockColor}`}>
                          {stock === 0 ? 'Sin stock' : `${stock} uds`}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product.price ? `$${product.price.toLocaleString('es-AR')}` : 'Cotizar'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.active ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-[#FF5A1F]'}`}>
                          {product.active ? 'Activo' : 'Pausado'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {product.images && product.images[0] ? (
                          <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setProductModal({ open: true, mode: 'edit', data: product })}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                  {products.length === 0 && (
                    <tr><td colSpan="7" className="text-center text-gray-400 py-8 text-sm">No hay productos registrados</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== PROJECTS ===================== */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Proyectos</h1>
              <button onClick={() => setProjectModal({ open: true, mode: 'create', data: null })}
                className="inline-flex items-center gap-2 bg-[#FF5A1F] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#E04E1A] transition-all">
                <Plus size={16} /> Agregar
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Proyecto</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Cliente</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Ubicación</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{project.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{project.client || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{project.location || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.active ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-[#FF5A1F]'}`}>
                          {project.active ? 'Activo' : 'Pausado'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setProjectModal({ open: true, mode: 'edit', data: project })}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDeleteProject(project.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr><td colSpan="5" className="text-center text-gray-400 py-8 text-sm">No hay proyectos registrados</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== SETTINGS ===================== */}
        {activeTab === 'settings' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Configuración de Seguridad</h1>
            <div className="max-w-xl space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF5A1F]">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Autenticación de Doble Factor (2FA)</h3>
                    <p className="text-sm text-gray-500">Aumentá la seguridad de tu cuenta</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                  <span className="font-medium text-sm text-gray-700 flex-1">Estado</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${twoFactorEnabled ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-[#FF5A1F]'}`}>
                    {twoFactorEnabled ? 'Activado' : 'Desactivado'}
                  </span>
                </div>

                {!twoFactorEnabled && !twoFactorSetup.qrCode && (
                  <button onClick={handleSetup2FA}
                    className="inline-flex items-center gap-2 bg-[#FF5A1F] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#E04E1A] transition-all">
                    <Shield size={16} /> Configurar 2FA
                  </button>
                )}

                {twoFactorSetup.qrCode && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 mb-4">Escaneá este código QR con Google Authenticator</p>
                    <img src={twoFactorSetup.qrCode} alt="QR 2FA" className="w-48 h-48 mx-auto rounded-lg bg-white p-2 border border-gray-200" />
                    <p className="text-xs text-gray-400 mt-3">O ingresá manualmente: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{twoFactorSetup.secret}</code></p>
                    <form onSubmit={handleEnable2FA} className="flex gap-3 justify-center mt-4">
                      <input type="text" maxLength={6} placeholder="Código 6 dígitos" value={twoFactorCode}
                        onChange={e => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-36 text-center text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF5A1F]" />
                      <button type="submit" disabled={twoFactorCode.length < 6}
                        className="inline-flex items-center gap-2 bg-[#FF5A1F] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#E04E1A] transition-all disabled:opacity-50">
                        Activar
                      </button>
                    </form>
                  </div>
                )}

                {twoFactorEnabled && (
                  <form onSubmit={handleDisable2FA} className="flex gap-3 items-end">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">Contraseña para deshabilitar</label>
                      <input type="password" placeholder="Contraseña actual" value={twoFactorPassword}
                        onChange={e => setTwoFactorPassword(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF5A1F]" />
                    </div>
                    <button type="submit"
                      className="inline-flex items-center gap-2 bg-red-50 text-red-600 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-red-100 transition-all border border-red-200">
                      Desactivar 2FA
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===================== MODALS ===================== */}

      {/* Client Modal */}
      {clientModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{clientModal.mode === 'create' ? 'Nuevo Cliente' : 'Editar Cliente'}</h2>
              <button onClick={() => setClientModal({ open: false, mode: 'create', data: null })} className="text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleClientSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Nombre *</label>
                  <input type="text" name="name" required defaultValue={clientModal.data?.name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Email *</label>
                  <input type="email" name="email" required defaultValue={clientModal.data?.email || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Teléfono</label>
                  <input type="text" name="phone" defaultValue={clientModal.data?.phone || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Empresa</label>
                  <input type="text" name="company" defaultValue={clientModal.data?.company || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Dirección</label>
                  <input type="text" name="address" defaultValue={clientModal.data?.address || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Ciudad</label>
                  <input type="text" name="city" defaultValue={clientModal.data?.city || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Provincia</label>
                  <input type="text" name="province" defaultValue={clientModal.data?.province || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Notas</label>
                  <textarea name="notes" rows={2} defaultValue={clientModal.data?.notes || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F] resize-none"></textarea>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setClientModal({ open: false, mode: 'create', data: null })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#FF5A1F] rounded-lg hover:bg-[#E04E1A] transition-all">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {quoteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{quoteModal.mode === 'create' ? 'Nueva Cotización' : 'Editar Cotización'}</h2>
              <button onClick={() => setQuoteModal({ open: false, mode: 'create', data: null })} className="text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleQuoteSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Cliente *</label>
                <select name="clientId" required defaultValue={quoteModal.data?.clientId || quoteModal.data?.client?.id || ''}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]">
                  <option value="">Seleccionar cliente...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ''}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Items (JSON) *</label>
                <textarea name="items" rows={3} required defaultValue={quoteModal.data?.items ? JSON.stringify(quoteModal.data.items.map(i => ({ description: i.description, quantity: i.quantity, unitPrice: i.unitPrice }))) : ''}
                  placeholder='[{"description":"Señal Pare 70cm","quantity":10,"unitPrice":2500}]'
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F] font-mono"></textarea>
                <p className="text-xs text-gray-400 mt-1">Formato JSON array con description, quantity, unitPrice</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Notas</label>
                  <textarea name="notes" rows={2} defaultValue={quoteModal.data?.notes || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F] resize-none"></textarea>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Válida hasta</label>
                  <input type="date" name="validUntil" defaultValue={quoteModal.data?.validUntil?.split('T')[0] || ''}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setQuoteModal({ open: false, mode: 'create', data: null })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#FF5A1F] rounded-lg hover:bg-[#E04E1A] transition-all">Guardar Cotización</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {orderModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{orderModal.mode === 'create' ? 'Nuevo Pedido' : 'Editar Pedido'}</h2>
              <button onClick={() => setOrderModal({ open: false, mode: 'create', data: null })} className="text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleOrderSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Cliente *</label>
                <select name="clientId" required defaultValue={orderModal.data?.clientId || orderModal.data?.client?.id || ''}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]">
                  <option value="">Seleccionar cliente...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Items (JSON) *</label>
                <textarea name="items" rows={3} required defaultValue={orderModal.data?.items ? JSON.stringify(orderModal.data.items.map(i => ({ description: i.description, quantity: i.quantity, unitPrice: i.unitPrice }))) : ''}
                  placeholder='[{"description":"Señal Pare 70cm","quantity":10,"unitPrice":2500}]'
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F] font-mono"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Notas</label>
                  <textarea name="notes" rows={2} defaultValue={orderModal.data?.notes || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F] resize-none"></textarea>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Fecha de entrega</label>
                  <input type="date" name="deliveryDate" defaultValue={orderModal.data?.deliveryDate?.split('T')[0] || ''}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setOrderModal({ open: false, mode: 'create', data: null })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#FF5A1F] rounded-lg hover:bg-[#E04E1A] transition-all">Guardar Pedido</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {productModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{productModal.mode === 'create' ? 'Agregar Producto' : 'Editar Producto'}</h2>
              <button onClick={() => setProductModal({ open: false, mode: 'create', data: null })} className="text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleProductSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Nombre *</label>
                  <input type="text" name="name" required defaultValue={productModal.data?.name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Slug *</label>
                  <input type="text" name="slug" required defaultValue={productModal.data?.slug || ''} placeholder="ej: senal-pare"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Categoría *</label>
                  <select name="category" required defaultValue={productModal.data?.category || 'Reglamentarias'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]">
                    <option value="Reglamentarias">Reglamentarias</option>
                    <option value="Preventivas">Preventivas</option>
                    <option value="Informativas">Informativas</option>
                    <option value="Cartelería Comercial">Cartelería Comercial</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Precio (ARS)</label>
                  <input type="number" step="0.01" name="price" defaultValue={productModal.data?.price || ''} placeholder="Cotizar"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Stock *</label>
                  <input type="number" min="0" name="stock" defaultValue={productModal.data?.stock ?? 0}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Descripción *</label>
                  <textarea name="description" required rows={3} defaultValue={productModal.data?.description || ''}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Especificaciones Técnicas</label>
                  <textarea name="specs" rows={3} defaultValue={productModal.data?.specs || ''}
                    placeholder="Material: Aluminio&#10;Reflectivo: Grado Ingeniería"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Imagen del Producto</label>
                  <div className="flex items-center gap-4">
                    <input type="file" name="productImage" accept="image/*"
                      className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FF5A1F]/10 file:text-[#FF5A1F] hover:file:bg-[#FF5A1F]/20 cursor-pointer" />
                    {productModal.data?.images?.[0] && (
                      <img src={productModal.data.images[0]} alt="" className="w-14 h-14 rounded-lg object-cover border border-gray-200 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Formatos: JPG, PNG, WebP (máx 5MB). Se almacenará en carpeta por semana.</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Visibilidad</label>
                  <select name="active" defaultValue={productModal.data ? String(productModal.data.active) : 'true'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]">
                    <option value="true">Activo / Visible</option>
                    <option value="false">Oculto / Pausado</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setProductModal({ open: false, mode: 'create', data: null })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#FF5A1F] rounded-lg hover:bg-[#E04E1A] transition-all">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {projectModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{projectModal.mode === 'create' ? 'Agregar Proyecto' : 'Editar Proyecto'}</h2>
              <button onClick={() => setProjectModal({ open: false, mode: 'create', data: null })} className="text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleProjectSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Título *</label>
                  <input type="text" name="title" required defaultValue={projectModal.data?.title || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Slug *</label>
                  <input type="text" name="slug" required defaultValue={projectModal.data?.slug || ''} placeholder="ej: senalizacion-autopista"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Cliente *</label>
                  <input type="text" name="client" required defaultValue={projectModal.data?.client || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Ubicación *</label>
                  <input type="text" name="location" required defaultValue={projectModal.data?.location || ''} placeholder="Santa Fe, Argentina"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Descripción *</label>
                  <textarea name="description" required rows={3} defaultValue={projectModal.data?.description || ''}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Testimonio del Cliente</label>
                  <textarea name="testimonial" rows={2} defaultValue={projectModal.data?.testimonial || ''}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Estado</label>
                  <select name="active" defaultValue={projectModal.data ? String(projectModal.data.active) : 'true'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F]">
                    <option value="true">Activo / Visible</option>
                    <option value="false">Oculto / Pausado</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setProjectModal({ open: false, mode: 'create', data: null })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#FF5A1F] rounded-lg hover:bg-[#E04E1A] transition-all">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact View Modal */}
      {contactViewModal.open && contactViewModal.data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Detalles de Consulta</h2>
              <button onClick={() => setContactViewModal({ open: false, data: null })} className="text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-5">
              <div><span className="text-xs text-gray-400 block mb-1">Fecha</span><span className="text-sm text-gray-900">{new Date(contactViewModal.data.createdAt).toLocaleString('es-AR')}</span></div>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-gray-400 block mb-1">Remitente</span><span className="text-sm font-semibold text-gray-900 flex items-center gap-1"><User size={14} /> {contactViewModal.data.name}</span></div>
                <div><span className="text-xs text-gray-400 block mb-1">Empresa</span><span className="text-sm text-gray-900">{contactViewModal.data.company || 'Particular'}</span></div>
                <div><span className="text-xs text-gray-400 block mb-1">Email</span><a href={`mailto:${contactViewModal.data.email}`} className="text-sm text-[#FF5A1F] underline">{contactViewModal.data.email}</a></div>
                <div><span className="text-xs text-gray-400 block mb-1">Teléfono</span><span className="text-sm text-gray-900">{contactViewModal.data.phone || 'No especifica'}</span></div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-400 block mb-2">Mensaje</span>
                <p className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-sm text-gray-900 whitespace-pre-wrap">{contactViewModal.data.message}</p>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button onClick={() => handleDeleteContact(contactViewModal.data.id)}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors mr-auto">
                  <Trash2 size={14} className="inline mr-1" /> Eliminar
                </button>
                {!contactViewModal.data.read && (
                  <button onClick={() => { handleMarkContactRead(contactViewModal.data.id); }}
                    className="px-4 py-2 text-sm font-semibold text-white bg-[#FF5A1F] rounded-lg hover:bg-[#E04E1A] transition-all">
                    <Check size={14} className="inline mr-1" /> Marcar Leído
                  </button>
                )}
                <button onClick={() => setContactViewModal({ open: false, data: null })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
