import * as React from 'react';
import { Platform, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import AuthenticationScreen from '../../screens/AuthenticationScreen/AuthenticationScreen';
import ContentTypesScreen, { contentTypesScreenOptions }
    from '../../screens/ContentTypesScreen/ContentTypesScreen';
import ContentTypeObjectsScreen, { contentTypeObjectsScreenOptions }
    from '../../screens/ContentTypeObjectsScreen/ContentTypeObjectsScreen';
import SearchResultsObjectsScreen, { searchResultsObjectsScreenOptions }
    from '../../screens/SearchResultsObjectsScreen/SearchResultsObjectsScreen';
import SearchResultObjectScreen, { searchResultObjectScreenOptions }
    from '../../screens/SearchResultObjectScreen/SearchResultObjectScreen';
import ObjectScreen, { contentObjectScreenOptions } from '../../screens/ObjectScreen/ObjectScreen';

import CustomDrawer from '../../components/CustomDrawer/CustomDrawer';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const WIDTH = Dimensions.get('window').width;
const defaultStatusBarLeftMargin = Platform.OS === 'android' ? -35 : 25;
const defaultScreenOptions = () => (
    {
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: 'Inter-Bold',
            fontSize: 20,
            paddingHorizontal: 20,
            marginLeft: defaultStatusBarLeftMargin,
            width: WIDTH - 100,
        },
        headerBackground: () => (
            <GradientWrapper />
        ),
    }
);

const AuthenticationStackScreen = () => (
    <Stack.Navigator
        screenOptions={defaultScreenOptions()}
    >
        <Stack.Screen
            name="AuthenticationScreen - Sign In"
            component={AuthenticationScreen}
            options={
                {
                    ...defaultScreenOptions(),
                    title: 'Sign In',
                    headerTitleStyle: {
                        marginLeft: 0,
                    },
                }
            }
        />
    </Stack.Navigator>
);

const HomeStackScreen = () => (
    <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
            title: 'Welcome!',
            headerTitleStyle: {
                marginLeft: 0,
            },
        }}
    />
);

const ContentTypesStackScreen = () => (
    <>
        <Stack.Screen
            name="ContentTypesScreen"
            component={ContentTypesScreen}
            options={contentTypesScreenOptions}
        />
        <Stack.Screen
            title="Content Type Objects"
            name="ContentTypeObjectsScreen"
            component={ContentTypeObjectsScreen}
            options={contentTypeObjectsScreenOptions}
        />
        <Stack.Screen
            title="Object Details"
            name="ObjectScreen"
            component={ObjectScreen}
            options={contentObjectScreenOptions}
        />
    </>
);

const SearchStackScreen = () => (
    <>
        <Stack.Screen
            title="Search Results"
            name="SearchResultsObjectsScreen"
            component={SearchResultsObjectsScreen}
            options={searchResultsObjectsScreenOptions}
        />
        <Stack.Screen
            title="Search Result"
            name="SearchResultObjectScreen"
            component={SearchResultObjectScreen}
            options={searchResultObjectScreenOptions}
        />
    </>
);

export const RootStackNavigator = (props) => (
    <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={defaultScreenOptions()}
    >
        {HomeStackScreen()}
        {ContentTypesStackScreen()}
        {SearchStackScreen()}
    </Stack.Navigator>
);

export const MainNavigator = ({ route }) => {
    const authToken = useSelector((state) => state.auth.apiToken);
    return (
        <Drawer.Navigator
            defaultScreenOptions={defaultScreenOptions}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            {!authToken
                ? (
                    <Drawer.Screen
                        name="AuthenticationScreen - Main"
                        component={AuthenticationStackScreen}
                        options={{
                            title: 'Authentication',
                            headerTitleStyle: {
                                marginLeft: 0,
                            },
                        }}
                    />
                )
                : (
                    <Drawer.Screen
                        name="RootScreen"
                        component={RootStackNavigator}
                        options={{
                            title: 'Flotiq Mobile Demo App',
                            headerTitleStyle: {
                                marginLeft: 0,
                            },
                        }}
                    />
                )}
        </Drawer.Navigator>
    );
};

export default MainNavigator;
