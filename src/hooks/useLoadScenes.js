import { useEffect } from 'react';
import useStaticDataStore from '../stores/staticDataStore';

const useLoadScenes = (selectedGroup, setCachedScenes, setScenesLoading, prefLoading) => {
    const { setErrorModal } = useStaticDataStore();

    useEffect(() => {
        const fetchScenes = async () => {
            if (!selectedGroup) return;
            if (selectedGroup.type === 'bridge_home') {
                setCachedScenes([]);

                setTimeout(() => {
                    setScenesLoading(false);
                }, 300);
            } else {
                try {
                    const groupID = selectedGroup.id;
                    const res = await window.huemidi.static.fetchScenes(
                        groupID
                    );

                    if (res.error) {
                        console.error('res.error');
                        return;
                    }

                    setCachedScenes(res.data);

                    setTimeout(() => {
                        setScenesLoading(false);
                    }, 300);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        if (!prefLoading) fetchScenes();
    }, [selectedGroup, setCachedScenes, setScenesLoading, setErrorModal, prefLoading]);
};

export default useLoadScenes;
