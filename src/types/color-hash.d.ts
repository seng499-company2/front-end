type ColorValueArray = [number, number, number];

interface HueObject {
    min: number;
    max: number;
}

type Hue = number | HueObject | ReadonlyArray<HueObject>;
type Lightness = number | number[];
type Saturation = number | number[];

type HashFunction = (input: string) => number;

interface ColorHashOptions {
    lightness?: Lightness | undefined;
    saturation?: Saturation | undefined;
    hue?: Hue | undefined;
    hash?: HashFunction | undefined;
}
