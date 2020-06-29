/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer, autoMergeLevel2 } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-community/async-storage';

import FlotiqNavigator from './app/navigation/FlotiqNavigator/FlotiqNavigator';
import contentTypesReducer from './app/store/reducers/contentTypes';
import authReducer from './app/store/reducers/auth';

enableScreens();

const rootReducer = combineReducers({
    auth: authReducer,
    contentTypes: contentTypesReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(ReduxThunk)));
const persistor = persistStore(store)

const App: () => React$Node = () => {
    return (
        <>
            <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'}/>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <FlotiqNavigator />
                </PersistGate>
            </Provider>
        </>
    );
};

export default App;
