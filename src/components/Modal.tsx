import React, { useState } from 'react';




interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any

}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const modalClasses = isOpen
        ? 'fixed inset-0 flex items-center justify-center transition-opacity z-40 ease-in-out duration-300 opacity-100 w-full mx-auto'
        : 'fixed inset-0 flex items-center justify-center transition-opacity ease-in-out duration-300 opacity-0 pointer-events-none w-full mx-auto';

    return (
        <div className={modalClasses}>
            <div className="absolute inset-0 bg-black opacity-50 w-full " onClick={onClose}></div>
            <div className="bg-white p-8 rounded-md z-10 w-1/2">
                <button onClick={onClose} className="absolute top-4 right-4 text-black hover:text-gray-700 text-3xl">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
