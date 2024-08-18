import React, { useRef } from 'react';
import useStaticDataStore from '../../../stores/staticDataStore';
import useOnClickOutside from '../../../hooks/useCloseOnClickOutside';

function DeleteSceneModal({ setCachedScenes }) {
    const { selectedResource, closeModal } = useStaticDataStore();
    const modalRef = useRef(null);

    useOnClickOutside(modalRef, closeModal);

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
        <div
            className='p-4 mt-20 mb-auto w-52 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700'
            ref={modalRef}
        >
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
