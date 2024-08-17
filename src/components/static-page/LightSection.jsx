import React from 'react';
import LightCard from './LightCard';

function LightSection({ cachedLights, updateCachedLights }) {
    const renderLights = () => {
        return cachedLights.map((light) => (
            <LightCard
                key={light.id}
                light={light}
                updateCachedLights={updateCachedLights}
            />
        ));
    };

    return (
        <div className='p-2 flex-grow grid grid-cols-2 auto-rows-min gap-2'>
            {renderLights()}
        </div>
    );
}

export default LightSection;
