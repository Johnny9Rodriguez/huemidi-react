import { useEffect } from 'react';
import useStaticDataStore from '../stores/staticDataStore';

const useLoadGroups = (setCachedLightGroups) => {
    const { setErrorModal } = useStaticDataStore();

    useEffect(() => {
        const fetchLightGroups = async () => {
            const res = await window.huemidi.static.fetchLightGroups();

            if (res.error) {
                console.error(res.error);
                setErrorModal();
                return;
            }

            setCachedLightGroups(res.data);
        };

        fetchLightGroups();
    }, [setCachedLightGroups, setErrorModal]);
};

export default useLoadGroups;
