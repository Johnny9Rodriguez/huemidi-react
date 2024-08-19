import { useEffect } from 'react';
import useStaticDataStore from '../stores/staticDataStore';

const useLoadScenes = (selectedGroup, setCachedScenes, setScenesLoading) => {
    const { setErrorModal } = useStaticDataStore();

    useEffect(() => {
        const fetchScenes = async () => {
            if (!selectedGroup) return;

            const groupID = selectedGroup.id;
            const res = await window.huemidi.fetchScenes(groupID);

            if (res.error) {
                console.error('res.error');
                setErrorModal();
                return;
            }

            setCachedScenes(res.data);

            setTimeout(() => {
                setScenesLoading(false);
            }, 300);
        };

        fetchScenes();
    }, [selectedGroup, setCachedScenes, setScenesLoading, setErrorModal]);
};

export default useLoadScenes;
