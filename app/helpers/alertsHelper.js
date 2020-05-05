import { Alert, Linking } from 'react-native';

const AUTH_DEFAULT_TITLE = 'Missing API Key!';
const AUTH_DEFAULT_MESSAGE = 'You have to provsside valid Flotiq API Key!';

export const missingApiKeyAlert = (errorMessage) => {
    return new Promise((resolve) => {
        Alert.alert(
            AUTH_DEFAULT_TITLE,
            errorMessage || AUTH_DEFAULT_MESSAGE,
            [
                {
                    text: 'Ok',
                    onPress: () => {
                        resolve('Ok');
                    },
                },
            ],
        );
    });
};

export const ivalidApiKeyAlert = (errorMessage, flotiqDocsUrl) => {
    return new Promise((resolve) => {
        Alert.alert(
            'Invalid API Key!',
            errorMessage,
            [
                {
                    text: 'flotiq.com',
                    onPress: () => {
                        Linking.openURL(flotiqDocsUrl);
                        resolve('Ok');
                    },
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        resolve('Ok');
                    },
                },
            ],
        );
    });
};

export const fetchingDataErrorAlert = (errorMessage) => {
    return new Promise((resolve) => {
        Alert.alert(
            'Fetching data error!',
            errorMessage,
            [
                {
                    text: 'Ok',
                    onPress: () => {
                        resolve('Ok');
                    },
                },
            ],
        );
    });
};
