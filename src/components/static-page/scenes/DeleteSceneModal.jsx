import React from 'react';
import useStaticDataStore from '../../../stores/staticDataStore';

function DeleteSceneModal({ setCachedScenes }) {
    const { selectedResource, closeModal } = useStaticDataStore();

    const handleDelete = async () => {
        const sceneID = selectedResource.id;
        const res = await window.huemidi.deleteResource('scene', sceneID);

        closeModal();

        if (res.error) {
            console.error(res.error);
            // TODO: error flag
            return;
        }

        setCachedScenes((prevScenes) =>
            prevScenes.filter((scene) => scene.id !== sceneID)
        );
    };

    const btnClasses = 'w-full py-0.5';

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-sm text-gray-400'>
                Are you sure you want to delete this scene?
            </div>
            <div className='w-full flex items-center justify-center gap-4 text-sm text-gray-200'>
                <button
                    className={`${btnClasses} bg-gray-700 hover:bg-gray-500`}
                    onClick={closeModal}
                >
                    cancel
                </button>
                <button
                    className={`${btnClasses} bg-red-900 hover:bg-red-700`}
                    onClick={handleDelete}
                >
                    delete
                </button>
            </div>
        </div>
    );
}

export default DeleteSceneModal;
