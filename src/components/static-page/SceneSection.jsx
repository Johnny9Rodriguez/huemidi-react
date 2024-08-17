import React from 'react';
import SceneCard from './SceneCard';
import AddSceneButton from './AddSceneButton';
import { MdInfo } from 'react-icons/md';

function SceneSection({ selectedGroup, cachedScenes, updateCachedLights }) {
    const renderScenes = () => {
        return cachedScenes.map((scene) => (
            <SceneCard
                key={scene.id}
                scene={scene}
                updateCachedLights={updateCachedLights}
            />
        ));
    };

    const info = () => {
        return (
            <div className='px-2 flex items-start gap-2 text-sm text-gray-400'>
                <MdInfo className='text-xl' />
                Hue Bridge doesn't support scenes for non-grouped lights. Please
                select a group, i.e. a room or a zone. You can set these up in
                the official Hue app.
            </div>
        );
    };

    return (
        <div className='p-2'>
            {selectedGroup.type === 'bridge_home' ? (
                info()
            ) : (
                <div className='grid grid-cols-4 gap-2'>
                    {renderScenes()}
                    <AddSceneButton />
                </div>
            )}
        </div>
    );
}

export default SceneSection;
