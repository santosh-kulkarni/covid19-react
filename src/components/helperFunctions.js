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
    if(stateArray.length > 0) {
        return stateArray[stateArray.length - 1][1];
    }
    else {
        return undefined;
    }
}

export const getValue = (val) => {
    if (val) {
        return val;
    }
    else {
        return 0;
    }
}

export const getTotalValue = (item, name) => {
    return (item && item.total && item.total[name]) || ""
}

export const getDeltaValue = (item, name) => {
    return (item && item.delta && item.delta[name]) || ""
}

export const getDistrictDeltaValue = (item, name) => {
    return (item && item.delta && item.delta[name]) || ""
}