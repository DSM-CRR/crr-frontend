export const randomVector3Array = (size: number, max: number[], min: number[]) => {
    return [...Array(size)].map(() => ({
        x: randomRange(max[0], min[0]),
        y: randomRange(max[1], min[1]),
        z: randomRange(max[2], min[2])
    }));
}

export const randomRange = (max: number, min: number) => {
    const m = Math.floor(max);
    const n = Math.ceil(min);
    return Math.random() * (m - n) + n;
}