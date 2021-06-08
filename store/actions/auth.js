import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiTokenError from '../../api/http/errors/apiTokenError';
import * as httpQuery from '../../api/http/rquests/auth';
import { API_URL } from '../../helpers/constants/global';

export const SET_API_TOKEN = 'SET_API_TOKEN';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const FETCHING = 'FETCHING';
export const FETCHING_FAILURE = 'FETCHING_FAILURE';
export const TOKEN_IS_INVALID = 'TOKEN_IS_INVALID';
export const SET_ERROR = 'SET_ERROR';
export const LOGOUT = 'LOGOUT';

export const setApiToken = (apiToken, apiUrl = null) => async (dispatch) => {
    dispatch({ type: FETCHING, state: true });
    try {
        if (apiUrl) {
            await AsyncStorage.setItem('flotiqApiUrl', apiUrl);
        }
        const url = apiUrl || API_URL;
        const result = await httpQuery.checkApiToken(apiToken, url);

        if (!result) {
            dispatch(setFetchingFailure('There was an error!'));
            return;
        }

        await AsyncStorage.setItem('flotiqApiKey', apiToken);
        dispatch({
            type: SET_API_TOKEN,
            apiToken,
            errorMessage: null,
        });
    } catch (error) {
        dispatch({
            type: SET_API_TOKEN,
            apiToken: null,
            errorMessage: error.message,
        });
        dispatch(setFetchingFailure(error.message));
    }
};

export const autoAuthorization = () => async (dispatch) => {
    dispatch({ type: FETCHING, state: true });
    try {
        const apiToken = await AsyncStorage.getItem('flotiqApiKey');

        if (apiToken) {
            const checkValidation = await AsyncStorage.getItem('flotiqApiKeyIsInvalid');
            if (checkValidation) {
                dispatch(clearValdiationToken());
                dispatch(setTokenIsInvalid());
                return;
            }
            const apiUrl = await getApiUrl();
            const result = await httpQuery.autoAuthorization(apiUrl);

            if (result) {
                dispatch({
                    type: SET_API_TOKEN,
                    apiToken,
                    errorMessage: null,
                });
            }
        } else {
            dispatch(removeApiToken());
        }
    } catch (error) {
        if (error instanceof ApiTokenError) {
            dispatch(removeApiToken());
        } else {
            dispatch(setFetchingFailure(error.message));
        }
    }
};

export const validateApiToken = (isValid = false) => async (dispatch) => {
    try {
        if (!isValid) {
            await AsyncStorage.setItem('flotiqApiKeyIsInvalid', 'true');
            dispatch({
                type: LOGOUT,
            });
        } else {
            await AsyncStorage.removeItem('flotiqApiKeyIsInvalid');
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const clearValdiationToken = () => async () => {
    try {
        await AsyncStorage.removeItem('flotiqApiKeyIsInvalid');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const getApiUrl = async () => {
    const apiUrl = await AsyncStorage.getItem('flotiqApiUrl');
    if (!apiUrl) {
        return API_URL;
    }
    return apiUrl;
};

export const removeApiToken = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem('flotiqApiKey');
        await AsyncStorage.removeItem('flotiqApiUrl');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    } finally {
        dispatch({
            type: LOGOUT,
        });
    }
};

export const clearError = () => ({
    type: CLEAR_ERROR,
});

export const setFetchingFailure = (error) => ({
    type: FETCHING_FAILURE,
    errorMessage: error,
});

export const setTokenIsInvalid = () => ({
    type: TOKEN_IS_INVALID,
});
