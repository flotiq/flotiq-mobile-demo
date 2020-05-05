import AsyncStorage from '@react-native-community/async-storage';
import { API_URL, API_PREFIX } from '../../helpers/constants/global';
import { parseResponseMessage } from '../../helpers/parseHttpResponse';

export const SET_API_TOKEN = 'SET_API_TOKEN';
export const CLEAR_ERROR = 'CELAR_ERROR';
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
        const response = await fetch(
            `${url}${API_PREFIX}internal/contenttype?auth_token=${apiToken}`,
        );

        if (response.status === 200) {
            await AsyncStorage.setItem('flotiqApiKey', apiToken);
            dispatch({
                type: SET_API_TOKEN,
                apiToken,
                errorMessage: null,
            });
        } else {
            const respData = await response.json();
            dispatch({
                type: SET_API_TOKEN,
                apiToken: null,
                errorMessage: parseResponseMessage(respData),
            });
        }
    } catch (error) {
        dispatch(setFetchingFailure(parseResponseMessage(error)));
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
            const response = await fetch(
                `${apiUrl}${API_PREFIX}internal/contenttype?auth_token=${apiToken}`,
            );

            if (response.status === 200) {
                dispatch({
                    type: SET_API_TOKEN,
                    apiToken,
                    errorMessage: null,
                });
            } else {
                dispatch(removeApiToken());
            }
        } else {
            dispatch(removeApiToken());
        }
    } catch (error) {
        dispatch(setFetchingFailure(parseResponseMessage(error)));
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
