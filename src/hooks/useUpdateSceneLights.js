import useUpdateLightResource from './useUpdateLightResource';
import { convertXyToHex, getWhiteColor } from '../utils/colorConvert';

function useUpdateSceneLights() {
    const { updateLightResource } = useUpdateLightResource();

    const updateSceneLights = async (scene, updateCachedLights) => {
        const actions = scene.actions;
        for (const action of actions) {
            const lightID = action.target.rid;

            const on = action.action.on?.on ?? false;
            const bri = action.action.dimming?.brightness ?? null;
            const xy = action.action.color?.xy ?? null;
            const mirek = action.action.color_temperature?.mirek ?? null;

            const updateData = {
                on: on,
            };

            if (bri) {
                updateData.bri = bri;
            }

            if (xy) {
                updateData.color = {
                    xy: xy,
                    hex: convertXyToHex(xy),
                    mode: 'rgb',
                    mirek: null,
                };
            } else if (mirek) {
                updateData.color = {
                    mirek: mirek,
                    hex: getWhiteColor(mirek),
                    mode: 'white',
                };
            }

            // Merge with existing state if color is not updated
            updateCachedLights(lightID, updateData);
            await updateLightResource(lightID, updateData);
        }
    };

    return { updateSceneLights };
}

export default useUpdateSceneLights;
