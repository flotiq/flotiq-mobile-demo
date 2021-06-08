import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';

const ListFooterIndicator = () => (
    <View style={styles.listFooterLoader}>
        <ActivityIndicator />
    </View>
);

export default ListFooterIndicator;
