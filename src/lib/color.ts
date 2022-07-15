import ColorHash from "color-hash";

// use hash function to generate a color for each course by its code
// hue is measured in degrees of the color circle ranging from 0 to 360 (red = 0°; green = 120°; blue = 240°)
// saturation percent (100% full saturation, 0% is a shade of gray)
// lightness percent (100% is white, 0% is black, 50% is 'normal')
const colorHashFunction = new ColorHash({
    lightness: [0.35, 0.5, 0.65],
    hue: [
        { min: 10, max: 20 }, // remove this line if colors are too brown
        { min: 30, max: 90 },
        { min: 180, max: 210 },
        { min: 270, max: 285 },
        { min: 330, max: 360 },
    ],
    saturation: [0.6, 0.5, 0.4],
});

export const generateColorHex = (
    title: string,
    opts?: ColorHashOptions
): string => {
    if (!title) {
        return "";
    }
    if (!opts) {
        // most common case
        return colorHashFunction.hex(title);
    }
    return new ColorHash(opts).hex(title);
};
