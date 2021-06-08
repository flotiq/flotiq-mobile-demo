import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-elements';

import * as authActions from '../../store/actions/auth';
import { missingApiKeyAlert, ivalidApiKeyAlert } from '../../helpers/alertsHelper';

import IndicatorOverlay from '../../components/Indicators/IndicatorOverlay';
import ApiInput from '../../components/ApiInput/ApiInput';
import Scanner from '../../components/Scanner/Scanner';
import CustomBtn from '../../components/CustomBtn/CustomBtn';

import styles from './styles';

const flotiqDocsUrl = 'https://flotiq.com/docs/API/';
const invalidTokenMessage = 'You should use valid token. Visit flotiq.com for more details';

const AuthenticationScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const authToken = useSelector((state) => state.auth.apiToken);
    const errorMessage = useSelector((state) => state.auth.errorMessage);
    const isTokenInvalid = useSelector((state) => state.auth.isTokenInvalid);
    const isFetching = useSelector((state) => state.auth.isFetching);

    const [isLoading, setIsLoading] = useState(true);
    const [isShown, setIsShown] = useState(false);

    const hideScanner = () => {
        if (isShown) {
            setIsShown(false);
        }
    };

    const navigateTo = useCallback((target) => {
        navigation.navigate('RootScreen', {
            screen: target,
        });
    }, [navigation]);

    useEffect(() => {
        dispatch(authActions.autoAuthorization());
    }, [dispatch]);

    useEffect(() => {
        if (!authToken && errorMessage && !isLoading && !isTokenInvalid) {
            missingApiKeyAlert(errorMessage).then(() => {
                dispatch(authActions.clearError());
            });
        }
    }, [authToken, errorMessage, isLoading, isTokenInvalid, dispatch]);

    useEffect(() => {
        if (isTokenInvalid && !isLoading) {
            ivalidApiKeyAlert(invalidTokenMessage, flotiqDocsUrl).then(() => {
                dispatch(authActions.clearError());
            });
        }
    }, [isTokenInvalid, isLoading, dispatch]);

    useEffect(() => {
        if (!authToken && !isFetching && isLoading) {
            setIsLoading(false);
        }
    }, [authToken, isFetching, isLoading]);

    useEffect(() => {
        if (authToken && !errorMessage) {
            navigateTo('HomeScreen');
        }
    }, [authToken, errorMessage, navigateTo]);

    const confirmHandle = async (apiToken, apiUrl = null) => {
        if (apiToken) {
            setIsLoading(true);
            dispatch(authActions.setApiToken(apiToken, apiUrl));
        } else {
            setIsLoading(false);
            await missingApiKeyAlert();
        }
    };

    const confirmQRHandle = async (qrData) => {
        hideScanner();
        if (qrData.apiKey) {
            confirmHandle(qrData.apiKey, qrData.apiUrl);
        } else {
            confirmHandle(null);
        }
    };

    if (isLoading) {
        return <IndicatorOverlay />;
    }

    let screen = <Scanner onQRCode={confirmQRHandle} hide={hideScanner} />;
    if (!isShown) {
        screen = (
            <>
                <View style={styles.header}>
                    <Text h2 h2Style={styles.h2Style}>Welcome to Flotiq</Text>
                    <Text h2 h2Style={styles.h2Style}>Demo App</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.paragraph}>
                        You can use this demo to look at your content from Flotiq Headless CMS
                    </Text>
                </View>
                <ApiInput onClick={confirmHandle} />
                <Text style={styles.description}>Qr scan QR code</Text>
                <CustomBtn title="Scan Code" onPressBtn={() => setIsShown(true)} />
            </>
        );
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.screenContainer}>
                {screen}
            </View>
        </ScrollView>
    );
};

export default AuthenticationScreen;
