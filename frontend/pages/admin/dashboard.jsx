/**
 * ============================================
 * PANEL DE ADMINISTRACIÓN - DASHBOARD
 * ============================================
 * 
 * Panel principal para gestionar el contenido del sitio.
 * Requiere autenticación JWT (solo administradores).
 * 
 * Funcionalidades:
 * - Gestión de consultas de contacto (ver, marcar leído, eliminar)
 * - CRUD completo de productos del catálogo
 * - CRUD completo de proyectos del portfolio
 * - Modales para crear/editar productos y proyectos
 * 
 * Datos:
 * - Token JWT almacenado en localStorage
 * - Datos de usuario en localStorage
 * 
 * @module AdminDashboard
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'; // Hook para redirección
import { 
  Mail, Package, Compass, LogOut, Check, Trash2, Plus, Edit, X, Eye, 
  MapPin, User, ShieldAlert, FileText, Shield, Smartphone, Key
} from 'lucide-react'; // Iconos

/**
 * Componente principal del dashboard
 * 
 * @returns {JSX.Element} Panel de administración
 */
export default function Dashboard() {
  const router = useRouter();
  // ============================================
  // ESTADOS LOCALES
  // ============================================
  
  const [activeTab, setActiveTab] = useState('contacts'); // Pestaña activa (contacts/products/projects)
  const [user, setUser] = useState(null); // Datos del usuario autenticado
  
  // Estados de datos
  const [contacts, setContacts] = useState([]); // Lista de contactos
  const [products, setProducts] = useState([]); // Lista de productos
  const [projects, setProjects] = useState([]); // Lista de proyectos
  
  // Estados de UI
  const [loading, setLoading] = useState(true); // Estado de carga inicial
  const [error, setError] = useState(''); // Mensaje de error
  
  // Estados de modales
  const [productModal, setProductModal] = useState({ open: false, mode: 'create', data: null }); // Modal de producto
  const [projectModal, setProjectModal] = useState({ open: false, mode: 'create', data: null }); // Modal de proyecto
  const [contactViewModal, setContactViewModal] = useState({ open: false, data: null }); // Modal de detalle de contacto

  // Estados de 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorSetup, setTwoFactorSetup] = useState({ qrCode: '', secret: '' });
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorPassword, setTwoFactorPassword] = useState('');

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  
  /**
   * useEffect: Verificar autenticación y cargar datos iniciales
   * 
   * Flujo:
   * 1. Verificar que exista token en localStorage
   * 2. Si no hay token, redirigir a login
   * 3. Si hay token, cargar datos del dashboard
   * 
   * Se ejecuta al montar el componente
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }
    
    setUser(JSON.parse(userData));
    fetchDashboardData(token);
  }, [router]);

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchDashboardData = async (token) => {
    setLoading(true);
    setError('');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const authHeaders = {
      'Authorization': `Bearer ${token}`
    };

    try {
      const [contactsRes, productsRes, projectsRes] = await Promise.all([
        fetch(`${apiUrl}/api/contact?read=all`, { headers: authHeaders }),
        fetch(`${apiUrl}/api/products?active=false`),
        fetch(`${apiUrl}/api/projects?active=false`)
      ]);

      if (contactsRes.status === 401) {
        handleLogout();
        return;
      }

      const contactsData = await contactsRes.json();
      const productsData = await productsRes.json();
      const projectsData = await projectsRes.json();

      setContacts(contactsData.contacts || []);
      setProducts(productsData.products || []);
      setProjects(projectsData.projects || []);

      // Fetch 2FA status
      const twofaRes = await fetch(`${apiUrl}/api/auth/2fa-status`, { headers: authHeaders });
      if (twofaRes.ok) {
        const twofaData = await twofaRes.json();
        setTwoFactorEnabled(twofaData.enabled);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Ocurrió un error al cargar la información del servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  // Contacts Handlers
  const handleMarkContactRead = async (id) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${apiUrl}/api/contact/${id}/read`, {
        method: 'PUT',
        headers: getHeaders()
      });
      if (res.ok) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, read: true } : c));
        if (contactViewModal.open && contactViewModal.data?.id === id) {
          setContactViewModal(prev => ({ ...prev, data: { ...prev.data, read: true } }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este contacto?')) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${apiUrl}/api/contact/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== id));
        setContactViewModal({ open: false, data: null });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Products CRUD Handlers
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productPayload = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      category: formData.get('category'),
      price: parseFloat(formData.get('price')) || null,
      specs: formData.get('specs'),
      active: formData.get('active') === 'true'
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const method = productModal.mode === 'create' ? 'POST' : 'PUT';
    const endpoint = productModal.mode === 'create' 
      ? `${apiUrl}/api/products` 
      : `${apiUrl}/api/products/${productModal.data.id}`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(productPayload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar el producto');

      alert(data.message || 'Operación exitosa');
      setProductModal({ open: false, mode: 'create', data: null });
      
      // Refresh token values
      const token = localStorage.getItem('token');
      fetchDashboardData(token);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${apiUrl}/api/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 2FA Handlers
  const handleSetup2FA = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/setup-2fa`, {
        headers: getHeaders()
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTwoFactorSetup({ qrCode: data.qrCode, secret: data.secret });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEnable2FA = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/enable-2fa`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ secret: twoFactorSetup.secret, code: twoFactorCode })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTwoFactorEnabled(true);
      setTwoFactorSetup({ qrCode: '', secret: '' });
      setTwoFactorCode('');
      alert('2FA activado exitosamente.');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDisable2FA = async (e) => {
    e.preventDefault();
    if (!confirm('¿Estás seguro de deshabilitar 2FA?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/disable-2fa`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ password: twoFactorPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTwoFactorEnabled(false);
      setTwoFactorPassword('');
      alert('2FA desactivado exitosamente.');
    } catch (err) {
      alert(err.message);
    }
  };

  // Projects CRUD Handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectPayload = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      client: formData.get('client'),
      location: formData.get('location'),
      testimonial: formData.get('testimonial'),
      active: formData.get('active') === 'true',
      images: [] // Simple structure empty array
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const method = projectModal.mode === 'create' ? 'POST' : 'PUT';
    const endpoint = projectModal.mode === 'create' 
      ? `${apiUrl}/api/projects` 
      : `${apiUrl}/api/projects/${projectModal.data.id}`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(projectPayload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar el proyecto');

      alert(data.message || 'Proyecto guardado con éxito');
      setProjectModal({ open: false, mode: 'create', data: null });
      
      // Refresh values
      const token = localStorage.getItem('token');
      fetchDashboardData(token);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${apiUrl}/api/projects/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && !user) {
    return <div className="container" style={{ padding: '5rem 0' }}>Cargando panel de control...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>Panel de Administración | Tecnolight</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-bg-surface border-r border-border flex flex-col shrink-0">
        <div className="p-6 border-b border-border text-center">
          <span className="text-xl font-extrabold tracking-wider text-primary block">TECNOLIGHT</span>
          <span className="text-xs text-text-muted uppercase tracking-widest block mt-0.5">Administración</span>
        </div>

        {user && (
          <div className="px-6 py-4 border-b border-border">
            <span className="block text-sm font-semibold text-text-main">{user.name}</span>
            <span className="block text-xs text-text-muted mt-0.5">Nivel: {user.role}</span>
          </div>
        )}

        <nav className="flex-1 flex flex-col p-3 gap-1">
          <button 
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left ${activeTab === 'contacts' ? 'bg-bg-card text-primary' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
            onClick={() => setActiveTab('contacts')}
          >
            <Mail size={18} /> Consultas ({contacts.filter(c => !c.read).length})
          </button>
          <button 
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left ${activeTab === 'products' ? 'bg-bg-card text-primary' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={18} /> Productos ({products.length})
          </button>
          <button 
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left ${activeTab === 'projects' ? 'bg-bg-card text-primary' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
            onClick={() => setActiveTab('projects')}
          >
            <Compass size={18} /> Proyectos ({projects.length})
          </button>
          
          <button 
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left ${activeTab === 'settings' ? 'bg-bg-card text-primary' : 'text-text-muted hover:bg-bg-card hover:text-text-main'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Shield size={18} /> Seguridad
          </button>

          <button 
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left mt-auto text-error hover:bg-error/10"
            onClick={handleLogout}
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </nav>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {error && (
          <div style={{ backgroundColor: 'var(--color-error-bg)', border: '1px solid var(--color-error)', color: '#FF7F7F', padding: '1rem', borderRadius: '6px', marginBottom: '2rem' }}>
            {error}
          </div>
        )}

        {/* Tab 1: Contacts Management */}
        {activeTab === 'contacts' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1>Consultas Recibidas</h1>
            </div>
            
            <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-bg-surface">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Fecha</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Remitente</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Mensaje</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Estado</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-border last:border-b-0 transition-colors hover:bg-bg-surface/50" style={{ opacity: contact.read ? 0.75 : 1 }}>
                      <td className="px-4 py-3 text-sm text-text-main">{new Date(contact.createdAt).toLocaleDateString('es-AR')}</td>
                      <td className="px-4 py-3 text-sm" style={{ fontWeight: contact.read ? 500 : 700 }}>{contact.name}</td>
                      <td className="px-4 py-3 text-sm text-text-main">{contact.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="max-w-[250px] truncate text-text-muted">{contact.message}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contact.read ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                          {contact.read ? 'Leído' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:bg-bg-surface hover:text-text-main transition-colors" 
                            title="Ver Mensaje"
                            onClick={() => setContactViewModal({ open: true, data: contact })}
                          >
                            <Eye size={18} />
                          </button>
                          {!contact.read && (
                            <button 
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:bg-bg-surface hover:text-text-main transition-colors" 
                              title="Marcar Leído"
                              onClick={() => handleMarkContactRead(contact.id)}
                            >
                              <Check size={18} color="var(--color-success)" />
                            </button>
                          )}
                          <button 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:bg-error/10 hover:text-error transition-colors"
                            title="Eliminar"
                            onClick={() => handleDeleteContact(contact.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '3rem' }}>
                        No hay consultas registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Products CRUD Management */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1>Base de Productos</h1>
              <button 
                className="btn-primary" 
                style={{ padding: '0.65rem 1.25rem' }}
                onClick={() => setProductModal({ open: true, mode: 'create', data: null })}
              >
                <Plus size={18} /> Agregar Producto
              </button>
            </div>

            <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-bg-surface">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Nombre</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Categoría</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Precio</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Estado</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-border last:border-b-0 transition-colors hover:bg-bg-surface/50">
                      <td className="px-4 py-3 text-sm" style={{ fontWeight: 600 }}>{product.name}</td>
                      <td className="px-4 py-3 text-sm text-text-main">{product.category}</td>
                      <td className="px-4 py-3 text-sm text-text-main">{product.price ? `$${product.price.toLocaleString('es-AR')}` : 'Cotizar'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.active ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                          {product.active ? 'Activo' : 'Pausado'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:bg-bg-surface hover:text-text-main transition-colors" 
                            title="Editar"
                            onClick={() => setProductModal({ open: true, mode: 'edit', data: product })}
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:bg-error/10 hover:text-error transition-colors"
                            title="Eliminar"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '3rem' }}>
                        No hay productos registrados en el catálogo.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Projects CRUD Management */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1>Gestión de Proyectos</h1>
              <button 
                className="btn-primary" 
                style={{ padding: '0.65rem 1.25rem' }}
                onClick={() => setProjectModal({ open: true, mode: 'create', data: null })}
              >
                <Plus size={18} /> Agregar Proyecto
              </button>
            </div>

            <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-bg-surface">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Proyecto</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Cliente</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Ubicación</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Estado</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-border last:border-b-0 transition-colors hover:bg-bg-surface/50">
                      <td className="px-4 py-3 text-sm" style={{ fontWeight: 600 }}>{project.title}</td>
                      <td className="px-4 py-3 text-sm text-text-main">{project.client}</td>
                      <td className="px-4 py-3 text-sm text-text-main">{project.location}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.active ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                          {project.active ? 'Activo' : 'Pausado'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:bg-bg-surface hover:text-text-main transition-colors" 
                            title="Editar"
                            onClick={() => setProjectModal({ open: true, mode: 'edit', data: project })}
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:bg-error/10 hover:text-error transition-colors"
                            title="Eliminar"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '3rem' }}>
                        No hay proyectos registrados en el portfolio.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Security Settings */}
        {activeTab === 'settings' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1>Configuración de Seguridad</h1>
            </div>

            <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* 2FA Section */}
              <div className="bg-bg-card border border-border rounded-xl p-6">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <Smartphone size={32} style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <h3 style={{ margin: 0 }}>Autenticación de Doble Factor (2FA)</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                      Aumentá la seguridad de tu cuenta con un segundo factor de autenticación.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '8px', background: 'var(--color-bg-dark)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontWeight: 600, flex: 1 }}>Estado</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${twoFactorEnabled ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                    {twoFactorEnabled ? 'Activado' : 'Desactivado'}
                  </span>
                </div>

                {!twoFactorEnabled && !twoFactorSetup.qrCode && (
                  <button className="btn-primary" onClick={handleSetup2FA} style={{ marginTop: '1rem' }}>
                    <Shield size={18} /> Configurar 2FA
                  </button>
                )}

                {twoFactorSetup.qrCode && (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
                      Escaneá este código QR con Google Authenticator o similar.
                    </p>
                    <img src={twoFactorSetup.qrCode} alt="QR 2FA" style={{ width: 200, height: 200, borderRadius: '8px', background: 'white', padding: '8px' }} />
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '1rem 0' }}>
                      O ingresá manualmente: <code style={{ background: '#000', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>{twoFactorSetup.secret}</code>
                    </p>
                    <form onSubmit={handleEnable2FA} style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Código 6 dígitos"
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        style={{ width: 160, textAlign: 'center', letterSpacing: '0.3em', background: 'var(--color-bg-dark)', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', padding: '0.75rem', borderRadius: '6px' }}
                      />
                      <button type="submit" className="btn-primary" disabled={twoFactorCode.length < 6}>
                        <Key size={18} /> Activar
                      </button>
                    </form>
                  </div>
                )}

                {twoFactorEnabled && (
                  <div style={{ marginTop: '1rem' }}>
                    <form onSubmit={handleDisable2FA} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>Ingresá tu contraseña para deshabilitar</label>
                        <input
                          type="password"
                          placeholder="Contraseña actual"
                          value={twoFactorPassword}
                          onChange={(e) => setTwoFactorPassword(e.target.value)}
                          style={{ width: '100%', background: 'var(--color-bg-dark)', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', padding: '0.75rem', borderRadius: '6px' }}
                        />
                      </div>
                      <button type="submit" className="btn-secondary" style={{ borderColor: 'var(--color-error)', color: '#FF7F7F', whiteSpace: 'nowrap' }}>
                        Desactivar 2FA
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- MODALS --- */}

      {/* Modal 1: Product Modal CRUD */}
      {productModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-bg-surface border border-border rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-premium">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2>{productModal.mode === 'create' ? 'Agregar Producto' : 'Editar Producto'}</h2>
              <button className="text-text-muted hover:text-text-main transition-colors" onClick={() => setProductModal({ open: false, mode: 'create', data: null })}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleProductSubmit} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Nombre del Producto *</label>
                <input 
                  type="text" 
                  name="name" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  required 
                  defaultValue={productModal.data?.name || ''} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Slug de URL (Único) *</label>
                <input 
                  type="text" 
                  name="slug" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  required 
                  placeholder="ej: senal-pare"
                  defaultValue={productModal.data?.slug || ''} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Categoría *</label>
                <select name="category" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none" required defaultValue={productModal.data?.category || 'Reglamentarias'}>
                  <option value="Reglamentarias">Reglamentarias</option>
                  <option value="Preventivas">Preventivas</option>
                  <option value="Informativas">Informativas</option>
                  <option value="Cartelería Comercial">Cartelería Comercial</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Precio Unitario (ARS)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  name="price" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="Dejar vacío para 'Cotizar'"
                  defaultValue={productModal.data?.price || ''} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Descripción General *</label>
                <textarea 
                  name="description" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y min-h-[100px]" 
                  required 
                  defaultValue={productModal.data?.description || ''}
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Especificaciones Técnicas (Un valor por línea)</label>
                <textarea 
                  name="specs" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y min-h-[100px]" 
                  placeholder="ej:&#10;Material: Aluminio&#10;Reflectivo: Grado Ingeniería"
                  defaultValue={productModal.data?.specs || ''}
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Visibilidad catálogo</label>
                <select name="active" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none" defaultValue={productModal.data ? String(productModal.data.active) : 'true'}>
                  <option value="true">Activo / Visible</option>
                  <option value="false">Oculto / Pausado</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-border">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setProductModal({ open: false, mode: 'create', data: null })}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Project Modal CRUD */}
      {projectModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-bg-surface border border-border rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-premium">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2>{projectModal.mode === 'create' ? 'Agregar Proyecto' : 'Editar Proyecto'}</h2>
              <button className="text-text-muted hover:text-text-main transition-colors" onClick={() => setProjectModal({ open: false, mode: 'create', data: null })}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleProjectSubmit} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Título del Proyecto *</label>
                <input 
                  type="text" 
                  name="title" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  required 
                  defaultValue={projectModal.data?.title || ''} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Slug de URL (Único) *</label>
                <input 
                  type="text" 
                  name="slug" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  required 
                  placeholder="ej: senalizacion-autopista"
                  defaultValue={projectModal.data?.slug || ''} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Cliente (Empresa/Municipio) *</label>
                <input 
                  type="text" 
                  name="client" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  required 
                  defaultValue={projectModal.data?.client || ''} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Ubicación (Provincia/Ciudad) *</label>
                <input 
                  type="text" 
                  name="location" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  required 
                  placeholder="ej: Santa Fe, Argentina"
                  defaultValue={projectModal.data?.location || ''} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Descripción de los trabajos *</label>
                <textarea 
                  name="description" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y min-h-[100px]" 
                  required 
                  defaultValue={projectModal.data?.description || ''}
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Testimonio del Cliente</label>
                <textarea 
                  name="testimonial" 
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y min-h-[100px]" 
                  defaultValue={projectModal.data?.testimonial || ''}
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-muted">Estado</label>
                <select name="active" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none" defaultValue={projectModal.data ? String(projectModal.data.active) : 'true'}>
                  <option value="true">Activo / Visible</option>
                  <option value="false">Oculto / Pausado</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-border">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setProjectModal({ open: false, mode: 'create', data: null })}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: View Contact Message Details */}
      {contactViewModal.open && contactViewModal.data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-bg-surface border border-border rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-premium">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2>Detalles de Consulta</h2>
              <button className="text-text-muted hover:text-text-main transition-colors" onClick={() => setContactViewModal({ open: false, data: null })}>
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Fecha de Recepción</span>
                <span style={{ fontSize: '0.95rem' }}>{new Date(contactViewModal.data.createdAt).toLocaleString('es-AR')}</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Remitente</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> {contactViewModal.data.name}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Municipio / Empresa</span>
                  <span style={{ fontSize: '0.95rem' }}>{contactViewModal.data.company || 'Particular / No especifica'}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Correo Electrónico</span>
                  <a href={`mailto:${contactViewModal.data.email}`} style={{ fontSize: '0.95rem', color: 'var(--color-primary)', textDecoration: 'underline' }}>{contactViewModal.data.email}</a>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Teléfono</span>
                  <span style={{ fontSize: '0.95rem' }}>{contactViewModal.data.phone || 'No especifica'}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>Mensaje</span>
                <p style={{ backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '1.25rem', fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                  {contactViewModal.data.message}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-border">
                <button 
                  className="btn-secondary" 
                  style={{ color: '#FF7F7F', borderColor: '#FF5A5A33', marginRight: 'auto' }}
                  onClick={() => handleDeleteContact(contactViewModal.data.id)}
                >
                  <Trash2 size={16} /> Eliminar Consulta
                </button>
                
                {!contactViewModal.data.read && (
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      handleMarkContactRead(contactViewModal.data.id);
                    }}
                  >
                    <Check size={16} /> Marcar como Leído
                  </button>
                )}
                
                <button 
                  className="btn-secondary"
                  onClick={() => setContactViewModal({ open: false, data: null })}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
