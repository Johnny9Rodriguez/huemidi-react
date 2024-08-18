import React, { useEffect } from 'react';
import useStaticDataStore from '../../../stores/staticDataStore';
import useSceneNameInput from '../../../hooks/useSceneNameInput';

function CreateSceneModal({ cachedLights, setCachedScenes }) {
    const { closeModal } = useStaticDataStore();
    const { name, setName, setEditName, inputRef } = useSceneNameInput(''); //prettier-ignore

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    const previewColor = () => {
        const colors = [];
        for (const light of cachedLights) {
            const hex = light.state.color.hex;
            colors.push(hex);
        }

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
                <button
                    className={`${btnClasses}`}
                    // onClick={handleDelete}
                >
                    create
                </button>
            </div>
        </div>
    );
}

export default CreateSceneModal;
