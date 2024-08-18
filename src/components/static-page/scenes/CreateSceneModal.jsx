import React, { useRef } from 'react';
import useOnClickOutside from '../../../hooks/useCloseOnClickOutside';
import useStaticDataStore from '../../../stores/staticDataStore';

function CreateSceneModal({ cachedLights, setCachedScenes }) {
    const { closeModal } = useStaticDataStore();
    const modalRef = useRef(null);

    useOnClickOutside(modalRef, closeModal);

    return (
        <div
            className='p-4 mt-20 mb-auto w-52 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700'
            ref={modalRef}
        >
            <div>Create Scene</div>
        </div>
    );
}

export default CreateSceneModal;
