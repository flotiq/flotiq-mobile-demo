export const getPropsWithProperty = (prop, typeProperty, typeValue) => {
    if (prop) {
        const propsWithType = Object.keys(prop).filter((p) => {
            if (Array.isArray(typeValue)) {
                if (prop[p][typeProperty] && typeValue.includes(prop[p][typeProperty])) {
                    return p;
                }
            }
            if (typeof typeValue === 'string' || typeValue instanceof String) {
                if (prop[p][typeProperty] && (prop[p][typeProperty] === typeValue)) {
                    return p;
                }
            }
        });
        return propsWithType || null;
    }
    return null;
};

export const getContentTypeObjectsListWithProperties = (
    contentTypesDefinitions, typeProperty, typeValue,
) => {
    if (!contentTypesDefinitions) return null;
    console.log('contenttypes',contentTypesDefinitions);
    const ctoPOTProps = contentTypesDefinitions.map((el) => {
        const p = el.metaDefinition.propertiesConfig;
        if (!p) return null;
        const propsWithProperties = getPropsWithProperty(p, typeProperty, typeValue);
        const result = propsWithProperties.length > 0 ? propsWithProperties : null;
        return result ? { [el.name]: result } : null;
    });
    return ctoPOTProps.length > 0 ? ctoPOTProps.filter((i) => i !== null) : null;
};

export const transformToHumanReadableTitle = (element, partsOfTitle) => {
    if (partsOfTitle && Array.isArray(partsOfTitle)) {
        const titleParts = [];
        partsOfTitle.forEach((i) => {
            if (element[i]) {
                titleParts.push(element[i]);
            }
        });
        return titleParts.length > 0 ? titleParts.join(' ') : element.id;
    }
    return element.id;
};

export const transformToArrayForListData = (objects, type = null) => {
    const initialDatas = type ? objects[type] : objects;
    const mappedInitialDataToArr = Object.keys(initialDatas).map((item) => initialDatas[item]);
    const nextPageMarker = mappedInitialDataToArr.length;
    const flattenInitialData = mappedInitialDataToArr.map((el) => el.data).flat();
    return [{
        data: flattenInitialData,
        nextPage: nextPageMarker,
    }];
};

export const getFilterArrayByKeyName = (array, name) => {
    if (array && Array.isArray(array) && array.length > 0) {
        const filtered = array.filter((k) => k[name]);
        return (filtered && filtered[0]) ? filtered[0][name] : null;
    }
    return null;
};

export const filterObjectList = (objList, newList) => {
    const list = newList.data ? newList.data : newList;

    const newDataIds = list.pages.map((el) => el.data).flat().map((el) => el.id);
    const newObjectData = {};
    Object.keys(objList).forEach((el) => {
        const existsInArr = newDataIds.includes(el);
        if (existsInArr) newObjectData[el] = objList[el];
    });
    return newObjectData;
};

export const checkIsElPicture = (el) => {
    const flotiqImageExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];

    if (!el || (typeof el !== 'string' && !(el instanceof String))) return false;
    if (el[0] !== '/') return false;
    const lastDotIndex = el.lastIndexOf('.');
    const ext = el.substring(lastDotIndex + 1);

    if (flotiqImageExt.includes(ext)) {
        return ext;
    }
    return false;
};
