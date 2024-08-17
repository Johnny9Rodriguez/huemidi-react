import { updateLightResource } from './updateLightResource';

const updateSceneLights = async (scene) => {
    const actions = scene.actions;
    for (const action of actions) {
        const lightID = action.target.rid;

        const on = action.action.on?.on ?? false;
        const bri = action.action.dimming?.brightness ?? null;
        const xy = action.action.color?.xy ?? null;
        const mirek = action.action.color_temperature?.mirek ?? null;

        const data = {
            on: on,
            bri: bri,
            color: {
                xy: xy,
                mirek: mirek,
            },
        };

        await updateLightResource(lightID, data);
    }
};

export { updateSceneLights };
