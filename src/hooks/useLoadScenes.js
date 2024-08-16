import { useEffect } from 'react';

const useLoadScenes = (selectedGroup, setCachedScenes, setScenesLoading) => {
    useEffect(() => {
        const fetchScenes = async () => {
            if (!selectedGroup) return;

            const groupID = selectedGroup.id;
            const res = await window.huemidi.fetchScenes(groupID);

            if (res.error) {
                console.error('res.error');
                // TODO: error flag
                return;
            }

            setCachedScenes(res.data);

            setTimeout(() => {
                setScenesLoading(false);
            }, 300);
        };

        fetchScenes();
    }, [selectedGroup, setCachedScenes, setScenesLoading]);
};

export default useLoadScenes;
