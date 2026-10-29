export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método no permitido. Use POST.' });
  }

  try {
    const { name, company, phone, email, subject, message } = req.body || {};

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Nombre, teléfono y mensaje son obligatorios.'
      });
    }

    const timestamp = new Date().toISOString();
    console.log(`[SOLICITUD RECIBIDA ${timestamp}]`, {
      name,
      company: company || 'No especificada',
      phone,
      email: email || 'No especificado',
      subject: subject || 'Sin asunto',
      message
    });

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Solicitud recibida con éxito en Tecno Light S.R.L.',
      data: {
        receivedAt: timestamp,
        recipient: 'tecnolightsrl@tecnolightsrl.com'
      }
    });
  } catch (error) {
    console.error('Error al procesar solicitud:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno al procesar la solicitud.'
    });
  }
}
