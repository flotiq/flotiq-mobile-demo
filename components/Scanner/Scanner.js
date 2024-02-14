import React, { useState, useEffect } from 'react';
import { LogBox, View, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';

import styles from './styles';
import CustomBtn from '../CustomBtn/CustomBtn';

LogBox.ignoreLogs(['BarCodeScanner']);

const Scanner = ({ onQRCode, hide }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        try {
            const parsedData = JSON.parse(data);
            onQRCode(parsedData);
        } catch (error) {
            onQRCode('error');
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ width: Dimensions.get('window').width,
                    height: Dimensions.get('window').width }}
            />
            <View style={styles.containerButton}>
                <CustomBtn
                    title="Close"
                    style={styles.button}
                    onPressBtn={hide}
                />
            </View>
        </View>
    );
};

export default Scanner;

 