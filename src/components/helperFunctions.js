export const keys = (obj) => {
    if(obj) {
        return Object.keys(obj);
    } else {
        return [];
    }
}

export const entries = (obj) => {
    if(obj) {
        return Object.entries(obj);
    } else {
        return [];
    }
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
        return 0;
    }
}