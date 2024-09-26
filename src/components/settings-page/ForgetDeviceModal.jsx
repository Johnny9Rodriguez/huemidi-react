import React, { useRef } from 'react';
import { IoMdWarning } from 'react-icons/io';
import useOnClickOutside from '../../hooks/useCloseOnClickOutside.js';

function ForgetDeviceModal({ setShowModal }) {
    const modalRef = useRef(null);

    useOnClickOutside(modalRef, () => {
        setShowModal(false);
    });

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleForget = () => {
        window.huemidi.settings.forgetBridge();
    };

    const btnClasses = 'w-20 h-6 max-w-full py-0.5';

    return (
        <div className='absolute h-full w-full flex justify-center bg-black/50 z-40 overflow-hidden'>
            <div
                className='h-fit p-4 mt-20 min-w-64 max-w-80 flex flex-col justify-center gap-4 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700'
                ref={modalRef}
            >
                <div className='flex gap-2 items-center'>
                    <IoMdWarning className='text-red-500' />{' '}
                    <div>Forget Device</div>
                </div>
                <div className='text-sm text-gray-400'>
                    This will forget the current connected Hue Bridge and open
                    the bridge discovery setup again.
                </div>
                <div className='w-full flex items-center justify-center gap-4 text-sm text-gray-200'>
                    <button
                        className={`${btnClasses} bg-gray-900 border border-gray-700 hover:bg-gray-700`}
                        onClick={handleCancel}
                    >
                        cancel
                    </button>
                    <button
                        className={`${btnClasses} bg-red-950 border border-red-800 hover:bg-red-800`}
                        onClick={handleForget}
                    >
                        forget
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgetDeviceModal;
