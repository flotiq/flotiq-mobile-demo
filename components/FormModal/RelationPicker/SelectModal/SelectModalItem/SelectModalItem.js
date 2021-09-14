import React from 'react';
import { View, Text } from 'react-native';

import TouchableFeedback from '../../../../TouchableFeedback/TouchableFeedback';
import ImagePreview from '../../../ImagePreview/ImagePreview';

import styles from './styles';

const SelectModalItem = ({ coId, coName, imgUrl, onPress }) => (
    <TouchableFeedback
        onPress={onPress}
    >
        <View style={styles.pickerItem}>
            <Text
                style={!imgUrl ? styles.itemTitle : styles.itemTitleWithPreview}
                numberOfLines={1}
            >
                {coName}
            </Text>
            {imgUrl
                && (
                    <ImagePreview
                        picked={coId}
                        imgPreviewUrl={imgUrl}
                        containerStyle={styles.preview}
                    />
                )}
        </View>
    </TouchableFeedback>
);

export default SelectModalItem;
