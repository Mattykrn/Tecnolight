export const WA_NUMBER = '5493424278117';

export const getWaLink = (text = 'Hola, me comunico desde el sitio web de Tecno Light para solicitar un presupuesto.') => {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
};
