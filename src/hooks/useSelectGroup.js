import { useEffect } from 'react';

const useSelectGroup = (cachedLightGroups, selectedGroup, setSelectedGroup) => {
    // Find selected option by selected group ID.
    useEffect(() => {
        if (cachedLightGroups && cachedLightGroups.length > 0) {
            const group = selectedGroup
                ? cachedLightGroups.find(
                      (group) => group.id === selectedGroup.id
                  )
                : cachedLightGroups[0];
            setSelectedGroup(group || cachedLightGroups[0]);
        }

        return () => {
            setSelectedGroup(null);
        }
    }, [cachedLightGroups, selectedGroup, setSelectedGroup]);
};

export default useSelectGroup;
