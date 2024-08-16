import React from 'react';

function CopyPasteButton({ symbol, onClick }) {
    const classes =
        'w-4 h-4 flex items-center justify-center border text-white/50 border-gray-700 text-xs hover:text-white hover:border-gray-500';

    return (
        <button className={classes} onClick={onClick}>
            {symbol}
        </button>
    );
}

export default CopyPasteButton;
