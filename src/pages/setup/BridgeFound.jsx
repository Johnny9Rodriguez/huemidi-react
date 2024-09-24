import React from 'react';
import SetupState from '../../constants/setupStates';
import { IoMdWarning } from 'react-icons/io';

function BridgeFound({ bridge, setSetupState, linkErrorFlag }) {
    const name = () => {
        const bName = bridge.packet.answers[0].name;
        const bType = '.' + bridge.fqdn;
        return bName.replace(bType, '');
    };

    const handleClick = () => {
        setSetupState(SetupState.CONNECTING);
    };

    return (
        <div className='relative h-full flex flex-col items-center justify-center'>
            <div className='w-full flex p-2 pr-3 gap-2 items-center'>
                <img
                    src='./images/bridge-256.png'
                    alt='bridge'
                    className='w-20 h-20'
                />
                <div className=''>
                    <div>{name()}</div>
                    <div className='text-sm text-gray-400'>
                        {bridge.address}
                    </div>
                </div>
            </div>
            <button
                className='w-24 py-0.5 bg-gray-900 border border-gray-700 hover:bg-gray-700'
                onClick={handleClick}
            >
                Connect
            </button>
            {linkErrorFlag && (
                <div className='absolute w-full bottom-0 left-0 p-1 flex items-center justify-center gap-1 text-red-500'>
                    <IoMdWarning />
                    <div className='text-sm'>
                        Error linking Hue Bridge. Please try again!
                    </div>
                </div>
            )}
        </div>
    );
}

export default BridgeFound;
