import { useEffect } from 'react';
import useStaticDataStore from '../stores/staticDataStore';

const useLoadLights = (selectedGroup, setCachedLights, setLightsLoading) => {
    const { setErrorModal } = useStaticDataStore()

    useEffect(() => {
        const fetchLights = async () => {
            if (!selectedGroup) return;

            const groupID = selectedGroup.id;
            const type = selectedGroup.type;

            const res = await window.huemidi.fetchLights(groupID, type);

            if (res.error) {
                console.error(res.error);
                setErrorModal();
                return;
            }

            setCachedLights(res.data);

            // Make loading screen last longer in order to avoid flickering.
            setTimeout(() => {
                setLightsLoading(false);
            }, 300);
        };

        fetchLights();
    }, [selectedGroup, setCachedLights, setLightsLoading, setErrorModal]);
};

export default useLoadLights;
