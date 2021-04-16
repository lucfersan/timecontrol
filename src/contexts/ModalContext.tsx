import { createContext, ReactNode, useCallback, useState } from 'react';

import Modal from '../components/Modal';

interface ModalProps {
  children: ReactNode;
}

interface ModalContextData {
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData,
);

export function ModalProvider({ children }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}

      {isModalOpen && <Modal />}
    </ModalContext.Provider>
  );
}
