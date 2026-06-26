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
import styles from '../../styles/Dashboard.module.css';

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
    <div className={styles.dashboardContainer}>
      <Head>
        <title>Panel de Administración | Tecnolight</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.brand}>TECNOLIGHT</span>
          <span className={styles.brandSubtitle}>Administración</span>
        </div>

        {user && (
          <div className={styles.userProfile}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userRole}>Nivel: {user.role}</span>
          </div>
        )}

        <nav className={styles.nav}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'contacts' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <Mail size={18} /> Consultas ({contacts.filter(c => !c.read).length})
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'products' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={18} /> Productos ({products.length})
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Compass size={18} /> Proyectos ({projects.length})
          </button>
          
          <button 
            className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Shield size={18} /> Seguridad
          </button>

          <button 
            className={`${styles.tabBtn} ${styles.logoutBtn}`}
            onClick={handleLogout}
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </nav>
      </aside>

      {/* Main Panel Content */}
      <main className={styles.mainPanel}>
        {error && (
          <div style={{ backgroundColor: 'var(--color-error-bg)', border: '1px solid var(--color-error)', color: '#FF7F7F', padding: '1rem', borderRadius: '6px', marginBottom: '2rem' }}>
            {error}
          </div>
        )}

        {/* Tab 1: Contacts Management */}
        {activeTab === 'contacts' && (
          <div>
            <div className={styles.panelHeader}>
              <h1>Consultas Recibidas</h1>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Remitente</th>
                    <th>Email</th>
                    <th>Mensaje</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} style={{ opacity: contact.read ? 0.75 : 1 }}>
                      <td>{new Date(contact.createdAt).toLocaleDateString('es-AR')}</td>
                      <td style={{ fontWeight: contact.read ? 500 : 700 }}>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>
                        <div className={styles.contactMessageBlock}>{contact.message}</div>
                      </td>
                      <td>
                        <span className={`${styles.badge} ${contact.read ? styles.badgeSuccess : styles.badgeWarn}`}>
                          {contact.read ? 'Leído' : 'Pendiente'}
                        </span>
                      </td>
                      <td className={styles.actionsCell}>
                        <button 
                          className={styles.actionIconBtn} 
                          title="Ver Mensaje"
                          onClick={() => setContactViewModal({ open: true, data: contact })}
                        >
                          <Eye size={18} />
                        </button>
                        {!contact.read && (
                          <button 
                            className={styles.actionIconBtn} 
                            title="Marcar Leído"
                            onClick={() => handleMarkContactRead(contact.id)}
                          >
                            <Check size={18} color="var(--color-success)" />
                          </button>
                        )}
                        <button 
                          className={`${styles.actionIconBtn} ${styles.actionIconBtnDelete}`}
                          title="Eliminar"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <Trash2 size={18} />
                        </button>
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
            <div className={styles.panelHeader}>
              <h1>Base de Productos</h1>
              <button 
                className="btn-primary" 
                style={{ padding: '0.65rem 1.25rem' }}
                onClick={() => setProductModal({ open: true, mode: 'create', data: null })}
              >
                <Plus size={18} /> Agregar Producto
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td style={{ fontWeight: 600 }}>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price ? `$${product.price.toLocaleString('es-AR')}` : 'Cotizar'}</td>
                      <td>
                        <span className={`${styles.badge} ${product.active ? styles.badgeSuccess : styles.badgeWarn}`}>
                          {product.active ? 'Activo' : 'Pausado'}
                        </span>
                      </td>
                      <td className={styles.actionsCell}>
                        <button 
                          className={styles.actionIconBtn} 
                          title="Editar"
                          onClick={() => setProductModal({ open: true, mode: 'edit', data: product })}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className={`${styles.actionIconBtn} ${styles.actionIconBtnDelete}`}
                          title="Eliminar"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 size={18} />
                        </button>
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
            <div className={styles.panelHeader}>
              <h1>Gestión de Proyectos</h1>
              <button 
                className="btn-primary" 
                style={{ padding: '0.65rem 1.25rem' }}
                onClick={() => setProjectModal({ open: true, mode: 'create', data: null })}
              >
                <Plus size={18} /> Agregar Proyecto
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th>Cliente</th>
                    <th>Ubicación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td style={{ fontWeight: 600 }}>{project.title}</td>
                      <td>{project.client}</td>
                      <td>{project.location}</td>
                      <td>
                        <span className={`${styles.badge} ${project.active ? styles.badgeSuccess : styles.badgeWarn}`}>
                          {project.active ? 'Activo' : 'Pausado'}
                        </span>
                      </td>
                      <td className={styles.actionsCell}>
                        <button 
                          className={styles.actionIconBtn} 
                          title="Editar"
                          onClick={() => setProjectModal({ open: true, mode: 'edit', data: project })}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className={`${styles.actionIconBtn} ${styles.actionIconBtnDelete}`}
                          title="Eliminar"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 size={18} />
                        </button>
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
            <div className={styles.panelHeader}>
              <h1>Configuración de Seguridad</h1>
            </div>

            <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* 2FA Section */}
              <div className={styles.card}>
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
                  <span className={`${styles.badge} ${twoFactorEnabled ? styles.badgeSuccess : styles.badgeWarn}`}>
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
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{productModal.mode === 'create' ? 'Agregar Producto' : 'Editar Producto'}</h2>
              <button onClick={() => setProductModal({ open: false, mode: 'create', data: null })}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleProductSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Nombre del Producto *</label>
                <input 
                  type="text" 
                  name="name" 
                  className={styles.input} 
                  required 
                  defaultValue={productModal.data?.name || ''} 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Slug de URL (Único) *</label>
                <input 
                  type="text" 
                  name="slug" 
                  className={styles.input} 
                  required 
                  placeholder="ej: senal-pare"
                  defaultValue={productModal.data?.slug || ''} 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Categoría *</label>
                <select name="category" className={styles.select} required defaultValue={productModal.data?.category || 'Reglamentarias'}>
                  <option value="Reglamentarias">Reglamentarias</option>
                  <option value="Preventivas">Preventivas</option>
                  <option value="Informativas">Informativas</option>
                  <option value="Cartelería Comercial">Cartelería Comercial</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Precio Unitario (ARS)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  name="price" 
                  className={styles.input} 
                  placeholder="Dejar vacío para 'Cotizar'"
                  defaultValue={productModal.data?.price || ''} 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Descripción General *</label>
                <textarea 
                  name="description" 
                  className={styles.textarea} 
                  required 
                  defaultValue={productModal.data?.description || ''}
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label>Especificaciones Técnicas (Un valor por línea)</label>
                <textarea 
                  name="specs" 
                  className={styles.textarea} 
                  placeholder="ej:&#10;Material: Aluminio&#10;Reflectivo: Grado Ingeniería"
                  defaultValue={productModal.data?.specs || ''}
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label>Visibilidad catálogo</label>
                <select name="active" className={styles.select} defaultValue={productModal.data ? String(productModal.data.active) : 'true'}>
                  <option value="true">Activo / Visible</option>
                  <option value="false">Oculto / Pausado</option>
                </select>
              </div>

              <div className={styles.modalFormActions}>
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
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{projectModal.mode === 'create' ? 'Agregar Proyecto' : 'Editar Proyecto'}</h2>
              <button onClick={() => setProjectModal({ open: false, mode: 'create', data: null })}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleProjectSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Título del Proyecto *</label>
                <input 
                  type="text" 
                  name="title" 
                  className={styles.input} 
                  required 
                  defaultValue={projectModal.data?.title || ''} 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Slug de URL (Único) *</label>
                <input 
                  type="text" 
                  name="slug" 
                  className={styles.input} 
                  required 
                  placeholder="ej: senalizacion-autopista"
                  defaultValue={projectModal.data?.slug || ''} 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Cliente (Empresa/Municipio) *</label>
                <input 
                  type="text" 
                  name="client" 
                  className={styles.input} 
                  required 
                  defaultValue={projectModal.data?.client || ''} 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Ubicación (Provincia/Ciudad) *</label>
                <input 
                  type="text" 
                  name="location" 
                  className={styles.input} 
                  required 
                  placeholder="ej: Santa Fe, Argentina"
                  defaultValue={projectModal.data?.location || ''} 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Descripción de los trabajos *</label>
                <textarea 
                  name="description" 
                  className={styles.textarea} 
                  required 
                  defaultValue={projectModal.data?.description || ''}
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label>Testimonio del Cliente</label>
                <textarea 
                  name="testimonial" 
                  className={styles.textarea} 
                  defaultValue={projectModal.data?.testimonial || ''}
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label>Estado</label>
                <select name="active" className={styles.select} defaultValue={projectModal.data ? String(projectModal.data.active) : 'true'}>
                  <option value="true">Activo / Visible</option>
                  <option value="false">Oculto / Pausado</option>
                </select>
              </div>

              <div className={styles.modalFormActions}>
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
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Detalles de Consulta</h2>
              <button onClick={() => setContactViewModal({ open: false, data: null })}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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

              <div className={styles.modalFormActions} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                <button 
                  className={`${styles.actionIconBtn} btn-secondary`} 
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
