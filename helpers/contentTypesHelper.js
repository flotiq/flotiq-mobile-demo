import { IMAGE_URL } from './constants/global';

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
    const ctoPOTProps = contentTypesDefinitions.map((el) => {
        const p = el.metaDefinition.propertiesConfig;
        if (!p) return null;
        const propsWithProperties = getPropsWithProperty(p, typeProperty, typeValue);
        const result = propsWithProperties.length > 0 ? propsWithProperties : null;
        return result ? { [el.name]: result } : null;
    });
    return ctoPOTProps.length > 0 ? ctoPOTProps.filter((i) => i !== null) : null;
};

/**
 * Display object name based on element properties marked as 'part of object title'
 * @todo Will be removed if internal.objectTitle will be available (#20111)
 * @param element Content object
 * @param partsOfTitle array of properties which should be treat as title
 * @returns string
 */
export const transformToHumanReadableTitle = (element, partsOfTitle = ['name', 'fileName']) => {
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

/**
 * Return image URL with required dimensions
 * @param contentObject Content object
 * @param width Width of thumbnail
 * @param height Height of thumbnail. Use 0 for auto height
 * @returns {string|null} String with address or null if Content Object is not media type
 */
export const getImageUrl = (contentObject, width = 150, height = 0) => {
    if (isMedia(contentObject)) {
        return `${IMAGE_URL}/${width}x${height}/${contentObject.id}.${contentObject.extension}`;
    }
    return null;
};

/**
 * Test if Content Object is media type
 * @param contentObject
 * @returns {boolean}
 */
export const isMedia = (contentObject) => contentObject.internal.contentType === '_media';

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
