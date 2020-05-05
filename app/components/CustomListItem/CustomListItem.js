import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../helpers/constants/colors';
import styles from './styles';

const CustomListItem = (props) => {
    if (props.withGradient) {
        return (
            <LinearGradient
                colors={[
                    Colors.gradient.primary,
                    Colors.gradient.secondary,
                ]}
                useAngle
                angle={50}
                angleCenter={{ x: 0.7, y: 1 }}
                style={styles.container}
            >
                {props.children}
            </LinearGradient>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.defaultBackground}>
                {props.children}
            </View>
        </View>
    );
};

export default CustomListItem;
