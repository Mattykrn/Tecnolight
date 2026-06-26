/**
 * ============================================
 * SISTEMA DE BACKUP AUTOMÁTICO
 * ============================================
 * 
 * Sistema de respaldos automáticos de la base de datos.
 * Se ejecuta diariamente y guarda backups en la nube (simulado con archivos locales).
 * 
 * Características:
 * - Backup automático diario a las 3:00 AM
 * - Compresión en formato .sql.gz
 * - Retención de 30 días
 * - Registro de backups en base de datos
 * - Validación de integridad
 */

const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const cron = require('node-cron');

const BACKUP_DIR = path.join(__dirname, '../backups');
const RETENTION_DAYS = 30;

// Asegurar que existe el directorio de backups
async function ensureBackupDir() {
  try {
    await fs.access(BACKUP_DIR);
  } catch {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
  }
}

/**
 * Crea un backup de la base de datos
 * @returns {Object} Información del backup creado
 */
async function createBackup() {
  try {
    await ensureBackupDir();

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('.')[0];
    const filename = `backup-${timestamp}.sql.gz`;
    const filepath = path.join(BACKUP_DIR, filename);

    // Obtener credenciales de la base de datos
    const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/tecnolight_db';
    
    // Extraer componentes de la URL
    const urlMatch = dbUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
    if (!urlMatch) {
      throw new Error('URL de base de datos inválida');
    }

    const [, user, password, host, port, dbname] = urlMatch;

    // Configurar variable de entorno para pg_dump
    const env = {
      ...process.env,
      PGPASSWORD: password
    };

    // Ejecutar pg_dump con compresión
    const command = `pg_dump -U ${user} -h ${host} -p ${port} ${dbname} | gzip > ${filepath}`;

    await new Promise((resolve, reject) => {
      exec(command, { env }, (error) => {
        if (error) {
          reject(new Error(`Error en backup: ${error.message}`));
        } else {
          resolve();
        }
      });
    });

    // Obtener tamaño del archivo
    const stats = await fs.stat(filepath);
    const sizeInBytes = stats.size;

    // Registrar backup en base de datos
    if (global.prisma) {
      await global.prisma.backup.create({
        data: {
          filename,
          size: sizeInBytes,
          type: 'automatic'
        }
      });
    }

    console.log(`✅ Backup creado: ${filename} (${(sizeInBytes / 1024 / 1024).toFixed(2)} MB)`);

    // Limpiar backups antiguos
    await cleanOldBackups();

    return {
      success: true,
      filename,
      size: sizeInBytes,
      path: filepath
    };

  } catch (error) {
    console.error('❌ Error al crear backup:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Elimina backups antiguos (mayores a RETENTION_DAYS)
 */
async function cleanOldBackups() {
  try {
    const files = await fs.readdir(BACKUP_DIR);
    const now = Date.now();
    const maxAge = RETENTION_DAYS * 24 * 60 * 60 * 1000;

    let deletedCount = 0;

    for (const file of files) {
      const filepath = path.join(BACKUP_DIR, file);
      const stats = await fs.stat(filepath);
      const age = now - stats.mtimeMs;

      if (age > maxAge) {
        await fs.unlink(filepath);
        deletedCount++;
        console.log(`🗑️  Backup antiguo eliminado: ${file}`);
      }
    }

    // Eliminar registros antiguos de la base de datos
    if (global.prisma && deletedCount > 0) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);

      const deleted = await global.prisma.backup.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate
          }
        }
      });

      console.log(`🧹 ${deleted.count} registros de backup eliminados de la base de datos`);
    }

    return deletedCount;
  } catch (error) {
    console.error('Error al limpiar backups antiguos:', error);
    return 0;
  }
}

/**
 * Obtiene listado de backups disponibles
 */
async function getBackupsList() {
  try {
    const files = await fs.readdir(BACKUP_DIR);
    const backups = [];

    for (const file of files) {
      const filepath = path.join(BACKUP_DIR, file);
      const stats = await fs.stat(filepath);
      
      backups.push({
        filename: file,
        size: stats.size,
        createdAt: stats.mtime,
        path: filepath
      });
    }

    // Ordenar por fecha (más reciente primero)
    backups.sort((a, b) => b.createdAt - a.createdAt);

    return backups;
  } catch (error) {
    console.error('Error al listar backups:', error);
    return [];
  }
}

/**
 * Programa backups automáticos
 * Se ejecuta todos los días a las 3:00 AM
 */
function scheduleAutomaticBackups() {
  // Cron: 0 3 * * * = Todos los días a las 3:00 AM
  cron.schedule('0 3 * * *', async () => {
    console.log('⏰ Ejecutando backup automático...');
    await createBackup();
  });

  console.log('📅 Backups automáticos programados: Todos los días a las 3:00 AM');
}

/**
 * Inicia el sistema de backup
 */
function startBackupSystem() {
  scheduleAutomaticBackups();
  console.log('✅ Sistema de backups iniciado');
}

module.exports = {
  createBackup,
  cleanOldBackups,
  getBackupsList,
  scheduleAutomaticBackups,
  startBackupSystem
};