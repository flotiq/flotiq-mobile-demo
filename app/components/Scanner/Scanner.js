import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CustomBtn from '../CustomBtn/CustomBtn';

import styles from './styles';

const Scanner = (props) => {
    const onReadHandler = (e) => {
        if (e.data) {
            const parsedData = JSON.parse(e.data);
            props.onQRCode(parsedData);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <QRCodeScanner
                    onRead={onReadHandler}
                    fadeIn
                    showMarker
                    markerStyle={styles.marker}
                    containerStyle={styles.scannerContainer}
                    topContent={(
                        <Text style={styles.botomContent}>Scan QR Code</Text>
                    )}
                    bottomContent={(
                        <View>
                            <CustomBtn
                                title="Close"
                                onPressBtn={props.hide}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default Scanner;
