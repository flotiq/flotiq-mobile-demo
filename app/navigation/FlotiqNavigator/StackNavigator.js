import * as React from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import AuthenticationScreen from '../../screens/AuthenticationScreen/AuthenticationScreen';
import ContentTypesScreen from '../../screens/ContentTypesScreen/ContentTypesScreen';
import ContentTypeObjectsScreen, { contentTypeObjectsScreenOptions } from '../../screens/ContentTypeObjectsScreen/ContentTypeObjectsScreen';
import ObjectScreen, { contentObjectScreenOptions } from '../../screens/ObjectScreen/ObjectScreen';

import CustomDrawer from '../../components/CustomDrawer/CustomDrawer';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const defaultStatusBarHeight = Platform.OS === 'android' ? 120 : 90;
const defaultStatusBarLeftMargin = Platform.OS === 'android' ? -35 : 35;
const defaultScreenOptions = () => (
    {
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
            paddingHorizontal: 20,
            marginLeft: defaultStatusBarLeftMargin,
        },
        headerBackground: () => (
            <GradientWrapper />
        ),
        headerStyle: { height: defaultStatusBarHeight },
    }
);

const AuthenticationStackScreen = () => (
    <Stack.Navigator
        initialRouteName="AuthenticationScreen"
        screenOptions={defaultScreenOptions()}
    >
        <Stack.Screen
            name="AuthenticationScreen"
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

const HomeStackScreen = () =>
    /* @TODO defaults */
    (
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                title: 'Flotiq Mobile Demo App',
                headerTitleStyle: {
                    marginLeft: 0,
                },
            }}
        />
    );
const ContentTypesStackScreen = () =>
    /* @TODO defaults */
    (
        <>
            <Stack.Screen
                name="ContentTypesScreen"
                component={ContentTypesScreen}
                options={{
                    title: 'Content Types List',
                }}
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
export const rootStackNavigator = (props) => (
    <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={defaultScreenOptions()}
    >
        {HomeStackScreen()}
        {ContentTypesStackScreen()}
    </Stack.Navigator>
);

export const MainNavigator = ({ route }) => {
    const authToken = useSelector((state) => state.auth.apiToken);

    return (
        <Drawer.Navigator
            initialRouteName="AuthenticationScreen"
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            {!authToken
                ? (
                    <Drawer.Screen
                        name="AuthenticationScreen"
                        component={AuthenticationStackScreen}
                    />
                )
                : (
                    <Drawer.Screen
                        name="RootScreen"
                        component={rootStackNavigator}
                    />
                )}
        </Drawer.Navigator>
    );
};

export default MainNavigator;
