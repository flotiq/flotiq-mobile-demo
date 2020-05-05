import {
    SET_CONTENT_TYPES,
    SET_CONTENT_TYPE_OBJECTS,
    SET_CONTENT_OBJECT,
    SET_FETCHING_ERROR,
    FETCHING,
    FETCHING_FAILURE,
    FETCHING_OBJECTS,
    FETCHING_OBJECTS_FAILURE,
    FETCHING_OBJECT,
    FETCHING_OBJECT_FAILURE,
    CLEAR_ERROR,
} from '../actions/contentTypes';

const initialState = {
    definitions: null,
    objects: null,
    object: null,
    isFetching: true,
    errorMessage: null,
    objectsErrorMessage: null,
    objectErrorMessage: null,
};

export default (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
    case SET_CONTENT_TYPES:
        return {
            ...state,
            definitions: action.contentTypesDefinitions,
            isFetching: false,
            errorMessage: null,
        };
    case SET_CONTENT_TYPE_OBJECTS:
        return {
            ...state,
            objects: action.contentTypeObjects,
            isFetching: false,
            objectsErrorMessage: null,
        };
    case SET_CONTENT_OBJECT:
        return {
            ...state,
            object: action.contentObject,
            isFetching: false,
            errorMessage: null,
        };
    case SET_FETCHING_ERROR:
        return {
            ...state,
            isFetching: false,
            errorMessage: action.errorMessage,
        };
    case FETCHING:
        return {
            ...state,
            isFetching: true,
            errorMessage: null,
        };
    case FETCHING_FAILURE:
        return {
            ...state,
            isFetching: false,
            errorMessage: action.errorMessage,
        };
    case FETCHING_OBJECTS:
        return {
            ...state,
            isFetching: true,
            objectsErrorMessage: null,
        };
    case FETCHING_OBJECTS_FAILURE:
        return {
            ...state,
            isFetching: false,
            objectsErrorMessage: action.objectsErrorMessage,
        };
    case FETCHING_OBJECT:
        return {
            ...state,
            isFetching: true,
            objectErrorMessage: null,
        };
    case FETCHING_OBJECT_FAILURE:
        return {
            ...state,
            isFetching: false,
            objectErrorMessage: action.objectErrorMessage,
        };
    case CLEAR_ERROR:
        return {
            ...state,
            errorMessage: null,
            objectsErrorMessage: null,
            objectErrorMessage: null,
        };
    }
    return state;
};
