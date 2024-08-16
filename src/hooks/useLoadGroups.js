import { useEffect } from "react";

const useLoadGroups = (setCachedLightGroups) => {
    useEffect(() => {
        const fetchLightGroups = async () => {
            const res = await window.huemidi.fetchLightGroups();

            if (res.error) {
                console.error(res.error);
                // TODO: error flag
                return;
            }

            setCachedLightGroups(res.data);
        };

        fetchLightGroups();
    }, [setCachedLightGroups]);
};

export default useLoadGroups;