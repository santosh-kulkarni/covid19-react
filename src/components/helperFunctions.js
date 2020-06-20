export const keys = (obj) => {
    return Object.keys(obj);
}

export const entries = (obj) => {
    return Object.entries(obj);
}

export const keysLength = (obj) => {
    return Object.keys(obj).length;
}

export const getLastObject = (obj) => {
    const stateArray = entries(obj);
    return stateArray[stateArray.length - 1][1];
}

export const getValue = (val) => {
    if (val) {
        return val;
    }
    else {
        return "";
    }
}