import { useEffect } from 'react';

const useLoadLights = (selectedGroup, setCachedLights, setLightsLoading) => {
    useEffect(() => {
        const fetchLights = async () => {
            if (!selectedGroup) return;

            const groupID = selectedGroup.id;
            const type = selectedGroup.type;

            const res = await window.huemidi.fetchLights(groupID, type);

            if (res.error) {
                console.error(res.error);
                // TODO: error flag
                return;
            }

            setCachedLights(res.data);

            // Make loading screen last longer in order to avoid flickering.
            setTimeout(() => {
                setLightsLoading(false);
            }, 300);
        };

        fetchLights();
    }, [selectedGroup, setCachedLights, setLightsLoading]);
};

export default useLoadLights;
