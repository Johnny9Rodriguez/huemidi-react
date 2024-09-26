import React, { useEffect, useState } from 'react';
import GroupDropdown from './GroupDropdown.jsx';

function GroupCard({ cachedLightGroups }) {
    const [preferredGroup, setPreferredGroup] = useState(null);

    useEffect(() => {
        const fetchPreferredGroup = async () => {
            const groupID = await window.huemidi.settings.fetchPreferredGroup();
            const group = cachedLightGroups.find(
                (group) => group.id === groupID
            );
            if (group === null) return;
            setPreferredGroup(group);
        };
        if (cachedLightGroups && cachedLightGroups.length > 0) {
            fetchPreferredGroup();
        }
    }, [cachedLightGroups]);

    return (
        <div className='flex bg-gray-900 gap-4 hover:bg-gray-800 border border-gray-700 p-2 justify-between items-center'>
            <div>
                <div>Preferred Light Group</div>
                <div className='text-sm text-gray-400'>
                    You can set the preferred light group here. This group will
                    be selected on app start.
                </div>
            </div>
            <GroupDropdown
                cachedLightGroups={cachedLightGroups}
                preferredGroup={preferredGroup}
                setPreferredGroup={setPreferredGroup}
            />
        </div>
    );
}

export default GroupCard;
