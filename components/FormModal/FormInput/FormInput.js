import React from 'react';
import { View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import styles from './styles';

const FormInput = ({
    value,
    onChangeValue,
    keyboardType,
    text,
    errorMessage,
    readOnly,
    isEdited,
    options,
}) => {
    const setKeyboardType = () => {
        let type = 'default';
        switch (keyboardType) {
        case 'email':
            type = 'email-address';
            break;
        case 'number':
            type = 'numeric';
            break;
        default:
            break;
        }
        return type;
    };

    const isMultiline = () => {
        switch (keyboardType) {
        case 'textarea':
            return true;
        case 'richtext':
            return true;
        case 'textMarkdown':
            return true;
        default:
            return false;
        }
    };

    const isSelect = keyboardType === 'select';

    return (
        <>
            {isSelect ? (
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>{text}</Text>
                    <Picker
                        selectedValue={value}
                        onValueChange={onChangeValue}
                        style={styles.picker}
                    >
                        {options.map(
                            (option) => <Picker.Item label={option} value={option} key={option} />,
                        )}
                    </Picker>
                </View>
            ) : (
                <Input
                    label={text}
                    maxLength={1000}
                    value={value}
                    placeholder={text}
                    keyboardType={setKeyboardType()}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    containerStyle={{ minHeight: 80 }}
                    labelStyle={{ textTransform: 'capitalize' }}
                    onChangeText={onChangeValue}
                    errorMessage={errorMessage}
                    multiline={isMultiline()}
                    disabled={readOnly && isEdited}
                />
            )}
            {(readOnly && isEdited)
            && (
                <Text style={styles.readOnly}>
                    This field is read-only.
                </Text>
            )}
        </>
    );
};

export default FormInput;
