import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../helpers/constants/colors';
import styles from './styles';

const GradientWrapper = (props) => {
    const { gradientStyle, containerStyle } = props;

    return (

        <View style={[styles.container, containerStyle]}>
            <LinearGradient
                colors={[
                    Colors.gradient.primary,
                    Colors.gradient.secondary,
                ]}
                useAngle
                angle={200}
                angleCenter={{ x: 0.4, y: 0 }}
                style={[styles.linearGradient, gradientStyle]}
            >
                {props.children}
            </LinearGradient>
        </View>
    );
};

export default GradientWrapper;
