import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import * as contentTypesAction from '../../store/actions/contentTypes';

import { fetchingDataErrorAlert } from '../../helpers/alertsHelper';

import IndicatorOverlay from '../../components/Indicator/IndicatorOverlay';
import styles, { htmlStyles } from './styles';

const ObjectScreen = (props) => {
    const { objectId, objectName } = props.route.params;
    /* @TODO error messages */
    const errorMessage = useSelector((state) => state.contentTypes.objectErrorMessage);
    const isFetching = useSelector((state) => state.contentTypes.isFetching);
    const contentObject = useSelector((state) => state.contentTypes.object);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (errorMessage && !isLoading) {
            fetchingDataErrorAlert(errorMessage).then(() => {
                props.navigation.navigate('ContentTypeObjectsScreen');
            });
        }
    }, [errorMessage, isLoading, dispatch]);

    useEffect(() => {
        if (!isFetching && isLoading) {
            setIsLoading(false);
        }
    }, [contentObject, isFetching, isLoading]);

    useEffect(() => {
        dispatch(contentTypesAction.fetchContentObject(objectName, objectId));
    }, [dispatch, objectName, objectId]);

    const validateElementValue = (element, type) => {
        let result = element;
        if (typeof element !== 'object') {
            if (type === 'content') {
                const textValue = element.replace(/\r?\n|\r/g, '');
                result = (
                    <HTMLView
                        key={Math.random().toString(36).substring(7)}
                        value={textValue}
                        addLineBreaks={false}
                        stylesheet={htmlStyles}
                    />
                );
            } else {
                result = <Text style={styles.itemSubtitle}>{element}</Text>;
            }
        } else {
            result = Object.keys(element).map((el, i) => {
                if (typeof element[el] === 'object' || Array.isArray(element[el])) {
                    return validateElementValue(element[el], el);
                }
                return (
                    <ListItem
                        key={el}
                        containerStyle={styles.nestedListItemContainer}
                        title={<Text style={styles.nestedListTitle}>{el}</Text>}
                        subtitle={(
                            <View style={styles.nestedSubtitleView}>
                                {(el === 'content')
                                    ? (
                                        <HTMLView
                                            key={Math.random().toString(36).substring(7)}
                                            value={element[el].replace(/\r?\n|\r/g, '')}
                                            addLineBreaks={false}
                                            stylesheet={htmlStyles}
                                        />
                                    )
                                    : <Text style={styles.itemSubtitle}>{element[el]}</Text>}
                            </View>
                        )}
                        bottomDivider
                    />
                );
            });
        }
        return result;
    };

    if (isFetching) {
        return <IndicatorOverlay />;
    }
    const renderItem = (item) => (Object.keys(item.item).map((el, i) => {
        return (
            <ListItem
                key={Math.random().toString(36).substring(7)}
                containerStyle={styles.listItemContainer}
                title={<Text style={styles.listTitle}>{el}</Text>}
                subtitle={(
                    <View style={styles.subtitleView}>
                        {(validateElementValue(item.item[el], el))}
                    </View>
                )}
                subtitleStyle={styles.itemSubtitle}
                bottomDivider
            />
        );
    }));

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={contentObject}
            renderItem={renderItem}
        />
    );
};

export const contentObjectScreenOptions = ({ route }) => {
    const screenTitle = route.params.objectLabel
        ? `${route.params.objectLabel} - details` : 'Object Details';
    return (
        {
            title: screenTitle,
        }
    );
};

export default ObjectScreen;
