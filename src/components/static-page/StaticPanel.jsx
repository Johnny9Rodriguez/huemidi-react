import React from 'react';
import StaticPanelSpacer from './StaticPanelSpacer';
import SceneSection from './SceneSection';
import LightSection from './LightSection';

function StaticPanel({ selectedGroup, cachedLights, updateCachedLights, cachedScenes }) {
    return (
        <div className='relative h-full flex flex-col overflow-auto'>
            <SceneSection selectedGroup={selectedGroup} cachedScenes={cachedScenes} />
            <StaticPanelSpacer />
            <LightSection
                cachedLights={cachedLights}
                updateCachedLights={updateCachedLights}
            />
        </div>
    );
}

export default StaticPanel;
