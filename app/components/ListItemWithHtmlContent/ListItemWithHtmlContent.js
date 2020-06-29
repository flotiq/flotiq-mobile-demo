import React from 'react';
import { View, Text, Dimensions, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';
import HTML from 'react-native-render-html';

import CustomImgCmp from './CustomImgCmp/CustomImgCmp';

import { checkIsElPicture } from '../../helpers/contentTypesHelper';
import styles from './styles';

const ListItemWIthHtmlContent = ({ item, element, withHtml }) => {
    /* TODO: pre-cache image loading */

    const renderElements = (el, type) => {
        let result = el;
        const isHtml = withHtml && Array.isArray(withHtml);
        if (typeof el !== 'object') {
            const containHtml = isHtml ? withHtml.includes(type) : null;
            if (containHtml) {
                const textValue = el.replace(/\r?\n|\r/g, '');
                result = (
                    <HTML
                        html={textValue}
                        imagesMaxWidth={(Dimensions.get('window').width - 100)}
                        textSelectable
                        onLinkPress={(event, href) => {
                            Linking.openURL(href);
                        }}
                    />
                );
            } else {
                result = <Text style={styles.itemSubtitle}>{el}</Text>;
                const isImage = checkIsElPicture(el);
                if (isImage) {
                    result = <CustomImgCmp url={el} ext={isImage} />;
                }
            }
        } else {
            result = Object.keys(el).map((e, i) => {
                if (typeof el[e] === 'object' || Array.isArray(el[e])) {
                    return renderElements(el[e], e);
                }
                const containHtml = isHtml ? withHtml.includes(e) : null;
                const isImage = !containHtml ? checkIsElPicture(el[e]) : false;

                let txtJSX = <Text style={styles.itemSubtitle}>{el[e]}</Text>;
                if (isImage) {
                    txtJSX = <CustomImgCmp url={el[e]} ext={isImage} />;
                }

                return (
                    <ListItem
                        key={`${e}-${i}`}
                        containerStyle={styles.nestedListItemContainer}
                        title={<Text style={styles.nestedListTitle}>{e}</Text>}
                        subtitle={(
                            <View style={styles.nestedSubtitleView}>
                                {(containHtml)
                                    ? (
                                        <HTML
                                            html={el[e]}
                                            imagesMaxWidth={(Dimensions.get('window').width - 100)}
                                            textSelectable
                                            onLinkPress={(event, href) => {
                                                Linking.openURL(href);
                                            }}
                                        />
                                    )
                                    : txtJSX}
                            </View>
                        )}
                        bottomDivider
                    />
                );
            });
        }
        return result;
    };

    return (
        <>
            {(item && element)
                ? (
                    <ListItem
                        containerStyle={styles.listItemContainer}
                        title={<Text style={styles.listTitle}>{element}</Text>}
                        subtitle={(
                            <View style={styles.subtitleView}>
                                {(renderElements(item, element))}
                            </View>
                        )}
                        subtitleStyle={styles.itemSubtitle}
                        bottomDivider
                    />
                )
                : null}
        </>
    );
};

export default ListItemWIthHtmlContent;
