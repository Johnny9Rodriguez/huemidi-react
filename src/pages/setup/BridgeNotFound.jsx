import React from 'react';
import SetupState from '../../constants/setupStates';
import { IoMdWarning } from 'react-icons/io';

function BridgeNotFound({ setSetupState }) {
    const handleClick = () => {
        window.huemidi.setup.discoverBridge();
        setSetupState(SetupState.LOADING);
    };

    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <div className='w-full flex p-2 pr-3 gap-2 items-center'>
                <img
                    src='./images/bridge-256.png'
                    alt='bridge'
                    className='w-20 h-20 opacity-25'
                    style={{ filter: 'grayscale(100%)' }}
                />
                <div>
                    <div className='flex gap-2 items-center'>
                        <IoMdWarning className='text-red-500' />
                        <div>No bridge found.</div>
                    </div>
                    <div className='text-sm text-gray-400'>
                        Please check your connection and try again.
                    </div>
                </div>
            </div>
            <button
                className='w-24 py-0.5 bg-gray-900 border border-gray-700 hover:bg-gray-700'
                onClick={handleClick}
            >
                Retry
            </button>
        </div>
    );
}

export default BridgeNotFound;
