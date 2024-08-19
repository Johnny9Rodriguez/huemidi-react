import React, { useState, useRef, cloneElement, useEffect } from 'react';
import useStaticDataStore from '../../stores/staticDataStore';
import useOnClickOutside from '../../hooks/useCloseOnClickOutside';
import { IoMdWarning } from 'react-icons/io';

function Modal({ children }) {
    const { closeModal } = useStaticDataStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ flag: false, message: '' });
    const modalRef = useRef(null);

    useOnClickOutside(modalRef, () => {
        if (isLoading) return;
        closeModal();
    });

    // Hide error message after approx. 3 seconds.
    useEffect(() => {
        if (error.flag) {
            const timer = setTimeout(() => {
                setError((prevError) => ({ ...prevError, flag: false }));
            }, 3333);
    
            return () => clearTimeout(timer);
        }
    }, [error.flag]);

    return (
        <div className='flex flex-col items-end'>
            <div
                className='p-4 mt-20 w-64 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700'
                ref={modalRef}
            >
                {React.Children.map(children, (child) =>
                    cloneElement(child, { isLoading, setIsLoading, setError })
                )}
            </div>
            <div
                className={`w-max px-2 pb-0.5 pt-1 -z-10 flex items-center gap-1 -translate-y-8 text-red-700 bg-gray-950 text-sm border border-t-0 border-gray-700 ${
                    error.flag && 'mt-8'
                }`}
                style={{
                    transition: 'margin-top 0.2s ease',
                }}
            >
                <IoMdWarning className='text-lg' />
                <div>{error.message}</div>
            </div>
        </div>
    );
}

export default Modal;
