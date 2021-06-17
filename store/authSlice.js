import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as httpQuery from '../api/http/rquests/auth';
import { API_URL } from '../helpers/constants/global';
import ApiTokenError from '../api/http/errors/apiTokenError';

export const setApiToken = createAsyncThunk(
    'auth/setApiToken',
    async ({ apiToken, apiUrl }, thunkAPI) => {
        try {
            if (apiUrl) {
                await AsyncStorage.setItem('flotiqApiUrl', apiUrl);
            }
            const url = apiUrl || API_URL;
            const result = await httpQuery.checkApiToken(apiToken, url);
            if (!result) {
                return thunkAPI.rejectWithValue('There was an error!');
            }
            await AsyncStorage.setItem('flotiqApiKey', apiToken);
            return apiToken;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const autoAuthorization = createAsyncThunk(
    'auth/autoAuthorization',
    async (_, thunkAPI) => {
        try {
            const apiToken = await AsyncStorage.getItem('flotiqApiKey');
            if (apiToken) {
                const checkValidation = await AsyncStorage.getItem('flotiqApiKeyIsInvalid');
                if (checkValidation) {
                    await AsyncStorage.removeItem('flotiqApiKeyIsInvalid');
                    return thunkAPI.rejectWithValue('TOKEN_IS_INVALID');
                }
                const result = await httpQuery.autoAuthorization(API_URL);
                if (result) {
                    return apiToken;
                }
            } else {
                await thunkAPI.dispatch(removeApiToken());
                return null;
            }
        } catch (error) {
            if (error instanceof ApiTokenError) {
                await thunkAPI.dispatch(removeApiToken());
                return null;
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const removeApiToken = createAsyncThunk(
    'auth/removeApiToken',
    async () => {
        try {
            await AsyncStorage.removeItem('flotiqApiKey');
            await AsyncStorage.removeItem('flotiqApiUrl');
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    },
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        apiToken: '',
        errorMessage: null,
        isFetching: true,
        isTokenInvalid: false,
    },
    reducers: {
        clearError: (state) => {
            state.errorMessage = null;
        },
    },
    extraReducers: {
        [setApiToken.pending]: (state) => {
            state.isFetching = true;
        },
        [setApiToken.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.apiToken = action.payload;
            state.errorMessage = null;
            state.isTokenInvalid = false;
        },
        [setApiToken.rejected]: (state, action) => {
            state.isFetching = false;
            state.errorMessage = action.payload;
            state.apiToken = null;
        },
        [autoAuthorization.pending]: (state) => {
            state.isFetching = true;
        },
        [autoAuthorization.fulfilled]: (state, action) => {
            if (action.payload) {
                state.apiToken = action.payload;
                state.errorMessage = null;
                state.isFetching = false;
                state.isTokenInvalid = false;
            }
        },
        [autoAuthorization.rejected]: (state, action) => {
            state.isFetching = false;
            if (action.payload === 'TOKEN_IS_INVALID') {
                state.isTokenInvalid = true;
            } else {
                state.errorMessage = action.payload;
            }
        },
        [removeApiToken.fulfilled]: (state) => {
            state.apiToken = '';
            state.errorMessage = null;
            state.isFetching = false;
            state.isTokenInvalid = false;
        },
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
