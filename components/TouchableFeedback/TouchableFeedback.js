import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import Colors from '../../helpers/constants/colors';

const TouchableFeedback = (props) => {
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback
                onPress={props.onPress}
                background={Platform.Version >= 21
                    ? TouchableNativeFeedback.Ripple(Colors.accent2, false)
                    : TouchableNativeFeedback.SelectableBackground()}
            >
                {props.children}
            </TouchableNativeFeedback>
        );
    }
    return (
        <TouchableOpacity
            onPress={props.onPress}
            useForeground
        >
            {props.children}
        </TouchableOpacity>
    );
};

export default TouchableFeedback;
