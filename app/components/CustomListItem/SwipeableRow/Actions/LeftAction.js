import React from 'react';
import { RectButton } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const LeftAction = ({ close }) => (
    <RectButton style={styles.leftAction} onPress={close}>
        <Icon
            name="edit"
            size={30}
            color="#fff"
            style={styles.actionIcon}
        />
    </RectButton>
);

export default LeftAction;
