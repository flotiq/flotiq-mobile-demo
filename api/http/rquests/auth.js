import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiTokenError from '../errors/apiTokenError';
import { API_URL, API_PREFIX } from '../../../helpers/constants/global';
import { parseResponseMessage, checkApiTokenIsValid } from '../errors/helpers/parseMessage';

export const checkApiToken = async (apiToken, apiUrl = null) => {
    const url = apiUrl || API_URL;
    const response = await fetch(
        `${url}${API_PREFIX}internal/contenttype?auth_token=${apiToken}`,
    );

    if (response.status === 200) {
        await AsyncStorage.setItem('flotiqApiKey', apiToken);
        return apiToken;
    }
    const respData = await response.json();
    const errorMessage = parseResponseMessage(respData);
    throw new ApiTokenError(errorMessage);
};

export const autoAuthorization = async (apiUrl = null) => {
    const apiToken = await AsyncStorage.getItem('flotiqApiKey');

    if (apiToken) {
        const url = apiUrl || await getApiUrl();
        const response = await fetch(
            `${url}${API_PREFIX}internal/contenttype?auth_token=${apiToken}`,
        );

        if (response.status === 200) {
            return apiToken;
        }
        const respData = await response.json();
        const errorMess = parseResponseMessage(respData);
        const isApiTokenValid = checkApiTokenIsValid(errorMess);
        if (!isApiTokenValid) {
            throw new ApiTokenError('Invalid API token!');
        }
        throw new Error(errorMess);
    }
    return false;
};

export const getApiUrl = async () => {
    const apiUrl = await AsyncStorage.getItem('flotiqApiUrl');
    if (!apiUrl) {
        return API_URL;
    }
    return apiUrl;
};
