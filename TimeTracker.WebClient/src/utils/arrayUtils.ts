export const intersect = <T>(array1: T[], array2: T[]): T[] => {
    return array1?.filter(el => array2.includes(el));
}

export const getUnique = <T>(array: T[]): T[] => {
    return array.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    })
}

export const sortStrings = (array: string[]): string[] => {
    return array.sort((a, b) => {
        return a.localeCompare(b);
    })
}

export const getMinMax = <T>(arr: T[]): T[] => {
    if (!arr) {
        return [];
    }
    let minEl = arr[0];
    let maxEl = arr[0];
    arr.forEach(el => {
        if (el < minEl)
            minEl = el;
        if (el > maxEl)
            maxEl = el;
    })
    return [minEl, maxEl];
}

export const range = (size: number, startAt: number = 0): ReadonlyArray<number> => {
    return Array.from(Array(24).keys()).map(i => i + startAt);
}