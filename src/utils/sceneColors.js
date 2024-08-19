const sceneColorPalette = (cachedLights) => {
    const colors = [];
    for (const light of cachedLights) {
        if (light.state.on) {
            const hex = light.state.color.hex;
            if (!colors.includes(hex)) colors.push(hex);
        }
    }

    return colors;
};

const scenePreviewColor = (palette) => {
    const colors = palette;

    if (!colors || colors.length === 0) {
        return '#000000'; // or any default value
    }

    if (colors.length > 1) {
        return `linear-gradient(45deg, ${colors})`;
    } else if (colors.length > 0) {
        return colors[0];
    }
};

module.exports = { sceneColorPalette, scenePreviewColor };
