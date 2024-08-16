class ColorHelper {
    hexToRed(hex) {
        return parseInt(hex.substring(0, 2), 16);
    }

    hexToGreen(hex) {
        return parseInt(hex.substring(2, 4), 16);
    }

    hexToBlue(hex) {
        return parseInt(hex.substring(4, 6), 16);
    }

    hexToRgb(h) {
        return [this.hexToRed(h), this.hexToGreen(h), this.hexToBlue(h)];
    }

    rgbToHex(r, g, b) {
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        return `${r.toString(16).padStart(2, '0')}${g
            .toString(16)
            .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    mixColors(hexA, hexB, p) {
        let rgbA = this.hexToRgb(hexA);
        let rgbB = this.hexToRgb(hexB);

        rgbA = rgbA.map((value) => value * (1 - p));
        rgbB = rgbB.map((value) => value * p);

        const rgb = rgbA.map((value, index) => value + rgbB[index]);
        const hex = this.rgbToHex(...rgb);

        return '#' + hex;
    }
}

const color = new ColorHelper();

function getWhiteColor(mirek) {
    const whiteGradient = ['f4fdff', 'ffd98d', 'ffb243'];

    switch (mirek) {
        case 153:
            return '#' + whiteGradient[0];
        case 326:
            return '#' + whiteGradient[1];
        case 500:
            return '#' + whiteGradient[2];
        default:
            if (mirek < 326) {
                const p = (mirek - 153) / 173;
                return color.mixColors(whiteGradient[0], whiteGradient[1], p);
            } else {
                const p = (mirek - 326) / 174;
                return color.mixColors(whiteGradient[1], whiteGradient[2], p);
            }
    }
}

export { getWhiteColor };
