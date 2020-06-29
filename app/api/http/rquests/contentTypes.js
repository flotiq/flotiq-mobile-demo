import AsyncStorage from '@react-native-community/async-storage';
import ApiTokenError from '../errors/apiTokenError';
import ApiNoDataError from '../errors/apiNoDataError';
import { API_URL, API_PREFIX } from '../../../helpers/constants/global';
import { parseResponseMessage, checkApiTokenIsValid } from '../../../helpers/parseHttpResponse';

const CONTENTTYPE_URL = `${API_PREFIX}internal/contenttype`;
const CONTENT_URL = `${API_PREFIX}content`;

export const getApiConfig = async () => {
    /* try catch for fetching api key ? */
    const apiToken = await AsyncStorage.getItem('flotiqApiKey');
    const apiUrl = await AsyncStorage.getItem('flotiqApiUrl') || API_URL;
    if (!apiToken) {
        throw new Error('Missing API Token!');
    }
    return { apiToken, apiUrl };
};

export const fetchContentTypes = async (name) => {
    const url = `${CONTENTTYPE_URL}?limit=200`;
    const response = await fetchData(url);

    if (!response || !response.data || !response.data.length > 0) {
        throw new ApiNoDataError('Missing data!');
    }
    return response.data;
};

export const fetchContentTypeObjects = async (ctoName, pageNr = 1) => {
    const url = `${CONTENT_URL}/${ctoName}?page=${pageNr}`;

    const response = await fetchData(url);
    if (!response || !response.data || !response.data.length > 0) {
        throw new ApiNoDataError(`Missing data for ${ctoName}!`);
    }
    const nextPageCoursor = response.total_pages >= pageNr + 1 ? pageNr + 1 : false;

    return { data: response.data, nextPage: nextPageCoursor, totalPages: response.total_pages };
};

export const fetchContentObject = async (ctoName, coId) => {
    const url = `${CONTENT_URL}/${ctoName}/${coId}?hydrate=1`;

    const response = await fetchData(url);
    if (!response) {
        throw new ApiNoDataError(`Missing data for ${coId}!`);
    }
    return response;
};

/* TODO: #2 filters */
export const fetchSearchResults = async (name, search, contentTypeName, filters = []) => {
    const encodedFilters = encodeURIComponent(`{"*":{"type":"contains","filter":"${search.trim()}"}}`);
    const url = `${CONTENT_URL}/${contentTypeName}?filters=${encodedFilters}&limit=100`;
    const response = await fetchData(url);

    if (!response || !response.data || !response.data.length > 0) {
        return [];
    }
    return response.data;
};

const fetchData = async (url) => {
    const { apiToken, apiUrl } = await getApiConfig();
    const requestUrl = apiUrl + url;

    let response = null;
    try {
        response = await fetch(requestUrl, {
            headers: {
                'X-AUTH-TOKEN': apiToken,
            },
        });
    } catch (error) {
        throw new Error(error.message);
    }
    const respData = await response.json();

    const noResponse = !response.status || response.status !== 200;
    if (noResponse || !respData) {
        const errorMess = parseResponseMessage(respData);
        const isApiTokenValid = checkApiTokenIsValid(errorMess);

        if (!isApiTokenValid) {
            throw new ApiTokenError('Invalid API token!');
        }
        if (response.status === 404) {
            return null;
        }
        throw new Error(errorMess);
    }
    return respData;
};
