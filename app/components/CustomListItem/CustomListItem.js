import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import TouchableFeedback from '../TouchableFeedback/TouchableFeedback';
import styles from './styles';

const CustomListItem = React.memo(({ element, onPress, title }) => (
    element
        ? (
            <View
                style={styles.container}
            >
                <TouchableFeedback
                    onPress={() => onPress(element)}
                >
                    <View
                        style={styles.listItemContainer}
                    >
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {title || element.id}
                        </Text>

                        <Icon
                            name="chevron-right"
                            color="#000000"
                        />
                    </View>
                </TouchableFeedback>
            </View>
        )
        : null
));

export default CustomListItem;
