import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_API_TOKEN,
    CLEAR_ERROR,
    FETCHING,
    FETCHING_FAILURE,
    LOGOUT,
    TOKEN_IS_INVALID } from '../actions/auth';

const initialState = {
    apiToken: null,
    errorMessage: null,
    isFetching: true,
    isTokenInvalid: false,
};

const reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
    case SET_API_TOKEN:
        return {
            ...state,
            apiToken: action.apiToken,
            errorMessage: action.errorMessage,
            isFetching: false,
            isTokenInvalid: false,
        };
    case CLEAR_ERROR:
        return {
            ...state,
            errorMessage: null,
            isTokenInvalid: false,
        };
    case FETCHING:
        return {
            ...state,
            isFetching: action.state,
        };
    case FETCHING_FAILURE:
        return {
            ...state,
            isFetching: false,
            errorMessage: action.errorMessage,
        };
    case TOKEN_IS_INVALID:
        return {
            ...state,
            isFetching: false,
            isTokenInvalid: true,
        };
    case LOGOUT:
        return undefined;
    }
    return state;
};

const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['apiToken'],
};

export default persistReducer(persistConfig, reducer);
