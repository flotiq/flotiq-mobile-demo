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
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import FlotiqNavigator from './app/navigation/FlotiqNavigator/FlotiqNavigator';
import contentTypesReducer from './app/store/reducers/contentTypes';
import authReducer from './app/store/reducers/auth';

enableScreens();

const rootReducer = combineReducers({
    auth: authReducer,
    contentTypes: contentTypesReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App: () => React$Node = () => {
    return (
        <>
            <StatusBar translucent={true} barStyle="light-content" backgroundColor={'transparent'}/>
            <Provider store={store}>
                <FlotiqNavigator />
            </Provider>
        </>
    );
};

export default App;
