import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text } from 'react-native-elements';
import CustomBtn from '../../components/CustomBtn/CustomBtn';

import * as authActions from '../../store/actions/auth';

import Colors from '../../helpers/constants/colors';
import styles from './styles';

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const isFetching = useSelector((state) => state.auth.isFetching);

    const [isLoading, setIsLoading] = useState(isFetching);

    useEffect(() => {
        if (!isFetching && isLoading) {
            setIsLoading(false);
        }
    }, [isFetching, isLoading]);

    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hide();
        }
    }, [isLoading]);

    const deleteApiKey = () => {
        dispatch(authActions.removeApiToken());
    };

    const loader = () => (
        <View style={[styles.indicatorContainer, styles.indicatorHhorizontal]}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );

    if (isLoading) {
        return loader();
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.screenContainer}>
                <View style={styles.header}>
                    <Text h2 h2Style={styles.h2Style}>Welcome to Flotiq</Text>
                    <Text h2 h2Style={styles.h2Style}>Demo App</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.paragraph}>You can use this demo to look at your content from Flotiq Headless CMS</Text>
                </View>
                <View style={styles.btnContainer}>
                    <CustomBtn
                        title="Go to Content Types List"
                        onPressBtn={() => props.navigation.navigate('ContentTypesScreen')}
                        buttonStyle={styles.btn}
                    />
                    <CustomBtn
                        title="Remove API Key"
                        onPressBtn={() => deleteApiKey()}
                        buttonStyle={styles.btnDanger}
                        titleStyle={{ color: '#000000' }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
