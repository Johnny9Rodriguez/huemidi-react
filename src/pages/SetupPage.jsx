import React, { useEffect, useState } from 'react';
import SetupState from '../constants/setupStates';
import SearchBridge from './setup/SearchBridge';
import BridgeNotFound from './setup/BridgeNotFound';
import BridgeFound from './setup/BridgeFound';
import BridgeConnect from './setup/BridgeConnect';
import BridgeLinked from './setup/BridgeLinked';

function SetupPage() {
    const [setupState, setSetupState] = useState(SetupState.LOADING);
    const [bridge, setBridge] = useState('');
    const [linkErrorFlag, setLinkErrorFlag] = useState(false);

    useEffect(() => {
        window.huemidi.setup.onBridgeNotFound(() => {
            setSetupState(SetupState.BRIDGE_NOT_FOUND);
        });

        window.huemidi.setup.onBridgeFound((data) => {
            setBridge(data.bridge);
            setSetupState(SetupState.BRIDGE_FOUND);
        });

        window.huemidi.setup.onBridgeLinked(() => {
            setSetupState(SetupState.BRIDGE_LINKED);
        });
    }, []);

    return (
        <main className='flex-grow overflow-hidden'>
            {setupState === SetupState.LOADING && <SearchBridge />}
            {setupState === SetupState.BRIDGE_NOT_FOUND && (
                <BridgeNotFound setSetupState={setSetupState} />
            )}
            {setupState === SetupState.BRIDGE_FOUND && (
                <BridgeFound
                    bridge={bridge}
                    setSetupState={setSetupState}
                    linkErrorFlag={linkErrorFlag}
                />
            )}
            {setupState === SetupState.CONNECTING && (
                <BridgeConnect
                    setSetupState={setSetupState}
                    setLinkErrorFlag={setLinkErrorFlag}
                />
            )}
            {setupState === SetupState.BRIDGE_LINKED && <BridgeLinked />}
        </main>
    );
}

export default SetupPage;
