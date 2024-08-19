import React from 'react';
import useStaticDataStore from '../../stores/staticDataStore';
import { IoMdWarning } from 'react-icons/io';

function ErrorModal() {
    const { closeModal } = useStaticDataStore();

    const btnClasses = 'w-20 h-6 max-w-full py-0.5';

    return (
        <div className='w-96 flex flex-col gap-4'>
            <div className='flex gap-2 justify-center items-start text-sm'>
                <IoMdWarning className='flex-shrink-0 text-xl text-red-500' />
                <div className='text-gray-400'>
                An error occurred. Please reload the app and try again. If the error 
                persists, check your network connection to the bridge and try again.
                </div>
            </div>
            <div className='w-full flex items-center justify-center gap-4 text-sm text-gray-200'>
                <button
                    className={`${btnClasses} bg-gray-700 hover:bg-gray-500`}
                    onClick={closeModal}
                >
                    ok
                </button>
            </div>
        </div>
    );
}

export default ErrorModal;
