import React, { useEffect, useState, useRef } from 'react';
import SceneOptions from './SceneOptions';
import useOnClickOutside from '../../hooks/useCloseOnClickOutside';
import useSceneNameInput from '../../hooks/useSceneNameInput';
import { MdKeyboardArrowDown } from 'react-icons/md';

function SceneCard({ scene }) {
    const { name, setName, editName, setEditName, inputRef } = useSceneNameInput(scene.name); //prettier-ignore

    const [showOptions, setShowOptions] = useState(false);
    const [saved, setSaved] = useState(true);
    const cardRef = useRef(null);

    useOnClickOutside(cardRef.current, () => {
        setShowOptions(false);
        setEditName(false);
    });

    // Reset scene name to original name if user enters empty string.
    useEffect(() => {
        if (!editName && name === '') {
            setName(scene.name);
            setSaved(true);
        }
    }, [editName, name, setName, scene]);

    const handleSceneLoad = () => {
        if (editName) return;
        console.log('execute scene actions');
    };

    const handleChange = (e) => {
        const newName = e.target.value;
        setName(newName);

        const state = newName.localeCompare(scene.name) === 0;
        setSaved(state);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            setEditName(false);
        }
    };

    const renderName = () => {
        if (editName) {
            return (
                <input
                    type='text'
                    className='scene-card-name'
                    value={name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    ref={inputRef}
                />
            );
        } else {
            return (
                <div className='w-full flex gap-1'>
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                        {name}
                    </div>

                    {!saved && '*'}
                </div>
            );
        }
    };

    const previewColor = () => {
        if (scene.palette.length > 1) {
            return `linear-gradient(45deg, ${scene.palette})`;
        } else {
            return scene.palette[0];
        }
    };

    // Refocus to input when clicking edit multiple times. Otherwise focus will change to edit button.
    const setFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(name.length, name.length);
        }
    };

    return (
        <div
            className='relative pl-2 pr-1 py-1 flex flex-row items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:cursor-pointer'
            ref={cardRef}
            onClick={handleSceneLoad}
        >
            <div className='w-full overflow-hidden'>{renderName()}</div>
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
                    setEditName={setEditName}
                    setFocus={setFocus}
                    setSaved={setSaved}
                />
            )}
        </div>
    );
}

export default SceneCard;
