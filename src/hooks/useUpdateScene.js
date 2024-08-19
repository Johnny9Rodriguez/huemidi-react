import { useEffect, useState } from 'react';

const useUpdateScene = (cachedLights) => {
    const [hasActiveLight, setHasActiveLight] = useState(false);

    useEffect(() => {
        for (const light of cachedLights) {
            if (light.state.on) {
                setHasActiveLight(true);
                return;
            }
        }
    }, [cachedLights]);

    const previewColor = () => {
        const colors = [];
        for (const light of cachedLights) {
            if (light.state.on) {
                const hex = light.state.color.hex;
                colors.push(hex);
            }
        }

        if (colors.length > 1) {
            return `linear-gradient(45deg, ${colors})`;
        } else if (colors.length > 0) {
            return colors[0];
        } else {
            return '#000000';
        }
    };

    return { hasActiveLight, previewColor };
};

export default useUpdateScene;
