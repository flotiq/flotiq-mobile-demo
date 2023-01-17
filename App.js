import "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "react-native";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Font from "expo-font";
import { RootSiblingParent } from "react-native-root-siblings";
import * as SplashScreen from "expo-splash-screen";
import FlotiqNavigator from "./navigation/FlotiqNavigator/FlotiqNavigator";
import contentTypesReducer from "./store/reducers/contentTypes";
import authReducer from "./store/reducers/auth";

enableScreens();

SplashScreen.preventAutoHideAsync();

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
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);
const persistor = persistStore(store);

const fetchFonts = () => Font.loadAsync({
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
});

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if(appIsReady) {
        SplashScreen.hideAsync()
    }
  }, [appIsReady])
  if (!appIsReady) {
    return null;
  }
  return (
    <RootSiblingParent>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
              <FlotiqNavigator />
          </PersistGate>
        </QueryClientProvider>
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
