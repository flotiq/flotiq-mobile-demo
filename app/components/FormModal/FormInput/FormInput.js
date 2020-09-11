import React from 'react';
import { Input, Text } from 'react-native-elements';

import styles from './styles';

const FormInput = (props) => {
    const { value, onChangeValue, keyboardType, text, errorMessage, readOnly, isEdited } = props;

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
        // eslint-disable-next-line default-case
        switch (keyboardType) {
        case 'textarea':
            return true;
        case 'richtext':
            return true;
        case 'textMarkdown':
            return true;
        }
        return false;
    };

    return (
        <>
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
