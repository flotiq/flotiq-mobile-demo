import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-root-toast';
import { CommonActions, useRoute } from '@react-navigation/native';
import { useQuery, useQueryClient } from 'react-query';
import ApiTokenError from '../../api/http/errors/apiTokenError';
import ApiNoDataError from '../../api/http/errors/apiNoDataError';
import * as httpCT from '../../api/http/rquests/contentTypes';

import IndicatorOverlay from '../../components/Indicators/IndicatorOverlay';
import ListHeaderIndicator from '../../components/Indicators/List/Header/ListHeaderIndicator';
import ListFooterIndicator from '../../components/Indicators/List/Footer/ListFooterIndicator';

import * as authTypesActions from '../../store/actions/auth';
import * as contentTypesActions from '../../store/actions/contentTypes';
import CustomListItem from '../../components/CustomListItem/CustomListItem';
import Search from '../../components/Search/Search';

import { fetchingDataErrorAlert } from '../../helpers/alertsHelper';
import { getPropsWithProperty,
    getContentTypeObjectsListWithProperties } from '../../helpers/contentTypesHelper';

import styles from './styles';

const ContentTypesScreen = (props) => {
    const dispatch = useDispatch();
    const contentTypesDefinitions = useSelector((state) => state.contentTypes.definitions);
    const queryClient = useQueryClient();

    const route = useRoute();

    const [isLoading, setIsLoading] = useState(true);
    const [searchBox, setSearchBox] = useState(false);
    const [pageNr, setPageNr] = useState(1);

    useEffect(() => {
        if (route && route.searchBoxVisible) {
            setSearchBox(!searchBox);
        }
    }, [route, searchBox]);

    const [netInfo, setNetInfo] = useState({
        isConnected: true,
        isInternetReachable: true,
    });

    useEffect(() => {
        NetInfo.fetch().then((state) => {
            const connected = state.isConnected && state.isInternetReachable;
            if (!connected) {
                setNetInfo({
                    isConnected: state.isConnected,
                    isInternetReachable: state.isInternetReachable,
                });
            }
        });
    }, []);

    const {
        status,
        data,
        refetch,
        isFetching,
    } = useQuery('contentTypes', httpCT.fetchContentTypes, {
        retry: 1,
        onError: (err) => {
            if (netInfo.isInternetReachable) {
                if (err instanceof ApiTokenError) {
                    dispatch(authTypesActions.validateApiToken(false));
                    return;
                }
                if (err instanceof ApiNoDataError) {
                    dispatch(contentTypesActions.clearContentTypeDefinitions());
                    fetchingDataErrorAlert(err.message).then(() => {
                        queryClient.invalidateQueries('contentTypes');
                        props.navigation.navigate('HomeScreen');
                    });
                    return;
                }
            }

            if (!contentTypesDefinitions) {
                fetchingDataErrorAlert(err.message).then(() => {
                    queryClient.invalidateQueries('contentTypes');
                    props.navigation.navigate('HomeScreen');
                });
            } else {
                Toast.show(
                    err.message,
                    { duration: Toast.duration.LONG, position: Toast.positions.BOTTOM },
                );
            }
        },
        onSuccess: (dat) => {
            const dataExists = dat && dat.length > 0;
            if (dataExists) {
                if (dataExists && Array.isArray(dat)) {
                    dispatch(contentTypesActions.setContentTypeDefinitions(dat));
                }
            }
            return dat;
        },
    });

    useEffect(() => {
        const initPageNr = contentTypesDefinitions;
        if (pageNr === 1 && initPageNr && !netInfo.isInternetReachable) {
            if (initPageNr) {
                if (Array.isArray(contentTypesDefinitions)) {
                    setPageNr(contentTypesDefinitions.length);
                } else {
                    setPageNr(Object.keys(contentTypesDefinitions).length);
                }
            }
        }
    }, [contentTypesDefinitions, pageNr, netInfo.isInternetReachable]);

    useEffect(() => {
        const routeParam = route && route.params;
        if (routeParam && routeParam.refetchCTData) {
            props.navigation.dispatch(CommonActions.setParams({ refetchCTData: false }));
            refetch();
        }
    }, [props.navigation, netInfo.isInternetReachable, refetch, route]);

    useEffect(() => {
        if (!isFetching && isLoading) {
            setIsLoading(false);
        }
    }, [contentTypesDefinitions, isFetching, isLoading]);

    const contentTypePressHandle = (item) => {
        const confProp = item.metaDefinition.propertiesConfig || null;
        props.navigation.navigate({
            name: 'ContentTypeObjectsScreen',
            params: {
                ...route.params,
                contentTypeId: item.id,
                contentTypeName: item.name,
                contentTypeLabel: item.label,
                partOfTitleProps: getPropsWithProperty(confProp, 'isTitlePart', [true]),
                withReachTextProps: getPropsWithProperty(confProp, 'inputType', ['richtext', 'textMarkdown']),
            },
        });
    };

    const returnListData = useCallback(() => {
        const dataIsNotEmpty = data && data.length > 0;
        if (contentTypesDefinitions && (!netInfo.isInternetReachable || !dataIsNotEmpty)) {
            return contentTypesDefinitions;
        }
        if (dataIsNotEmpty) return data;
        return [];
    }, [contentTypesDefinitions, data, netInfo.isInternetReachable]);

    /* Params set to use in Search cmp */
    useEffect(() => {
        const listData = returnListData();
        const partOfTitlePropsList = getContentTypeObjectsListWithProperties(
            returnListData(), 'isTitlePart', [true],
        );
        const withRichTextPropsList = getContentTypeObjectsListWithProperties(
            returnListData(), 'inputType', ['richtext', 'textMarkdown'],
        );
        if (partOfTitlePropsList && withRichTextPropsList && listData.length > 0) {
            props.navigation.dispatch(CommonActions.setParams({
                contentTypes: listData,
                partOfTitlePropsList,
                withRichTextPropsList,
            }));
        }
    }, [returnListData, props.navigation]);

    const renderItem = (item) => (item.item ? (
        <View
            key={`${item.item.id}-view}`}
            style={styles.listItemWrapper}
        >
            <CustomListItem
                element={item.item}
                title={item.item.label || item.item.name}
                onPress={contentTypePressHandle}
            />
        </View>
    ) : null);

    const onHandleHideSearchBox = () => {
        props.navigation.dispatch(CommonActions.setParams({ searchBoxVisible: false }));
    };

    if (isLoading && !contentTypesDefinitions) {
        return <IndicatorOverlay />;
    }

    const headerListLoader = () => {
        if (status === 'loading') {
            return <ListHeaderIndicator />;
        }
        return null;
    };

    const renderListLoader = () => {
        if (status !== 'loading' && isFetching) {
            return <ListFooterIndicator />;
        }
        return null;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {(route.params && route.params.searchBoxVisible)
                && (
                    <Search
                        onPress={onHandleHideSearchBox}
                        navigation={props.navigation}
                    />
                )}
            <FlatList
                keyExtractor={(item) => item.id}
                data={returnListData()}
                renderItem={renderItem}
                ListFooterComponent={renderListLoader}
                ListHeaderComponent={headerListLoader}
                refreshing={status === 'loading' && !isFetching}
                onRefresh={() => refetch()}
            />
        </SafeAreaView>
    );
};

export const contentTypesScreenOptions = ({ navigation }) => (
    {
        title: 'Content Types List',
        headerRight: () => (
            <Icon
                reverse
                reverseColor="#3C7A80"
                onPress={() => {
                    navigation.dispatch(CommonActions.setParams({ searchBoxVisible: true }));
                }}
                name="search"
                type="material"
                color="#ffffff"
                containerStyle={{ marginRight: 20 }}
                size={16}
            />
        ),
    }
);

export default ContentTypesScreen;
