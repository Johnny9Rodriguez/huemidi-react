import React from 'react';
import classNames from 'classnames';

function ColorModeButton({ name, colorMode, setColorMode }) {
    const classes = classNames(
        'w-16 flex justify-center hover:cursor-pointer hover:bg-white/25',
        {
            'border-b-2': colorMode === name.toLowerCase(),
        }
    );

    const handleClick = () => {
        const mode = name.toLowerCase();
        setColorMode(mode);
    };

    return (
        <div className={classes} onClick={handleClick}>
            {name}
        </div>
    );
}

export default ColorModeButton;
