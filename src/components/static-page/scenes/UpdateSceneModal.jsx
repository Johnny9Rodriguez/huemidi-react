import React, { useEffect, useState } from 'react';
import useStaticDataStore from '../../../stores/staticDataStore';
import useSceneNameInput from '../../../hooks/useSceneNameInput';
import useUpdateScene from '../../../hooks/useUpdateScene';
import classNames from 'classnames';
import { sceneColorPalette, scenePreviewColor } from '../../../utils/sceneColors'; //prettier-ignore
import { IoMdWarning } from 'react-icons/io';
import { CgSpinner } from 'react-icons/cg';

function UpdateSceneModal({
    isLoading,
    setIsLoading,
    cachedLights,
    setCachedScenes,
    options,
    setError,
}) {
    const { selectedResource, selectedGroup, closeModal } = useStaticDataStore(); //prettier-ignore
    const { name, setName, setEditName, inputRef } = useSceneNameInput(''); //prettier-ignore
    const { hasActiveLight, createSceneData, updateScene } = useUpdateScene(cachedLights); //prettier-ignore
    const [scene, setScene] = useState(selectedResource);
    const [colorPalette, setColorPalette] = useState(
        sceneColorPalette(cachedLights)
    );

    useEffect(() => {
        if (scene) {
            setName(scene.name);
        }
    }, [scene, setName]);

    useEffect(() => {
        setScene(selectedResource);
    }, [selectedResource]);

    useEffect(() => {
        setColorPalette(sceneColorPalette(cachedLights));
    }, [cachedLights]);

    useEffect(() => {
        if (hasActiveLight) inputRef.current.focus();
    }, [inputRef, hasActiveLight]);

    const handleUpdate = async () => {
        if (name === '') {
            setError({ flag: true, message: 'Name cannot be empty.' });
            return;
        }

        if (isLoading) return;
        setIsLoading(true);

        const sceneData = createSceneData(selectedGroup, cachedLights, name);
        const sceneID = scene ? scene.id : null;

        const res = await updateScene(sceneID, sceneData);

        const cacheData = {
            id: scene ? scene.id : res.data[0].rid,
            name: name,
            actions: sceneData.actions,
            palette: colorPalette,
        };

        setTimeout(() => {
            if (!scene) {
                setCachedScenes((prevScenes) => [...prevScenes, cacheData]);
            } else {
                setCachedScenes((prevScenes) =>
                    prevScenes.map((cachedScene) =>
                        cachedScene.id === cacheData.id
                            ? cacheData
                            : cachedScene
                    )
                );
            }
            closeModal();
        }, 333);
    };

    const btnClasses =
        'w-20 h-6 max-w-full flex items-center justify-center py-0.5 bg-gray-700';

    const btnConfirm = classNames({
        'opacity-50 hover:cursor-default': !hasActiveLight,
        'hover:bg-gray-500': hasActiveLight,
    });

    const renderWarning = () => {
        return (
            <>
                <div className='flex gap-2 justify-center items-start text-sm'>
                    <IoMdWarning className='text-xl text-red-500' />
                    <div className='text-gray-400'>
                        At least one light must be on.
                    </div>
                </div>
                <button
                    className={`${btnClasses} hover:bg-gray-500 text-gray-200 text-sm`}
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
                            background: scenePreviewColor(colorPalette),
                        }}
                    />
                </div>
                <div className='w-full flex items-center justify-center gap-4 text-sm text-gray-200'>
                    <button
                        className={`${btnClasses} hover:bg-gray-500`}
                        onClick={() => {
                            if (isLoading) return;
                            closeModal();
                        }}
                    >
                        cancel
                    </button>
                    <button
                        className={`${btnClasses} ${btnConfirm}`}
                        onClick={handleUpdate}
                    >
                        {isLoading ? (
                            <div className='h-full flex items-center justify-center text-xl'>
                                <CgSpinner className='animate-spin' />
                            </div>
                        ) : (
                            options.label
                        )}
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
