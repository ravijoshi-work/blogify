import React, { ReactNode } from "react";

type Propstype = {
  children: ReactNode;
  modalOpen: boolean;
  closeModal: () => void;
};

const Modal = ({ children, modalOpen, closeModal }: Propstype) => {
  return (
    <div>
      {modalOpen && (
        <div className="bg-black/50 fixed inset-0">
          <div className="flex justify-center items-center h-full">
            <div className="max-h-[90%] md:max-w-lg overflow-auto flex flex-col items-end bg-secondaryColor p-5">
              <button onClick={closeModal} className="text-2xl mb-3">
                &times;
              </button>

              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
