import React, { useEffect, useState } from 'react';
import LoadingScreen from '../components/shared/LoadingScreen.jsx';

function SettingsPage() {
    const [bridgeData, setBridgeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(async () => {
                const data = await window.huemidi.settings.fetchBridgeData();
                setBridgeData(data);
            }, 333);
        };
        fetchData();
    }, []);

    if (!bridgeData) return <LoadingScreen />;

    return <div>Settings</div>;
}

export default SettingsPage;
