import { useEffect } from 'react';

const useOnClickOutside = (ref, onClickOutside) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref && !ref.contains(event.target)) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onClickOutside]);
};

export default useOnClickOutside;
