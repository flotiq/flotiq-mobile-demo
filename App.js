/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import FlotiqNavigator from './navigation/FlotiqNavigator/FlotiqNavigator';
import contentTypesReducer from './store/reducers/contentTypes';
import authReducer from './store/reducers/auth';

enableScreens();
const queryClient = new QueryClient();

const rootReducer = combineReducers({
    auth: authReducer,
    contentTypes: contentTypesReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(ReduxThunk)));
const persistor = persistStore(store);

const fetchFonts = () => Font.loadAsync({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
});

const App = () => {
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={() => {}}
            />
        );
    }
    return (
        <>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <PersistGate loading={null} persistor={persistor}>
                        <FlotiqNavigator />
                    </PersistGate>
                </QueryClientProvider>
            </Provider>
        </>
    );
};

export default App;
