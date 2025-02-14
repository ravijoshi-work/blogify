"use client";
import Modal from "@/components/ui/Modal";
import { createContext, useContext, useState, ReactNode } from "react";

// Define a type for your modal context
type ModalContextType = {
  isOpen: boolean;
  modalContent: { view: ReactNode } | null;
  openModal: ({ view }: { view: ReactNode }) => void;
  closeModal: () => void;
};

export const modalContext = createContext<ModalContextType | undefined>(
  undefined
);

modalContext.displayName = "ModalContext";

// Custom hook to use the modal context
export const useModal = () => {
  const context = useContext(modalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// ModalProvider component
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  // State to track modal visibility and content
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    view: ReactNode;
  } | null>(null);

  // Function to open the modal and pass content
  const openModal = ({ view }: { view: ReactNode }) => {
    setModalContent({ view });
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null); // Clear the content when closing
  };

  return (
    <modalContext.Provider
      value={{ isOpen, modalContent, openModal, closeModal }}
    >
      {children}
      {/* Modal rendering */}
      <Modal modalOpen={isOpen} closeModal={closeModal}>
        {modalContent?.view}
      </Modal>
    </modalContext.Provider>
  );
};
