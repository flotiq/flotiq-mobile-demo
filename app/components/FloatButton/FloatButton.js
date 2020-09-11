import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import TouchableFeedback from '../TouchableFeedback/TouchableFeedback';

import styles from './styles';

const FloatButton = (props) => {
    const { onPressFloatBtn } = props;

    return (
        <View style={styles.container}>
            <View style={styles.buttonShape}>
                <TouchableFeedback
                    onPress={onPressFloatBtn}
                >
                    <View style={styles.button}>
                        <Icon
                            name="add"
                            type="material"
                            color="#ffffff"
                            size={38}
                        />
                    </View>
                </TouchableFeedback>
            </View>
        </View>
    );
};

export default FloatButton;
