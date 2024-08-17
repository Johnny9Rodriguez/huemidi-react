import { updateLightResource } from './updateLightResource';
import { convertXyToHex } from './colorConvert';

const updateSceneLights = async (scene, updateCachedLights) => {
    const actions = scene.actions;
    for (const action of actions) {
        const lightID = action.target.rid;

        const on = action.action.on?.on ?? false;
        const bri = action.action.dimming?.brightness ?? null;
        const xy = action.action.color?.xy ?? null;
        const mirek = action.action.color_temperature?.mirek ?? null;

        const hex = convertXyToHex(xy) ?? null;

        const updateData = {
            on: on,
            bri: bri,
            color: {
                xy: xy,
                mirek: mirek,
                hex: hex,
            },
        };

        updateCachedLights(lightID, updateData);
        await updateLightResource(lightID, updateData);
    }
};

export { updateSceneLights };
