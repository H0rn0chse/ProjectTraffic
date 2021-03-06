/* eslint-disable import/prefer-default-export */
// https://gist.github.com/mjackson/5311256

function rgbaToHsla (rgba) {
    // eslint-disable-next-line prefer-const
    let [r, g, b, a] = rgba;
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h, s;

    if (max === min) {
        // achromatic
        h = 0;
        s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        // eslint-disable-next-line default-case
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h, s, l, a];
}

function hue2rgb (p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

function hslaToRgba (hsla) {
    const [h, s, l, a] = hsla;
    let r, g, b;

    if (s === 0) {
        // achromatic
        r = l;
        g = l;
        b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255, a];
}

function rgbaStringToArr (rgbaString) {
    // 'rgba(204, 82, 82, 0.75)'
    return rgbaString.substring(5, rgbaString.length - 1).split(", ")
        .map((value, index) => {
            if (index === 3) {
                return parseFloat(value);
            }
            return parseInt(value, 10);
        });
}

function rgbaToString (rgba) {
    const [r, g, b, a] = rgba;
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

export function lighten (rgbaString, increase) {
    const rgbaIn = rgbaStringToArr(rgbaString);
    const hsla = rgbaToHsla(rgbaIn);
    // lighten
    hsla[2] *= 1 + increase;
    const rgbaOut = hslaToRgba(hsla);
    return rgbaToString(rgbaOut);
}
