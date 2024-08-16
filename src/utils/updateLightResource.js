// Transforms light state data to Hue Request data format.
const composeLightData = ({ on = null, bri = null, color = null }) => {
    const data = {
        dynamics: {
            duration: 70,
        },
        ...(on !== null && { on: { on } }),
        ...(bri && { dimming: { brightness: parseInt(bri) } }),
        ...(color && { color }),
    };

    return data;
};

/**
 * Data received in local light state format: 
 * 
 *  data = {
 *      on,
 *      bri,
 *      color: {
 *          hex,
 *          mirek,
 *          mode,
 *      }
 *  }
 */
const makeRequest = async (id, data) => {
    const updateData = composeLightData(data);

    const res = await window.huemidi.updateResource('light', id, updateData);

    if (res.error) {
        console.error(res.error);
        // TODO: error flag
        return;
    }
};

module.exports = { makeRequest };
