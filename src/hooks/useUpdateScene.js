import { useEffect, useState } from 'react';
import { convertHexToXy } from '../utils/colorConvert';

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

    const createSceneData = (selectedGroup, cachedLights, name) => {
        const actions = [];

        for (const light of cachedLights) {
            const target = { rid: light.id, rtype: 'light' };
            let action;

            const { on, bri, color } = light.state;

            if (!on) {
                action = { on: { on: false } };
            } else {
                if (color.mode === 'rgb') {
                    const xy = color.xy ? color.xy : convertHexToXy(color.hex);

                    action = {
                        on: { on: true },
                        dimming: { brightness: bri },
                        color: { xy: xy },
                    };
                } else {
                    action = {
                        on: { on: true },
                        dimming: { brightness: bri },
                        color_temperature: { mirek: color.mirek },
                    };
                }
            }

            actions.push({ target: target, action: action });
        }

        const group = { rid: selectedGroup.id, rtype: selectedGroup.type };

        const data = {
            metadata: {
                name: name,
            },
            actions: actions,
            group: group,
        };

        return data;
    };

    const makeRequest = async (sceneID, data) => {
        let res;
        
        // If sceneID is null, request will create a new scene with POST.
        // Otherwise it will update the scene with given ID.
        if (!sceneID) {
            res = await window.huemidi.createResource('scene', data);
        } else {
            // Cannot modify group reference, i.e. remove it before update.
            const { group, ...updateData } = data;
            res = await window.huemidi.updateResource(
                'scene',
                sceneID,
                updateData
            );
        }

        if (res.error) {
            console.error(res.error);
            // TODO: error flag
            return;
        }

        return res;
    };

    return {
        hasActiveLight,
        createSceneData,
        makeRequest,
    };
};

export default useUpdateScene;
