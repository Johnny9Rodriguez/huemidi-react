import { useEffect, useState } from 'react';
import useStaticDataStore from '../stores/staticDataStore';

const useLoadPreferredGroup = (setSelectedGroup, setLoading) => {
    const { setErrorModal } = useStaticDataStore();
    const [preferredGroupLoaded, setPreferredGroupLoaded] = useState(false);

    useEffect(() => {
        const fetchPreferredGroup = async () => {
            try {
                const groupID =
                    await window.huemidi.settings.fetchPreferredGroup();
                const res = await window.huemidi.static.fetchLightGroups();

                if (res.error) {
                    console.error(res.error);
                    setErrorModal();
                    return;
                }

                const cachedLightGroups = res.data;
                const group =
                    cachedLightGroups.find((group) => group.id === groupID) ||
                    cachedLightGroups[0];
                setSelectedGroup(group);
                setLoading(false);
                setPreferredGroupLoaded(true);
            } catch (error) {
                console.error(error);
                setErrorModal();
            }
        };

        fetchPreferredGroup();
    }, [setSelectedGroup, setErrorModal, setLoading]);

    return preferredGroupLoaded;
};

export default useLoadPreferredGroup;
