import AsyncStorage from '@react-native-community/async-storage';
import { API_URL, API_PREFIX } from '../../helpers/constants/global';
import { parseResponseMessage, checkApiTokenIsValid } from '../../helpers/parseHttpResponse';
import { validateApiToken } from './auth';

export const SET_CONTENT_TYPES = 'SET_CONTENT_TYPES';
export const SET_CONTENT_TYPE_OBJECTS = 'SET_CONTENT_TYPE_OBJECTS';
export const SET_CONTENT_OBJECT = 'SET_CONTENT_OBJECT';
export const SET_FETCHING_ERROR = 'SET_FETCHING_ERROR';
export const CLEAR_ERROR = 'CELAR_ERROR';
export const FETCHING = 'FETCHING';
export const FETCHING_FAILURE = 'FETCHING_FAILURE';
export const FETCHING_OBJECTS = 'FETCHING_OBJECTS';
export const FETCHING_OBJECTS_FAILURE = 'FETCHING_OBJECTS_FAILURE';
export const FETCHING_OBJECT = 'FETCHING_OBJECT';
export const FETCHING_OBJECT_FAILURE = 'FETCHING_OBJECT_FAILURE';

const CONTENTTYPE_URL = `${API_PREFIX}internal/contenttype`;
const CONTENT_URL = `${API_PREFIX}content`;

export const getApiConfig = async () => {
    /* try catch for fetching api key ? */
    const apiToken = await AsyncStorage.getItem('flotiqApiKey');
    const apiUrl = await AsyncStorage.getItem('flotiqApiUrl') || API_URL;
    if (!apiToken) {
        return null;
    }
    return { apiToken, apiUrl };
};

export const fetchContentTypes = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR, state: true });
    dispatch({ type: FETCHING, state: true });
    try {
        const { apiToken, apiUrl } = await getApiConfig();
        if (!apiToken) {
            dispatch(setFetchingFailure('No API key exists!'));
            return;
        }
        const response = await fetch(
            `${apiUrl}${CONTENTTYPE_URL}?auth_token=${apiToken}&hydrate=1`,
        );
        const respData = await response.json();

        if (response.status === 200 && respData) {
            dispatch({
                type: SET_CONTENT_TYPES,
                contentTypesDefinitions: respData.data ? respData.data : respData,
                errorMessage: null,
            });
        } else {
            const errorMess = parseResponseMessage(respData);
            const isApiTokenValid = checkApiTokenIsValid(errorMess);

            if (!isApiTokenValid) {
                dispatch(validateApiToken(false));
                return;
            }
            dispatch({
                type: FETCHING_FAILURE,
                errorMessage: errorMess,
            });
        }
    } catch (error) {
        dispatch(setFetchingFailure(parseResponseMessage(error)));
    }
};

export const fetchContentTypeObjects = (ctoName) => async (dispatch) => {
    await dispatch({ type: CLEAR_ERROR, state: true });
    await dispatch({ type: FETCHING_OBJECTS, state: true });
    try {
        const { apiToken, apiUrl } = await getApiConfig();
        if (!apiToken) {
            dispatch(setFetchingObjectsFailure('No API key exists!'));
            return;
        }
        const response = await fetch(
            `${apiUrl}${CONTENT_URL}/${ctoName}?auth_token=${apiToken}&hydrate=1`,
        );
        const respData = await response.json();

        if (response.status === 200 && respData) {
            dispatch({
                type: SET_CONTENT_TYPE_OBJECTS,
                contentTypeObjects: respData.data ? respData.data : respData,
                objectsErrorMessage: null,
            });
        } else {
            const errorMess = parseResponseMessage(respData);
            const isApiTokenValid = checkApiTokenIsValid(errorMess);

            if (!isApiTokenValid) {
                await dispatch(validateApiToken(false));
                return;
            }
            dispatch({
                type: FETCHING_OBJECTS_FAILURE,
                objectsErrorMessage: errorMess,
            });
        }
    } catch (error) {
        dispatch(setFetchingFailure(parseResponseMessage(error)));
    }
};

export const fetchContentObject = (ctoName, coId) => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR, state: true });
    dispatch({ type: FETCHING_OBJECT, state: true });
    try {
        const { apiToken, apiUrl } = await getApiConfig();
        if (!apiToken) {
            dispatch(setFetchingObjectFailure('No API key exists!'));
            return;
        }
        const response = await fetch(
            `${apiUrl}${CONTENT_URL}/${ctoName}/${coId}?auth_token=${apiToken}&hydrate=1`,
        );
        const respData = await response.json();

        if (response.status === 200 && respData) {
            dispatch({
                type: SET_CONTENT_OBJECT,
                contentObject: [respData.data ? respData.data : respData],
                objectErrorMessage: null,
            });
        } else {
            const errorMess = parseResponseMessage(respData);
            const isApiTokenValid = checkApiTokenIsValid(errorMess);

            if (!isApiTokenValid) {
                dispatch(validateApiToken(false));
                return;
            }
            dispatch({
                type: FETCHING_OBJECT_FAILURE,
                objectErrorMessage: errorMess,
            });
        }
    } catch (error) {
        dispatch(setFetchingFailure(parseResponseMessage(error)));
    }
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
