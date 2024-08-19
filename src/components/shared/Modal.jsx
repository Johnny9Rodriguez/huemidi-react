import React, { useState, useRef, cloneElement } from 'react';
import useStaticDataStore from '../../stores/staticDataStore';
import useOnClickOutside from '../../hooks/useCloseOnClickOutside';

function Modal({ children }) {
    const { closeModal } = useStaticDataStore();
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef(null);

    useOnClickOutside(modalRef, () => {
        if (isLoading) return;
        closeModal();
    });

    return (
        <div
            className='p-4 mt-20 mb-auto w-52 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700'
            ref={modalRef}
        >
            {React.Children.map(children, (child) =>
                cloneElement(child, { isLoading, setIsLoading })
            )}
        </div>
    );
}

export default Modal;
