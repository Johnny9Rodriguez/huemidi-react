import React from 'react';
import StaticPanelSpacer from './StaticPanelSpacer';
import SceneSection from './SceneSection';
import LightSection from './LightSection';

function StaticPanel({
    selectedGroup,
    cachedLights,
    updateCachedLights,
    cachedScenes,
}) {
    return (
        <div className='relative h-full flex flex-col overflow-auto bg-gradient-to-b from-gray-800 to-gray-950'>
            <SceneSection
                selectedGroup={selectedGroup}
                cachedScenes={cachedScenes}
                updateCachedLights={updateCachedLights}
            />
            <StaticPanelSpacer />
            <LightSection
                cachedLights={cachedLights}
                updateCachedLights={updateCachedLights}
            />
        </div>
    );
}

export default StaticPanel;
