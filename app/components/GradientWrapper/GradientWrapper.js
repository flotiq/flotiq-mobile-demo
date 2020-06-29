import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../helpers/constants/colors';
import styles from './styles';

const GradientWrapper = (props) => (
    <View style={styles.container}>
        <LinearGradient
            colors={[
                Colors.gradient.primary,
                Colors.gradient.secondary,
            ]}
            useAngle
            angle={200}
            angleCenter={{ x: 0.4, y: 0 }}
            style={styles.linearGradient}
        >
            {props.children}
        </LinearGradient>
    </View>
);

export default GradientWrapper;
