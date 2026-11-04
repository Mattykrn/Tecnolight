import React, { createContext, useContext } from "react";

const SolicitudModalContext = createContext({
  openSolicitudModal: () => {},
  closeSolicitudModal: () => {}
});

export const useSolicitudModal = () => useContext(SolicitudModalContext);

export const EMAIL_INSTITUCIONAL = "tecnolight@tecnolightsrl.com";
export const EMAIL_VENTAS = "ventas@tecnolightsrl.com";

export function SolicitudModalProvider({ children }) {
  const openSolicitudModal = () => {};
  const closeSolicitudModal = () => {};

  return (
    <SolicitudModalContext.Provider value={{ openSolicitudModal, closeSolicitudModal }}>
      {children}
    </SolicitudModalContext.Provider>
  );
}
