import React from 'react';

function StaticPanelSpacer() {
    const classes = 'px-4 flex text-white/75 gap-4 w-1/2 border-gray-700';

    return (
        <div className='flex justify-between text-white'>
            <h2 className={`${classes} pt-1.5 bg-gray-900 border-t`}>Lights</h2>
            <h2
                className={`${classes} pb-1.5 justify-end bg-gray-800 border-b border-l`}
            >
                Scenes
            </h2>
        </div>
    );
}

export default StaticPanelSpacer;
