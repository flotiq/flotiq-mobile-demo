import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';
import IndicatorOverlay from '../../Indicators/IndicatorOverlay';

import styles from './styles';


const ImagePreview = (props) => {
    const { picked, imgPreviewUrl, containerStyle } = props;

    return (
        <View style={[styles.imageContainer, containerStyle]}>
            {(picked && imgPreviewUrl)
                ? (
                    <Image
                        key={picked}
                        source={{
                            uri: imgPreviewUrl,
                        }}
                        style={styles.image}
                        resizeMode="contain"
                        PlaceholderContent={<IndicatorOverlay />}
                    />
                )
                : <View><Text>no image</Text></View>}
        </View>
    );
};

export default ImagePreview;
