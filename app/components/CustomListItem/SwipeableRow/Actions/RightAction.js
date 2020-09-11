import React from 'react';
import { RectButton } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const RightAction = ({ close }) => (
    <RectButton style={styles.rightAction} onPress={close}>
        <Icon
            name="delete-forever"
            size={30}
            color="#fff"
            style={styles.actionIcon}
        />
    </RectButton>
);

export default RightAction;
