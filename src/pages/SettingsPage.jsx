import React, { useEffect, useState } from 'react';
import LoadingScreen from '../components/shared/LoadingScreen.jsx';
import BridgeCard from '../components/settings-page/BridgeCard.jsx';
import GroupCard from '../components/settings-page/GroupCard.jsx';
import FooterInfo from '../components/settings-page/FooterInfo.jsx';
import ForgetDeviceModal from '../components/settings-page/ForgetDeviceModal.jsx';

function SettingsPage() {
    const [bridgeData, setBridgeData] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    return (
        <div className='relative h-full flex flex-col gap-2 bg-gradient-to-b from-gray-800 to-gray-950 p-2'>
            <BridgeCard bridgeData={bridgeData} setShowModal={setShowModal} />
            <GroupCard />
            <FooterInfo />
            {showModal && <ForgetDeviceModal setShowModal={setShowModal} />}
        </div>
    );
}

export default SettingsPage;
