import { createContext } from 'react';
import { ModalProvider, useModal as rmhUseModal } from 'react-modal-hook';

export const ModalContext = createContext({ closeModal: () => {} });

export const ModalHookProvider = ({ children }) => (
  <ModalProvider>{children}</ModalProvider>
);

export function useModal(modal, deps) {
  const [openModal, closeModal] = rmhUseModal(() => {
    const { type: ModalComponent, props, key } = modal;
    return (
      <ModalContext.Provider value={{ closeModal }}>
        <ModalComponent key={key} {...props} />
      </ModalContext.Provider>
    );
  }, deps);

  return [openModal, closeModal];
}
