import React from 'react';
import { Dimensions, View, Text } from 'react-native';

import styles from './styles';

const { width } = Dimensions.get('window');
const smallDeviceScreen = width <= 360;

const NoData = ({ title, message, dataType }) => (
    <View style={styles.container}>
        <View style={styles.textWrapper}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.body}>
                {message}
            </Text>
            <Text
                numberOfLines={smallDeviceScreen ? 4 : 6}
                style={styles.dataTypeName}
            >
                {dataType}
            </Text>
        </View>
    </View>
);

export default NoData;
