import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filterObjectList } from '../../helpers/contentTypesHelper';
import { SET_CONTENT_TYPES,
    CLEAR_CONTENT_TYPES,
    SET_CONTENT_TYPE_OBJECTS,
    CLEAR_CONTENT_TYPE_OBJECTS,
    SET_RELATIONS_OBJECTS,
    SET_CONTENT_OBJECT,
    CLEAR_CONTENT_OBJECT,
    RESET_CONTENT_OBJECT,
    FETCHING_FAILURE,
    FETCHING_OBJECTS_FAILURE,
    FETCHING_OBJECT_FAILURE,
    SET_TOTAL_PAGE,
    SET_CTD_TOTAL_PAGE,
    CLEAR_ERROR } from '../actions/contentTypes';
import { LOGOUT } from '../actions/auth';

const initialState = {
    definitions: null,
    objects: null,
    object: null,
    isFetching: false,
    errorMessage: null,
    objectsErrorMessage: null,
    objectErrorMessage: null,
    partOfTitleProperties: null,
    withRichTextProperties: null,
    totalPages: [],
    ctdTotalPages: null,
    relations: null,
};

const reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
    case SET_CONTENT_TYPES:
        return {
            ...state,
            definitions: action.contentTypesDefinitions,
            isFetching: false,
            errorMessage: null,
        };
    case CLEAR_CONTENT_TYPES:
        return {
            ...state,
            definitions: undefined,
            isFetching: false,
            errorMessage: null,
        };
    case SET_CONTENT_TYPE_OBJECTS:
        // eslint-disable-next-line no-case-declarations
        let updateValue = state.objects;
        if (state.objects) {
            if (state.objects[action.contentObjectName]) {
                const prep = { [action.contentObjectName]: { ...state.objects[action.contentObjectName], ...action.contentTypeObjects } };
                updateValue = { ...state.objects, ...prep };
            } else {
                const prep = { [action.contentObjectName]: action.contentTypeObjects };
                updateValue = { ...state.objects, ...prep };
            }
        } else {
            updateValue = { [action.contentObjectName]: action.contentTypeObjects };
        }
        return {
            ...state,
            objects: updateValue,
            isFetching: false,
            objectsErrorMessage: null,
        };
    case CLEAR_CONTENT_TYPE_OBJECTS:
        // eslint-disable-next-line no-case-declarations
        let deleteObject = state.objects;
        if (state.objects) {
            if (state.objects[action.contentObjectName]) {
                const prep = { [action.contentObjectName]: undefined };
                deleteObject = { ...state.objects, ...prep };
            }
        }
        // eslint-disable-next-line no-case-declarations
        let deleteDependsObjects = state.object;
        if (state.object && state.object[action.contentObjectName]) {
            deleteDependsObjects = { ...state.object, ...{ [action.contentObjectName]: undefined } };
        }
        return {
            ...state,
            objects: deleteObject,
            object: deleteDependsObjects,
            isFetching: false,
            objectsErrorMessage: null,
        };
    case SET_RELATIONS_OBJECTS:
        // eslint-disable-next-line no-case-declarations
        let updatedRelations = state.relations;
        if (state.relations) {
            if (state.relations[action.contentObjectName]) {
                const prep = { [action.contentObjectName]: { ...state.relations[action.contentObjectName], ...action.contentRelationObjects } };
                updatedRelations = { ...state.relations, ...prep };
            } else {
                const prep = { [action.contentObjectName]: action.contentRelationObjects };
                updatedRelations = { ...state.relations, ...prep };
            }
        } else {
            updatedRelations = { [action.contentObjectName]: action.contentRelationObjects };
        }
        return {
            ...state,
            relations: updatedRelations,
            isFetching: false,
            // objectsErrorMessage: null,
        };
    case SET_CTD_TOTAL_PAGE:
        return {
            ...state,
            ctdTotalPages: action.totalPages,
        };
    case SET_TOTAL_PAGE:
        return {
            ...state,
            totalPages: { ...state.totalPages, [action.contentObjectName]: action.totalPages },
        };
    case SET_CONTENT_OBJECT:
        // eslint-disable-next-line no-case-declarations
        let updateObj = state.object;
        if (state.object) {
            if (state.object[action.ctoName]) {
                const prep = {
                    [action.ctoName]: {
                        ...state.object[action.ctoName],
                        ...{
                            [action.contentObject.id]: action.contentObject,
                        },
                    },
                };
                updateObj = { ...state.object, ...prep };
            } else {
                const prep = { [action.ctoName]: { [action.contentObject.id]: action.contentObject } };
                updateObj = { ...state.object, ...prep };
            }
        } else {
            updateObj = { [action.ctoName]: { [action.contentObject.id]: action.contentObject } };
        }
        return {
            ...state,
            object: updateObj,
            isFetching: false,
            errorMessage: null,
        };
    case CLEAR_CONTENT_OBJECT:
        // eslint-disable-next-line no-case-declarations
        let deletedObject = state.object;
        if (state.object) {
            if (state.object[action.ctoName][action.objectId]) {
                const prep = { ...state.object[action.ctoName], ...{ [action.objectId]: undefined } };
                deletedObject = { ...state.object, ...{ [action.ctoName]: prep } };
            }
        }
        return {
            ...state,
            object: deletedObject,
            isFetching: false,
            errorMessage: null,
        };
    case RESET_CONTENT_OBJECT:
        if (!state.object || !state.object[action.ctoName]) return state;
        // eslint-disable-next-line no-case-declarations
        const updated = filterObjectList(state.object[action.ctoName], action.contentObject, action.ctoName);
        return {
            ...state,
            object: { ...state.object, ...{ [action.ctoName]: updated } },
            isFetching: false,
            errorMessage: null,
        };
    case FETCHING_FAILURE:
        return {
            ...state,
            isFetching: false,
            errorMessage: action.errorMessage,
        };
    case FETCHING_OBJECTS_FAILURE:
        return {
            ...state,
            isFetching: false,
            objectsErrorMessage: action.objectsErrorMessage,
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
    case LOGOUT:
        return undefined;
    }
    return state;
};

const persistConfig = {
    key: 'contentTypes',
    storage: AsyncStorage,
    whitelist: [
        'definitions',
        'objects',
        'object',
        'totalPages',
        'ctdTotalPages',
        'partOfTitleProperties',
        'withRichTextProperties',
        'relations',
    ],
};

export default persistReducer(persistConfig, reducer);
