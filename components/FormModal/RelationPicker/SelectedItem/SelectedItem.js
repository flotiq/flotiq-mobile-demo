import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import TouchableFeedback from '../../../TouchableFeedback/TouchableFeedback';
import ImagePreview from '../../ImagePreview/ImagePreview';
import { getImageUrl,
    isMedia,
    transformToHumanReadableTitle } from '../../../../helpers/contentTypesHelper';

const SelectedItem = ({
    item,
    onDelete,
}) => (
    <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.itemText} numberOfLines={1}>
                { transformToHumanReadableTitle(item) }
            </Text>
            <TouchableFeedback
                onPress={() => onDelete(item)}
            >
                <View
                    style={styles.clearButton}
                >
                    <Icon
                        name="close"
                        size={24}
                        color="#fff"
                    />
                </View>
            </TouchableFeedback>
        </View>
        {isMedia(item)
            && (
                <View style={styles.preview}>
                    <ImagePreview
                        picked={item}
                        imgPreviewUrl={getImageUrl(item, 800)}
                    />
                </View>
            )}
    </View>
);

export default SelectedItem;
