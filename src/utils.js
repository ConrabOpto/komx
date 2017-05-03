export function isUndefined(value) {
    return value === undefined;
}

export function isDefined(value) {
    return !isUndefined(value);
}

export function isNil(value) {
    return value == null;
}
