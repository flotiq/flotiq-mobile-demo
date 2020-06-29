export const SET_CONTENT_TYPES = 'SET_CONTENT_TYPES';
export const CLEAR_CONTENT_TYPES = 'CLEAR_CONTENT_TYPES';
export const SET_CONTENT_TYPE_OBJECTS = 'SET_CONTENT_TYPE_OBJECTS';
export const CLEAR_CONTENT_TYPE_OBJECTS = 'CLEAR_CONTENT_TYPE_OBJECTS';
export const SET_CONTENT_OBJECT = 'SET_CONTENT_OBJECT';
export const CLEAR_CONTENT_OBJECT = 'CLEAR_CONTENT_OBJECT';
export const RESET_CONTENT_OBJECT = 'RESET_CONTENT_OBJECT';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const FETCHING_FAILURE = 'FETCHING_FAILURE';
export const FETCHING_OBJECTS_FAILURE = 'FETCHING_OBJECTS_FAILURE';
export const FETCHING_OBJECT_FAILURE = 'FETCHING_OBJECT_FAILURE';
export const SET_TOTAL_PAGE = 'SET_TOTAL_PAGE';
export const SET_CTD_TOTAL_PAGE = 'SET_CTD_TOTAL_PAGE';

export const setContentTypeDefinitions = (types) => ({
    type: SET_CONTENT_TYPES,
    contentTypesDefinitions: types,
    errorMessage: null,
});

export const clearContentTypeDefinitions = () => ({
    type: CLEAR_CONTENT_TYPES,
});

export const setContentTypeObjects = (contentTypeName, objects) => async (dispatch) => {
    dispatch({
        type: SET_CONTENT_TYPE_OBJECTS,
        contentObjectName: contentTypeName,
        contentTypeObjects: objects,
        objectsErrorMessage: null,
    });
    dispatch(resetAllContentTypesObject(objects, contentTypeName));
};

export const clearContentTypeObjects = (contentTypeName) => async (dispatch) => {
    dispatch({
        type: CLEAR_CONTENT_TYPE_OBJECTS,
        contentObjectName: contentTypeName,
    });
};

export const setContentTypeDefinitionsTotalPages = (totalPages) => ({
    type: SET_CTD_TOTAL_PAGE,
    totalPages,
});

export const setContentTypeObjectsTotalPages = (ctoName, totalPages) => ({
    type: SET_TOTAL_PAGE,
    totalPages,
    contentObjectName: ctoName,
});

export const setContentObject = (ctoName, object) => ({
    type: SET_CONTENT_OBJECT,
    ctoName,
    contentObject: object,
    errorMessage: null,
});

export const clearContentObject = (ctoName, objectId) => async (dispatch) => {
    dispatch({
        type: CLEAR_CONTENT_OBJECT,
        ctoName,
        objectId,
    });
};

export const clearError = () => ({
    type: CLEAR_ERROR,
});

export const setFetchingFailure = (error) => ({
    type: FETCHING_FAILURE,
    errorMessage: error,
});

export const setFetchingObjectsFailure = (error) => ({
    type: FETCHING_OBJECTS_FAILURE,
    objectsErrorMessage: error,
});

export const setFetchingObjectFailure = (error) => ({
    type: FETCHING_OBJECT_FAILURE,
    objectErrorMessage: error,
});

export const resetAllContentTypesObject = (data, ctoName) => ({
    type: RESET_CONTENT_OBJECT,
    ctoName,
    contentObject: data,
    errorMessage: null,
});
