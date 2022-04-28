import * as React from 'react';
import { Text,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform } from 'react-native';
import { StackActions } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';

import * as authActions from '../../store/actions/auth';

const CustomDrawer = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;
    const apiToken = useSelector((state) => state.auth.apiToken);
    const TouchableCmp = (Platform.OS === 'android' && Platform.Version >= 21)
        ? TouchableNativeFeedback : TouchableOpacity;

    const removeApiKey = () => {
        dispatch(authActions.removeApiToken());
    };

    if (!apiToken) {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableCmp
                        onPress={() => navigation.navigate('AuthenticationScreen - Sign In')}
                        style={styles.touchCmp}
                    >
                        <View>
                            <Text style={styles.uglyDrawerItem}>
                                Sign In
                            </Text>
                        </View>
                    </TouchableCmp>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableCmp
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={styles.touchCmp}
                >
                    <View>
                        <Text style={styles.uglyDrawerItem}>
                            Home
                        </Text>
                    </View>
                </TouchableCmp>
                <TouchableCmp
                    onPress={() => {
                        navigation.dispatch(StackActions.popToTop());
                        navigation.navigate('ContentTypesScreen');
                    }}
                    style={styles.touchCmp}
                >
                    <View>
                        <Text style={styles.uglyDrawerItem}>
                            Content Types List
                        </Text>
                    </View>
                </TouchableCmp>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableCmp
                    onPress={() => removeApiKey()}
                    style={styles.touchCmp}
                >
                    <View>
                        <Text style={styles.removeDrawerItem}>
                            Remove API Key
                        </Text>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
};

export default CustomDrawer;
