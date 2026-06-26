'use strict';

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/tecnolight_db?schema=public';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key-for-jest';
process.env.JWT_2FA_SECRET = process.env.JWT_2FA_SECRET || 'test-2fa-secret';
process.env.JWT_EXPIRES_IN = '1h';

jest.mock('otplib', () => ({
  authenticator: {
    generateSecret: jest.fn(() => 'BASE32SECRET1234567890'),
    keyuri: jest.fn((_user, _service, secret) => `otpauth://totp/${_service}:${_user}?secret=${secret}&issuer=${_service}`),
    verify: jest.fn(({ token, secret }) => token === '123456' && !!secret)
  }
}));

jest.mock('qrcode', () => ({
  toDataURL: jest.fn(() => Promise.resolve('data:image/png;base64,mocked'))
}));

const request = require('supertest');
const { PrismaClient } = require('@prisma/client');

function buildApp() {
  require('dotenv').config({ path: require('path').join(__dirname, '../../backend/.env') });

  const express       = require('express');
  const cors          = require('cors');
  const helmet        = require('helmet');
  const authRoutes    = require('../../backend/routes/auth');
  const productRoutes = require('../../backend/routes/products');
  const projectRoutes = require('../../backend/routes/projects');
  const contactRoutes = require('../../backend/routes/contact');
  const instagramRoutes = require('../../backend/routes/instagram');
  const uploadRoutes  = require('../../backend/routes/upload');

  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use('/api/auth',      authRoutes);
  app.use('/api/products',  productRoutes);
  app.use('/api/projects',  projectRoutes);
  app.use('/api/contact',   contactRoutes);
  app.use('/api/instagram', instagramRoutes);
  app.use('/api/upload',    uploadRoutes);

  app.get('/api/health', (_req, res) => res.json({ status: 'OK' }));
  app.use('*', (_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

  return app;
}

let app;
let adminToken = '';
const prisma = new PrismaClient();

beforeAll(async () => {
  app = buildApp();

  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@tecnolight.com.ar', password: 'admin123' });

  if (res.status === 200 && res.body.token) {
    adminToken = res.body.token;
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

// ── 1. HEALTH CHECK ──────────────────────
describe('Health Check', () => {
  test('GET /api/health → 200 OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});

// ── 2. AUTENTICACIÓN ─────────────────────
describe('Auth – POST /api/auth/login', () => {
  test('Login con credenciales válidas devuelve token JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@tecnolight.com.ar', password: 'admin123' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Login con contraseña incorrecta devuelve 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@tecnolight.com.ar', password: 'wrongpassword' });
    expect(res.status).toBe(401);
  });

  test('Login con email inválido devuelve 400/401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'no-es-un-email', password: '12345678' });
    expect([400, 401]).toContain(res.status);
  });

  test('Rutas protegidas sin token devuelven 401', async () => {
    const res = await request(app).get('/api/auth/profile');
    expect(res.status).toBe(401);
  });

  test('GET /api/auth/profile con token válido devuelve perfil', async () => {
    if (!adminToken) return;
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email');
  });
});

// ── 3. 2FA ───────────────────────────────
describe('Auth – 2FA endpoints', () => {
  test('GET /api/auth/2fa-status requiere auth', async () => {
    const res = await request(app).get('/api/auth/2fa-status');
    expect(res.status).toBe(401);
  });

  test('GET /api/auth/2fa-status con token admin devuelve estado', async () => {
    if (!adminToken) return;
    const res = await request(app)
      .get('/api/auth/2fa-status')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('enabled');
  });

  test('GET /api/auth/setup-2fa genera secreto y QR', async () => {
    if (!adminToken) return;
    const res = await request(app)
      .get('/api/auth/setup-2fa')
      .set('Authorization', `Bearer ${adminToken}`);
    // Puede fallar si 2FA ya está habilitado
    expect([200, 400]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('secret');
      expect(res.body).toHaveProperty('qrCode');
    }
  });

  test('POST /api/auth/verify-2fa sin tempToken devuelve 400', async () => {
    const res = await request(app)
      .post('/api/auth/verify-2fa')
      .send({ code: '123456' });
    expect(res.status).toBe(400);
  });
});

// ── 4. PRODUCTOS ─────────────────────────
describe('Products – GET (público)', () => {
  test('GET /api/products devuelve lista (200)', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  test('GET /api/products/categories devuelve categorías (200)', async () => {
    const res = await request(app).get('/api/products/categories');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('categories');
    expect(Array.isArray(res.body.categories)).toBe(true);
  });

  test('GET /api/products/:slug inválido devuelve 404', async () => {
    const res = await request(app).get('/api/products/producto-no-existe-xyz');
    expect(res.status).toBe(404);
  });
});

describe('Products – Admin CRUD', () => {
  let createdId = null;

  test('POST sin token devuelve 401', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Test', slug: 'test', category: 'Reglamentarias', description: 'Desc' });
    expect(res.status).toBe(401);
  });

  test('POST con token admin crea producto (201)', async () => {
    if (!adminToken) return;
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Señal Test Jest',
        slug: `test-jest-${Date.now()}`,
        category: 'Reglamentarias',
        description: 'Producto de prueba creado por Jest.',
        active: true,
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('product');
    createdId = res.body.product?.id;
  });

  test('PUT actualiza producto (200)', async () => {
    if (!adminToken || !createdId) return;
    const res = await request(app)
      .put(`/api/products/${createdId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Señal Test Jest (Actualizada)' });
    expect(res.status).toBe(200);
  });

  test('DELETE elimina producto (200)', async () => {
    if (!adminToken || !createdId) return;
    const res = await request(app)
      .delete(`/api/products/${createdId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
});

// ── 5. PROYECTOS ─────────────────────────
describe('Projects – GET (público)', () => {
  test('GET /api/projects devuelve lista (200)', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.projects)).toBe(true);
  });
});

// ── 6. CONTACTO ──────────────────────────
describe('Contact', () => {
  let createdContactId = null;

  test('POST con datos válidos crea contacto (201)', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Juan Test',
        email: 'juan.test@example.com',
        message: 'Mensaje de prueba enviado por Jest.',
        company: 'Municipalidad de Prueba',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('contact');
    expect(res.body.contact.name).toBe('Juan Test');
    createdContactId = res.body.contact?.id;
  });

  test('POST sin nombre devuelve 400', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ email: 'test@test.com', message: 'Sin nombre' });
    expect(res.status).toBe(400);
  });

  test('GET /api/contact sin token devuelve 401', async () => {
    const res = await request(app).get('/api/contact');
    expect(res.status).toBe(401);
  });

  test('GET /api/contact con token admin devuelve lista (200)', async () => {
    if (!adminToken) return;
    const res = await request(app)
      .get('/api/contact?read=all')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('contacts');
  });

  test('Cleanup: eliminar contacto de prueba', async () => {
    if (!adminToken || !createdContactId) return;
    const res = await request(app)
      .delete(`/api/contact/${createdContactId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
});

// ── 7. INSTAGRAM ─────────────────────────
describe('Instagram', () => {
  test('GET /api/instagram/posts devuelve lista (200)', async () => {
    const res = await request(app).get('/api/instagram/posts?limit=3');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/instagram/categories devuelve categorías (200)', async () => {
    const res = await request(app).get('/api/instagram/categories');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/instagram/posts filtra por categoría', async () => {
    const res = await request(app).get('/api/instagram/posts?category=Reglamentarias');
    expect(res.status).toBe(200);
    res.body.data.forEach(post => {
      expect(post.category.toLowerCase()).toBe('reglamentarias');
    });
  });
});

// ── 8. UPLOAD ────────────────────────────
describe('Upload', () => {
  test('POST /api/upload/products sin auth devuelve 401', async () => {
    const res = await request(app)
      .post('/api/upload/products');
    expect(res.status).toBe(401);
  });

  test('POST /api/upload/products con tipo inválido devuelve 400', async () => {
    if (!adminToken) return;
    const res = await request(app)
      .post('/api/upload/invalid')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(400);
  });
});

// ── 9. 404 ───────────────────────────────
describe('404 Handler', () => {
  test('Ruta inexistente devuelve 404', async () => {
    const res = await request(app).get('/api/ruta-que-no-existe');
    expect(res.status).toBe(404);
  });
});
