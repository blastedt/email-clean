import { Scrubbers } from "./scrubbers";


export function scrub<T extends Record<string, any>>(obj: T): T {
    const cleaned: Record<string, any> = {};
    for (const field of Object.keys(obj)) {
        if (Array.isArray(obj[field])) {
            cleaned[field] = scrubArray(obj[field]);
        } else if (typeof obj[field] === 'object') {
            cleaned[field] = scrub(obj[field]);
        } else if (field in Scrubbers) {
            cleaned[field] = Scrubbers[field](obj[field]);
        } else {
            cleaned[field] = obj[field];
        }
    }
    return cleaned as T;
}

export function scrubArray(arr: Array<any>): Array<any> {
    const cleaned = [];
    for (const element of arr) {
        if (Array.isArray(element)) {
            cleaned.push(scrubArray(element));
        } else if (typeof element === 'object') {
            cleaned.push(scrub(element));
        } else {
            cleaned.push(element);
        }
    }
    return cleaned;
}