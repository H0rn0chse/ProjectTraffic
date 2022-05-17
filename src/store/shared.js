export function generateId () {
    return Date.now().toString();
}

export function clone (value) {
    if (typeof value !== "object") {
        return value;
    }
    return JSON.parse(JSON.stringify(value));
}
