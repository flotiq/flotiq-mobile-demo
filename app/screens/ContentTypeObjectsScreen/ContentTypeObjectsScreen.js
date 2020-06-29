import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import { Icon } from 'react-native-elements';

import { CommonActions, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, queryCache } from 'react-query';
import * as httpCT from '../../api/http/rquests/contentTypes';

import ApiTokenError from '../../api/http/errors/apiTokenError';
import ApiNoDataError from '../../api/http/errors/apiNoDataError';
import * as authTypesActions from '../../store/actions/auth';
import * as contentTypesActions from '../../store/actions/contentTypes';
import { fetchingDataErrorAlert } from '../../helpers/alertsHelper';
import { transformToHumanRedeableTitle,
    transformToArrayForListData } from '../../helpers/contentTypesHelper';

import Search from '../../components/Search/Search';
import IndicatorOverlay from '../../components/Indicators/IndicatorOverlay';
import ListHeaderIndicator from '../../components/Indicators/List/Header/ListHeaderIndicator';
import ListFooterIndicator from '../../components/Indicators/List/Footer/ListFooterIndicator';
import CustomListItem from '../../components/CustomListItem/CustomListItem';

const ContentTypeObjectsScreen = (props) => {
    const { contentTypeName, partOfTitleProps, withReachTextProps, refetchData } = props.route.params;
    const contentTypeObjects = useSelector((state) => state.contentTypes.objects);
    const totalPagesMax = useSelector((state) => state.contentTypes.totalPages);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [pageNr, setPageNr] = useState(1);

    const route = useRoute();
    const [searchBox, setSearchBox] = useState(false);

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
        fetchMore,
    } = useInfiniteQuery(contentTypeName, httpCT.fetchContentTypeObjects, {
        getFetchMore: (lastGroup) => lastGroup.nextPage,
        retry: 1,
        initialData: () => {
            const persistedData = contentTypeObjects && contentTypeObjects[contentTypeName];
            if (persistedData && !netInfo.isInternetReachable) {
                return transformToArrayForListData(contentTypeObjects, contentTypeName);
            }
        },
        onError: (err) => {
            const noPersistedData = !contentTypeObjects || !contentTypeObjects[contentTypeName];
            if (netInfo.isInternetReachable) {
                if (err instanceof ApiTokenError) {
                    dispatch(authTypesActions.validateApiToken(false));
                    return;
                }
                if (err instanceof ApiNoDataError) {
                    dispatch(contentTypesActions.clearContentTypeObjects(contentTypeName));
                    fetchingDataErrorAlert(err.message).then(() => {
                        queryCache.removeQueries(contentTypeName);
                        props.navigation.navigate({
                            name: 'ContentTypesScreen',
                            params: {
                                refetchCTData: true,
                            },
                        });
                    });
                    return;
                }
            }

            if (noPersistedData) {
                fetchingDataErrorAlert(err.message).then(() => {
                    queryCache.removeQueries(contentTypeName);
                    props.navigation.navigate('ContentTypesScreen');
                });
            } else {
                Toast.showWithGravity(err.message, Toast.LONG, Toast.CENTER);
            }
        },
        onSuccess: (dat) => {
            const dataIndex = dat.length - 1;
            const dataExists = dat && dat[dataIndex] && dat[dataIndex].data;
            if (dataExists) {
                const lastData = dat[dataIndex];
                if (Array.isArray(lastData.data) && (lastData.data.length > 0)) {
                    dispatch(contentTypesActions.setContentTypeObjects(contentTypeName, dat));
                    dispatch(contentTypesActions.setContentTypeObjectsTotalPages(contentTypeName, lastData.totalPages));
                }
            }
            return dat;
        },
    });

    useEffect(() => {
        if (!isFetching && isLoading && (data || contentTypeObjects)) {
            setIsLoading(false);
        }
    }, [contentTypeObjects, isFetching, isLoading, data]);

    useEffect(() => {
        const initPageNr = contentTypeObjects && contentTypeObjects[contentTypeName];
        if (pageNr === 1 && initPageNr && !netInfo.isInternetReachable) {
            if (initPageNr) {
                if (Array.isArray(contentTypeObjects[contentTypeName])) {
                    setPageNr(contentTypeObjects[contentTypeName].length);
                } else {
                    setPageNr(Object.keys(contentTypeObjects[contentTypeName]).length);
                }
            }
        }
    }, [contentTypeName, contentTypeObjects, pageNr, netInfo.isInternetReachable]);

    useEffect(() => {
        if (refetchData) {
            props.navigation.dispatch(CommonActions.setParams({ refetchData: false }));
            if (netInfo.isInternetReachable) refetch();
        }
    }, [props.navigation, netInfo.isInternetReachable, refetchData, refetch]);

    const objectPressHandle = (item) => {
        props.navigation.navigate({
            name: 'ObjectScreen',
            params: {
                objectId: item.id,
                ctoName: contentTypeName,
                objectLabel: transformToHumanRedeableTitle(item, partOfTitleProps),
                withReachTextProps,
            },
        });
    };

    const renderItem = (item) => (item.item.data ? (
        item.item.data.map((el) => (
            <CustomListItem
                key={`${el.id}-cli}`}
                element={el}
                title={transformToHumanRedeableTitle(el, partOfTitleProps)}
                onPress={objectPressHandle}
            />
        ))
    ) : null);

    if (isLoading || ((isFetching || status === 'loading')
        && (!contentTypeObjects || !contentTypeObjects[contentTypeName]))) {
        return <IndicatorOverlay />;
    }

    const headerListLoader = () => {
        if (status === 'loading' || isFetching) {
            return <ListHeaderIndicator />;
        }
        return null;
    };

    const getTotalPages = () => {
        if (totalPagesMax && totalPagesMax[contentTypeName]) {
            return totalPagesMax[contentTypeName];
        }
        return 1;
    };

    const onEndReachedHandler = () => {
        const pageLimit = getTotalPages();
        const isNotLoadingData = status !== 'loading' && !isFetching;
        if (netInfo.isInternetReachable && pageLimit && isNotLoadingData) {
            if ((pageNr + 1) <= pageLimit || (pageNr === pageLimit)) {
                if ((pageNr + 1) <= pageLimit) {
                    setPageNr(pageNr + 1);
                    fetchMore();
                }
            }
        }
    };

    const renderListLoader = () => {
        if (status !== 'loading' && isFetching) {
            return <ListFooterIndicator />;
        }
        return null;
    };

    const getItemLayout = (data, index) => ({
        length: 70,
        offset: 70 * index,
        index,
    });

    const onHandleHideSearchBox = () => {
        props.navigation.dispatch(CommonActions.setParams({ searchBoxVisible: false }));
    };

    const returnListData = () => {
        const dataIsNotEmpty = data && data.length > 0;
        const persistedData = contentTypeObjects && contentTypeObjects[contentTypeName];
        if (persistedData && !netInfo.isInternetReachable) {
            return transformToArrayForListData(contentTypeObjects, contentTypeName);
        }

        if (dataIsNotEmpty) return data;
        return [];
    };

    return (
        <SafeAreaView>
            {(route.params && route.params.searchBoxVisible)
                && (
                    <Search
                        onPress={onHandleHideSearchBox}
                        navigation={props.navigation}
                        preChosenCT={contentTypeName}
                    />
                )}
            <FlatList
                keyExtractor={(item) => item.data[0].id}
                data={returnListData()}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
                onEndReached={onEndReachedHandler}
                onEndReachedThreshold={0.1}
                initialNumToRender={20}
                // maxToRenderPerBatch={1}
                ListFooterComponent={renderListLoader}
                ListHeaderComponent={headerListLoader}
                refreshing={status === 'loading' && !isFetching}
                onRefresh={() => refetch()}
                // windowSize={12}
                // removeClippedSubviews
            />
        </SafeAreaView>
    );
};

export const contentTypeObjectsScreenOptions = ({ route, navigation }) => {
    const screenTitle = route.params.contentTypeLabel
        ? `${route.params.contentTypeLabel} - objects` : 'Content Type Objects';
    return (
        {
            title: screenTitle,
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
                    size={18}
                />
            ),
        }
    );
};

export default ContentTypeObjectsScreen;
