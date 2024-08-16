import { useState, useEffect, useRef } from 'react';

function useSceneNameInput(initialName) {
    const [name, setName] = useState(initialName);
    const [editName, setEditName] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (editName && inputRef.current) {
            // Set focus to input field and move cursor at end of scene name.
            inputRef.current.focus();
            inputRef.current.setSelectionRange(name.length, name.length);
        }

        if (!editName) {
            const trimmedName = name.trim();
            setName(trimmedName);
        }
    }, [editName, name]);

    return { name, setName, editName, setEditName, inputRef };
}

export default useSceneNameInput;