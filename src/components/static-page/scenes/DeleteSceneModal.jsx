import React from 'react';
import useStaticDataStore from '../../../stores/staticDataStore';
import { CgSpinner } from 'react-icons/cg';

function DeleteSceneModal({ isLoading, setIsLoading, setCachedScenes }) {
    const { selectedResource, closeModal, setErrorModal } = useStaticDataStore();

    const handleDelete = async () => {
        if (isLoading) return;
        setIsLoading(true);

        const sceneID = selectedResource.id;
        const res = await window.huemidi.static.deleteResource('scene', sceneID);

        if (res.error) {
            console.error(res.error);
            setErrorModal();
            return;
        }

        setTimeout(() => {
            setCachedScenes((prevScenes) =>
                prevScenes.filter((scene) => scene.id !== sceneID)
            );
    
            closeModal();
        }, 333);
    };

    const btnClasses = 'w-20 h-6 max-w-full py-0.5';

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
                    {isLoading ? (
                            <div className='h-full flex items-center justify-center text-xl'>
                                <CgSpinner className='animate-spin' />
                            </div>
                        ) : (
                            'delete'
                        )}
                </button>
            </div>
        </div>
    );
}

export default DeleteSceneModal;
