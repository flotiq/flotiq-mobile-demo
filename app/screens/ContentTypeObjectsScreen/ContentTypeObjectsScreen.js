import React, { useEffect, useState } from 'react';
import { FlatList, TouchableNativeFeedback, TouchableOpacity, View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from 'react-native-elements';

import * as contentTypesActions from '../../store/actions/contentTypes';
import { fetchingDataErrorAlert } from '../../helpers/alertsHelper';

import IndicatorOverlay from '../../components/Indicator/IndicatorOverlay';
import CustomListItem from '../../components/CustomListItem/CustomListItem';

import styles from './styles';

const ContentTypeObjectsScreen = (props) => {
    const { contentTypeLabel, contentTypeName } = props.route.params;
    const errorMessage = useSelector((state) => state.contentTypes.objectsErrorMessage);
    const isFetching = useSelector((state) => state.contentTypes.isFetching);
    const contentTypeObjects = useSelector((state) => state.contentTypes.objects);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (errorMessage && !isLoading) {
            fetchingDataErrorAlert(errorMessage).then(() => {
                props.navigation.navigate('ContentTypesScreen');
            });
        }
    }, [errorMessage, isLoading, dispatch]);

    useEffect(() => {
        if (!isFetching && isLoading) {
            setIsLoading(false);
        }
    }, [contentTypeObjects, isFetching, isLoading]);

    useEffect(() => {
        dispatch(contentTypesActions.fetchContentTypeObjects(contentTypeName));
    }, [dispatch, contentTypeName]);

    const objectPressHandle = (item) => {
        props.navigation.navigate({
            name: 'ObjectScreen',
            params: {
                objectId: item.item.id,
                objectName: contentTypeName,
                objectLabel: contentTypeLabel,
            },
        });
    };

    const renderItem = (item) => (
        Object.keys(item.item).map((el) => (
            el === 'id' ? (
                <View
                    key={el}
                    style={styles.listItemWrapper}
                >
                    <CustomListItem>
                        <ListItem
                            containerStyle={styles.listItemContainer}
                            Component={(prop) => {
                                if (Platform.OS === 'android') {
                                    return <TouchableNativeFeedback useForeground {...prop} />;
                                }
                                return <TouchableOpacity useForeground {...prop} />;
                            }}
                            title={item.item[el]}
                            titleStyle={styles.title}
                            titleProps={{
                                numberOfLines: 1,
                            }}
                            rightIcon={{
                                name: 'chevron-right',
                                color: '#000000',
                            }}
                            onPress={() => objectPressHandle(item)}
                            bottomDivider
                        />
                    </CustomListItem>
                </View>
            ) : null
        ))
    );
    if (isFetching) {
        return <IndicatorOverlay />;
    }
    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={contentTypeObjects}
            renderItem={renderItem}
        />
    );
};

export const contentTypeObjectsScreenOptions = ({ route }) => {
    const screenTitle = route.params.contentTypeLabel
        ? `${route.params.contentTypeLabel} - objects` : 'Content Type Objects';
    return (
        {
            title: screenTitle,
        }
    );
};

export default ContentTypeObjectsScreen;
