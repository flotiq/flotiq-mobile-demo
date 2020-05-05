import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, SafeAreaView, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from 'react-native-elements';

import * as contentTypesActions from '../../store/actions/contentTypes';
import CustomListItem from '../../components/CustomListItem/CustomListItem';

import { fetchingDataErrorAlert } from '../../helpers/alertsHelper';

import Colors from '../../helpers/constants/colors';
import styles from './styles';

const ContentTypesScreen = (props) => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.contentTypes.errorMessage);
    const isFetching = useSelector((state) => state.contentTypes.isFetching);
    const contentTypesDefinitions = useSelector((state) => state.contentTypes.definitions);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (errorMessage && !isLoading) {
            fetchingDataErrorAlert(errorMessage).then(() => {
                props.navigation.navigate('HomeScreen');
            });
        }
    }, [errorMessage, isLoading, dispatch]);

    useEffect(() => {
        if (!isFetching && isLoading) {
            setIsLoading(false);
        }
    }, [contentTypesDefinitions, isFetching, isLoading]);

    useEffect(() => {
        dispatch(contentTypesActions.fetchContentTypes());
    }, [dispatch]);

    const loader = () => (
        /* @TODO export to external file */
        <View style={[styles.indicatorContainer, styles.indicatorhorizontal]}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );


    const contentTypePressHandle = (item) => {
        props.navigation.navigate({
            name: 'ContentTypeObjectsScreen',
            params: {
                contentTypeId: item.item.id,
                contentTypeName: item.item.name,
                contentTypeLabel: item.item.label,
            },
        });
    };

    const renderItem = (item) => (
        <View style={styles.listItemWrapper}>
            <CustomListItem>
                <ListItem
                    containerStyle={styles.listItemContainer}
                    Component={(prop) => {
                        if (Platform.OS === 'android') {
                            return <TouchableNativeFeedback useForeground {...prop} />;
                        }
                        return <TouchableOpacity useForeground {...prop} />;
                    }}
                    title={item.item.name}
                    titleStyle={styles.title}
                    titleProps={{
                        numberOfLines: 1,
                    }}
                    subtitle={item.item.label}
                    subtitleStyle={styles.subtitle}
                    rightIcon={{
                        name: 'chevron-right',
                        color: '#000000',
                    }}
                    onPress={() => contentTypePressHandle(item)}
                    bottomDivider
                />
            </CustomListItem>
        </View>
    );

    if (contentTypesDefinitions && !isFetching && !errorMessage) {
        return (
            <FlatList
                keyExtractor={(item) => item.id}
                data={contentTypesDefinitions}
                renderItem={renderItem}
            />
        );
    }
    if (isLoading) {
        return loader();
    }
    return (
        <SafeAreaView>
            <View>
                {/* <Text>Invalid API Key</Text> */}
            </View>
        </SafeAreaView>
    );
};

export default ContentTypesScreen;
