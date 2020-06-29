import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';
import CustomBtn from '../CustomBtn/CustomBtn';

import styles from './styles';


const ApiInput = (props) => {
    const apiToken = useSelector((state) => state.auth.apiToken);
    const [apiValue, setApiValue] = useState('');

    const provideToken = apiToken || apiValue;
    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.containerStyle}
                label="Flotiq Read-Only API Key"
                placeholder="enter api key"
                keyboardType="default"
                value={apiToken && apiToken}
                leftIcon={(
                    <Icon
                        name="key"
                        size={24}
                        color="black"
                    />
                )}
                onChangeText={(text) => setApiValue(text)}
                onSubmitEditing={() => props.onClick(provideToken)}
            />
            <CustomBtn
                buttonStyle={styles.confirmBtn}
                title="Confirm"
                titleStyle={styles.confirmBtnTitle}
                onPressBtn={() => props.onClick(provideToken)}
            />
        </View>
    );
};

export default ApiInput;
