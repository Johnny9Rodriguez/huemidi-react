import React from 'react';

function BridgeCard({ bridgeData, setShowModal }) {
    const handleClick = () => {
        setShowModal(true);
    };

    return (
        <div className='flex gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 p-2 justify-between'>
            <div className='flex gap-2'>
                <img
                    className='w-16 h-16'
                    src='./images/bridge-256.png'
                    alt='bridge'
                />
                <div className='self-center'>
                    <div>{bridgeData.name}</div>
                    <div className='text-sm text-gray-400'>{bridgeData.ip}</div>
                </div>
            </div>
            <button
                className='h-fit p-2 self-center text-gray-400 hover:text-red-500'
                onClick={handleClick}
            >
                Forget Device
            </button>
        </div>
    );
}

export default BridgeCard;
