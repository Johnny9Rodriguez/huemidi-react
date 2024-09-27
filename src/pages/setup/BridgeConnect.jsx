import React, { useState, useEffect } from 'react';
import SetupState from '../../constants/setupStates';

function BridgeConnect({ setSetupState, setLinkErrorFlag }) {
    const [percentage, setPercentage] = useState(100);

    useEffect(() => {
        window.huemidi.setup.linkBridge(true);
        
        const timer = setInterval(() => {
            setPercentage((prev) => Math.max(prev - 10 / 30, 0));
        }, 100);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (percentage <= 0) {
            window.huemidi.setup.linkBridge(false);
            setLinkErrorFlag(true);
            setSetupState(SetupState.BRIDGE_FOUND);
        }
    }, [percentage, setLinkErrorFlag, setSetupState]);

    const handleClick = () => {
        window.huemidi.setup.linkBridge(false);
        setLinkErrorFlag(false);
        setSetupState(SetupState.BRIDGE_FOUND);
    };

    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <div className='w-full flex p-2 pr-3 gap-2 items-center'>
                <img
                    src='./images/bridge-256.png'
                    alt='bridge'
                    className='w-20 h-20'
                    draggable='false'
                />
                <div className='flex flex-col gap-2'>
                    <div className='w-full bg-gray-700 h-1 relative'>
                        <div
                            className='bg-gray-200 h-1 absolute top-0 left-0'
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    <div className='text-sm text-gray-400'>
                        Please press the link button on the Hue Bridge.
                    </div>
                </div>
            </div>
            <button
                className='w-24 py-0.5 bg-gray-900 border border-gray-700 hover:bg-gray-700'
                onClick={handleClick}
            >
                Cancel
            </button>
        </div>
    );
}

export default BridgeConnect;
