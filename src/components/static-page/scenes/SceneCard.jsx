import React, { useState, useRef } from 'react';
import SceneOptions from './SceneOptions';
import useOnClickOutside from '../../../hooks/useCloseOnClickOutside';
import useUpdateSceneLights from '../../../hooks/useUpdateSceneLights';
import { MdKeyboardArrowDown } from 'react-icons/md';

function SceneCard({ scene, updateCachedLights }) {
    const { updateSceneLights } = useUpdateSceneLights();
    const [showOptions, setShowOptions] = useState(false);
    const cardRef = useRef(null);

    useOnClickOutside(cardRef, () => {
        setShowOptions(false);
    });

    const handleSceneLoad = async () => {
        await updateSceneLights(scene, updateCachedLights);
    };

    const previewColor = () => {
        if (scene.palette.length > 1) {
            return `linear-gradient(45deg, ${scene.palette})`;
        } else {
            return scene.palette[0];
        }
    };

    return (
        <div
            className='relative pl-2 pr-1 h-8 flex flex-row items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:cursor-pointer'
            ref={cardRef}
            onClick={handleSceneLoad}
        >
            <div className='w-full overflow-hidden'><div className='w-full flex gap-1'>
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                        {scene.name}
                    </div>
                </div></div>
            <div className='flex items-center justify-end gap-1'>
                <div
                    className='w-6 h-6 rounded-full border border-gray-600'
                    style={{
                        background: previewColor(),
                    }}
                />
                <div
                    className='text-xl text-gray-500 hover:text-gray-200'
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowOptions(!showOptions);
                    }}
                >
                    <MdKeyboardArrowDown
                        className={`${
                            showOptions && 'rotate-180'
                        } transition-transform`}
                    />
                </div>
            </div>
            {showOptions && (
                <SceneOptions
                    scene={scene}
                    setShowOptions={setShowOptions}
                />
            )}
        </div>
    );
}

export default SceneCard;
