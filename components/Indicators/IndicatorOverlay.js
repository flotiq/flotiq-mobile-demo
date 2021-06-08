import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import Colors from '../../helpers/constants/colors';
import styles from './styles';

const IndicatorOverlay = () => (
    <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
        <ActivityIndicator size="large" color={Colors.primary} />
    </View>
);

export default IndicatorOverlay;
