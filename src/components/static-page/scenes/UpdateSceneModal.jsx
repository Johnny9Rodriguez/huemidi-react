import React, { useEffect } from 'react';
import useStaticDataStore from '../../../stores/staticDataStore';
import useSceneNameInput from '../../../hooks/useSceneNameInput';
import useUpdateScene from '../../../hooks/useUpdateScene';
import classNames from 'classnames';
import { IoMdWarning } from 'react-icons/io';

function UpdateSceneModal({ cachedLights, setCachedScenes, options }) {
    const { selectedResource, closeModal } = useStaticDataStore();
    // eslint-disable-next-line
    const { name, setName, setEditName, inputRef } = useSceneNameInput(''); //prettier-ignore
    const { label, reqMethod } = options;
    const { hasActiveLight, previewColor } = useUpdateScene(cachedLights);
    const scene = selectedResource;

    useEffect(() => {
        if (scene) {
            setName(scene.name);
        }
    }, [scene, setName]);

    useEffect(() => {
        if (hasActiveLight) inputRef.current.focus();
    }, [inputRef, hasActiveLight]);

    const handleUpdate = () => {
        if (reqMethod) return; // if update > PUT, else > POST
    };

    const btnClasses = 'w-20 max-w-full py-0.5 bg-gray-700';

    const btnConfirm = classNames({
        'opacity-50 hover:cursor-default': !hasActiveLight,
        'hover:bg-gray-500': hasActiveLight,
    });

    const renderWarning = () => {
        return (
            <>
                <div className='flex gap-2 items-start'>
                    <IoMdWarning className='text-xl text-red-500' />
                    <div className='text-sm text-gray-400'>
                        At least one light must be on.
                    </div>
                </div>
                <button
                    className={`${btnClasses} hover:bg-gray-500`}
                    onClick={closeModal}
                >
                    cancel
                </button>
            </>
        );
    };

    const renderContent = () => {
        return (
            <>
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
                    <button
                        className={`${btnClasses} hover:bg-gray-500`}
                        onClick={closeModal}
                    >
                        cancel
                    </button>
                    <button
                        className={`${btnClasses} ${btnConfirm}`}
                        onClick={handleUpdate}
                    >
                        {label}
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className='flex flex-col items-center gap-4'>
            {hasActiveLight ? renderContent() : renderWarning()}
        </div>
    );
}

export default UpdateSceneModal;
