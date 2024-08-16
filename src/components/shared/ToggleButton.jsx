import React from 'react';
import classNames from 'classnames';

function ToggleButton({ width = 24, height = 12, state, onToggle }) {
    if (width <= 8 || height <= 8) {
        throw new Error('Width and height must be greater than 8px.');
    }

    const containerStyle = {
        width: `${width}px`,
        height: `${height}px`,
    };

    const handleWidth = Math.min(width / 2 - 2, height - 2);

    const handleTranslate = height > width / 2 ? width / 2 : width - height;

    const handleStyle = {
        width: handleWidth,

        height: '100%',
        transform: state
            ? `translateX(${handleTranslate}px)`
            : 'translateX(0px)',
        transition: 'transform 0.1s ease-out, background-color 0.2s ease-out',
    };

    const handleColor = classNames({
        'bg-white': state,
        'bg-white/50': !state,
    });

    const handleClick = () => {
        const newState = !state;
        // setState(newState);
        onToggle(newState);
    };

    return (
        <div
            className='flex items-center bg-black border border-gray-700 hover:cursor-pointer hover:border-gray-500'
            style={containerStyle}
            onClick={handleClick}
        >
            <div className={handleColor} style={handleStyle} />
        </div>
    );
}

export default ToggleButton;
