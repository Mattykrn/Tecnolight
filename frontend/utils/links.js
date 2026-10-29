export function getGmailLink(email, subject = '') {
  const base = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
  return subject ? `${base}&su=${encodeURIComponent(subject)}` : base;
}

export function getMapsDirectionsLink(destination) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
