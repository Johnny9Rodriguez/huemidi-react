import React, { useState } from 'react';
import GroupDropdown from './GroupDropdown.jsx';
import useLoadGroups from '../../hooks/useLoadGroups.js';

function GroupCard({ setLoadingGroups }) {
    const [cachedLightGroups, setCachedLightGroups] = useState([]);
    const [preferredGroup, setPreferredGroup] = useState(null);

    useLoadGroups(setCachedLightGroups);

    return (
        <div className='flex bg-gray-900 hover:bg-gray-800 border border-gray-700 p-2 justify-between items-center'>
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
