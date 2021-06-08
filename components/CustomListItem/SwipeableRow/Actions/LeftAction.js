import React from 'react';
import { RectButton } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

const LeftAction = ({ close }) => (
    <RectButton style={styles.leftAction} onPress={close}>
        <MaterialIcons
            name="edit"
            size={30}
            color="#fff"
            style={styles.actionIcon}
        />
    </RectButton>
);

export default LeftAction;
