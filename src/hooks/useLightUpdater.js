import { useRef } from 'react';
import { makeRequest } from '../utils/updateLightResource';

/**
 * Custom hook to manage light updates with rate limiting and pending update for smoother
 * user experience.
 *
 * This hook is used whenever there are draggable values like color or brightness.
 * It ensures that updates are sent when the bridge is ready, i.e. has responded for the
 * previous request.
 * Any changes during a pending request will update as soon as the bridge is ready. This will
 * delay some updates for a short time but allow smooth dragging and ensures that the last set
 * value will be sent to the bridge.
 */

const useLightUpdater = (updateCachedLights, selectedResource) => {
    const pendingRequestRef = useRef(false);
    const pendingUpdateRef = useRef(null);

    const updateLight = async (light, data) => {
        const updateData = {
            ...light.state,
            ...data,
        };

        updateCachedLights(light.id, updateData);
        await makeRequest(light.id, updateData);
    };

    const updateAllLights = async (data) => {
        pendingRequestRef.current = true;

        const { type, resource } = selectedResource;
        // Convert single light into array. Multi is already an array.
        const lights = type === 'single' ? [resource] : resource;
        for (const light of lights) {
            await updateLight(light, data);
        }

        pendingRequestRef.current = false;

        if (pendingUpdateRef.current) {
            const newColor = pendingUpdateRef.current;
            pendingUpdateRef.current = null;
            await updateAllLights(newColor);
        }
    };

    const handleLightUpdate = async (data) => {
        if (pendingRequestRef.current) {
            // Overrides pendingUpdate with last set value / data.
            pendingUpdateRef.current = data;
        } else {
            await updateAllLights(data);
        }
    };

    return handleLightUpdate;
};

export default useLightUpdater;
