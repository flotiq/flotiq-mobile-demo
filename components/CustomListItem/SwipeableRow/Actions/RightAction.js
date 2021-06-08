import React from 'react';
import { RectButton } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

const RightAction = ({ close }) => (
    <RectButton style={styles.rightAction} onPress={close}>
        <MaterialIcons
            name="delete-forever"
            size={30}
            color="#fff"
            style={styles.actionIcon}
        />
    </RectButton>
);

export default RightAction;
