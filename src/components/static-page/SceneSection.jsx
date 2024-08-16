import React from 'react';
import SceneCard from './SceneCard';
import { MdInfo } from 'react-icons/md';

function SceneSection({ selectedGroup, cachedScenes }) {
    const renderScenes = () => {
        return cachedScenes.map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
        ));
    };

    const info = () => {
        return (
            <div className='px-2 flex items-start gap-2 text-sm text-gray-500'>
                <MdInfo className='text-xl' />
                Hue Bridge doesn't support scenes for non-grouped lights. Please select
                a group, i.e. a room or a zone. You can set these up in the
                official Hue app.
            </div>
        );
    };

    return (
        <div className='p-2 bg-gradient-to-b from-gray-900 to-gray-800'>
            {selectedGroup.type === 'bridge_home' ? (
                info()
            ) : (
                <div className='grid grid-cols-4 gap-2'>{renderScenes()}</div>
            )}
        </div>
    );
}

export default SceneSection;
