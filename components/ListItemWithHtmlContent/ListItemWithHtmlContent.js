import React from 'react';
import { View, Text, Dimensions, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';
import HTML from 'react-native-render-html';

import CustomImgCmp from './CustomImgCmp/CustomImgCmp';

import { checkIsElPicture } from '../../helpers/contentTypesHelper';
import styles from './styles';
import { isNumber } from '../../helpers/formValidatorHelper';

const CListItem = ({
    el,
    propName,
    containerStyle,
    titleStyle,
    subtitleStyle,
    renderElements,
    index,
}) => (
    <ListItem
        containerStyle={containerStyle}
        bottomDivider
        key={`${Math.random()}-${propName}-${index}`}
    >
        <ListItem.Content>
            {!isNumber(parseInt(propName, 10)) && (
                <ListItem.Title style={titleStyle}>
                    {propName}
                </ListItem.Title>
            )}
            <ListItem.Subtitle
                style={{ ...subtitleStyle, width: Dimensions.get('window').width - 40 }}
            >
                {(renderElements(el, propName))}
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
);

const ListItemWIthHtmlContent = ({ item, element, withHtml }) => {
    /* TODO: pre-cache image loading */

    const renderElements = (el, propName) => {
        const isHtml = withHtml && Array.isArray(withHtml);
        if (typeof el !== 'object') {
            const containHtml = isHtml ? withHtml.includes(propName) : null;
            if (containHtml) {
                const textValue = el.replace(/\r?\n|\r/g, '');
                return (
                    <HTML
                        source={{ html: textValue }}
                        imagesMaxWidth={(Dimensions.get('window').width - 100)}
                        tagsStyles={
                            {
                                p: { width: (Dimensions.get('window').width - 40) },
                                h1: { width: (Dimensions.get('window').width - 40) },
                                h2: { width: (Dimensions.get('window').width - 40) },
                                h3: { width: (Dimensions.get('window').width - 40) },
                                h4: { width: (Dimensions.get('window').width - 40) },
                            }
                        }
                        defaultTextProps={{ textSelectable: true }}
                        onLinkPress={(event, href) => {
                            Linking.openURL(href);
                        }}
                    />
                );
            }
            const isImage = checkIsElPicture(el);
            if (isImage) {
                return <CustomImgCmp url={el} ext={isImage} />;
            }
            return <Text style={styles.itemSubtitle}>{el}</Text>;
        }
        return (
            <View style={{ width: '100%' }}>
                {Object.keys(el).map((e, i) => (
                    <CListItem
                        key={e}
                        el={el[e]}
                        index={i}
                        propName={e}
                        containerStyle={styles.nestedListItemContainer}
                        titleStyle={styles.nestedListTitle}
                        subtitleStyle={styles.nestedSubtitleView}
                        renderElements={renderElements}
                    />
                ))}
            </View>
        );
    };

    return (
        <>
            {(item && element)
                ? (
                    <CListItem
                        el={item}
                        index={-1}
                        propName={element}
                        containerStyle={styles.listItemContainer}
                        titleStyle={styles.listTitle}
                        renderElements={renderElements}
                    />
                )
                : null}
        </>
    );
};

export default ListItemWIthHtmlContent;
