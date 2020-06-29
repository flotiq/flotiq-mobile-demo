import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';

const ListHeaderIndicator = () => (
    <View style={styles.listHeaderLoader}>
        <ActivityIndicator />
    </View>
);

export default ListHeaderIndicator;
