export const WA_NUMBER = '543424278117';

export const getWaLink = (text = 'Hola Tecnolight, me interesa solicitar un presupuesto para mi obra.') => {
  return `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(text)}`;
};
