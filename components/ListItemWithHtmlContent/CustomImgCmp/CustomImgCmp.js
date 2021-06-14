import React, { useEffect, useState } from 'react';
import { View, Text, Linking, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';

import IndicatorOverlay from '../../Indicators/IndicatorOverlay';

import TouchableFeedback from '../../TouchableFeedback/TouchableFeedback';
import { MAIN_URL } from '../../../helpers/constants/global';

import styles from './styles';

const getFullUrl = (url, ext) => {
    if (!url || url === '' || !ext) return url;
    return MAIN_URL + url.replace('/0x0/', '/600x0/');
};

const CustomImgCmp = (props) => {
    const { url, ext } = props;
    const [fullUrl, setFullUrl] = useState(url);

    useEffect(() => {
        if (url && ext) {
            const fUrl = getFullUrl(url, ext);
            setFullUrl(fUrl);
        }
    }, [ext, fullUrl, url]);

    return (
        <View
            style={{
                ...styles.imageContainer,
                height: (ext === 'svg') ? 'auto' : 220,
                width: Dimensions.get('window').width - 40,
            }}
        >
            <Text onPress={() => Linking.openURL(fullUrl)}>{fullUrl}</Text>
            {ext === 'svg'
                ? <Text style={styles.text}>SVG image</Text>
                : (
                    <TouchableFeedback
                        onPress={() => Linking.openURL(fullUrl)}
                    >
                        <Image
                            source={{
                                uri: fullUrl,
                            }}
                            style={styles.iamge}
                            resizeMode="contain"
                            PlaceholderContent={<IndicatorOverlay />}
                        />
                    </TouchableFeedback>
                )}
        </View>
    );
};

export default CustomImgCmp;
