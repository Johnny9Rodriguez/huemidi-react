import React, { useEffect, useState } from 'react';
import useStaticDataStore from '../../../stores/staticDataStore';
import useSceneNameInput from '../../../hooks/useSceneNameInput';

function EditSceneModal({ setCachedScenes }) {
    const { selectedResource, closeModal } = useStaticDataStore();
    // eslint-disable-next-line
    const [scene, setScene] = useState(selectedResource);
    const { name, setName, setEditName, inputRef } = useSceneNameInput(''); //prettier-ignore

    useEffect(() => {
        setName(scene.name);
    }, [scene, setName]);

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    const handleSave = () => {};

    const previewColor = () => {
        const colors = [];
        scene.palette.forEach((color) => colors.push(color));

        if (colors.length > 1) {
            return `linear-gradient(45deg, ${colors})`;
        } else {
            return colors[0];
        }
    };

    const btnClasses = 'w-full py-0.5 bg-gray-700 hover:bg-gray-500';

    return (
        <div className='flex flex-col gap-4'>
            <div className='w-full overflow-hidden flex gap-4'>
                <input
                    type='text'
                    className='scene-card-name'
                    placeholder='New Scene'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setEditName(true)}
                    onBlur={() => setEditName(false)}
                    ref={inputRef}
                />
                <div
                    className='w-6 h-6 flex-shrink-0 rounded-full border border-gray-600'
                    style={{
                        background: previewColor(),
                    }}
                />
            </div>
            <div className='w-full flex items-center justify-center gap-4 text-sm text-gray-200'>
                <button className={`${btnClasses}`} onClick={closeModal}>
                    cancel
                </button>
                <button className={`${btnClasses}`} onClick={handleSave}>
                    save
                </button>
            </div>
        </div>
    );
}

export default EditSceneModal;
