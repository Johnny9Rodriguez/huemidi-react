import { useEffect } from 'react';
import useStaticDataStore from '../stores/staticDataStore';

const useLoadLights = (selectedGroup, setCachedLights, setLightsLoading, prefLoading) => {
    const { setErrorModal } = useStaticDataStore();

    useEffect(() => {
        const fetchLights = async () => {
            if (!selectedGroup) return;

            const groupID = selectedGroup.id;
            const type = selectedGroup.type;

            try {
                const res = await window.huemidi.static.fetchLights(
                    groupID,
                    type
                );

                if (res.error) {
                    console.error(res.error);
                    return;
                }

                setCachedLights(res.data);

                // Make loading screen last longer in order to avoid flickering.
                setTimeout(() => {
                    setLightsLoading(false);
                }, 300);
            } catch (error) {
                console.error(error);
            }
        };

        if (!prefLoading) fetchLights();
    }, [selectedGroup, setCachedLights, setLightsLoading, setErrorModal, prefLoading]);
};

export default useLoadLights;
