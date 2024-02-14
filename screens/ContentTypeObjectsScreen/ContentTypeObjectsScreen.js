import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-root-toast';
import { Icon } from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { CommonActions, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import * as httpCT from '../../api/http/rquests/contentTypes';

import ApiTokenError from '../../api/http/errors/apiTokenError';
import ApiNoDataError from '../../api/http/errors/apiNoDataError';
import * as authTypesActions from '../../store/actions/auth';
import * as contentTypesActions from '../../store/actions/contentTypes';
import { confirmDeleteAction, fetchingDataErrorAlert, postDataError }
    from '../../helpers/alertsHelper';
import { transformToArrayForListData, transformToHumanReadableTitle }
    from '../../helpers/contentTypesHelper';
import { getDefinitionData } from '../../helpers/definitionObjectsHelper';

import FloatButton from '../../components/FloatButton/FloatButton';
import FormModal from '../../components/FormModal/FormModal';
import NoData from '../../components/NoData/NoData';

import Search from '../../components/Search/Search';
import IndicatorOverlay from '../../components/Indicators/IndicatorOverlay';
import ListHeaderIndicator from '../../components/Indicators/List/Header/ListHeaderIndicator';
import ListFooterIndicator from '../../components/Indicators/List/Footer/ListFooterIndicator';
import CustomListItem from '../../components/CustomListItem/CustomListItem';

const ContentTypeObjectsScreen = (props) => {
    const {
        contentTypeName,
        partOfTitleProps,
        withReachTextProps,
        refetchData,
        contentTypeLabel,
    } = props.route.params;
    const contentTypesDefinitions = useSelector((state) => state.contentTypes.definitions);
    const contentTypeObjects = useSelector((state) => state.contentTypes.objects);
    const totalPagesMax = useSelector((state) => state.contentTypes.totalPages);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState();
    const [pageNr, setPageNr] = useState(1);

    const route = useRoute();
    const [searchBox, setSearchBox] = useState(false);

    const [formModalVisibility, setFormModalVisibility] = useState(false);
    const [editContentId, setEditContentId] = useState(null);
    const [editContent, setEditContent] = useState(null);

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

    let {
        status,
        data,
        refetch,
        isFetching,
        fetchNextPage,
    } = useInfiniteQuery(
        contentTypeName,
        ({ pageParam = 1 }) => httpCT.fetchContentTypeObjects(contentTypeName, pageParam),
        {
            retry: 1,
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            // eslint-disable-next-line consistent-return
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
                            queryClient.invalidateQueries(contentTypeName);
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
                        queryClient.invalidateQueries(contentTypeName);
                        props.navigation.navigate('ContentTypesScreen');
                    });
                } else {
                    Toast.show(
                        err.message,
                        { duration: Toast.durations.LONG, position: Toast.positions.BOTTOM },
                    );
                }
            },
            onSuccess: (dat) => {
                const dataIndex = dat.pages.length - 1;
                if (!dat.pageParams || Array.isArray(dat.pageParams)) {
                    // eslint-disable-next-line no-param-reassign
                    dat.pageParams = dat.pages[dataIndex].pageParams;
                }
                // eslint-disable-next-line no-param-reassign
                delete dat.pages[dataIndex].pageParams;
                dispatch(contentTypesActions.setContentTypeObjects(contentTypeName, dat));
                dispatch(
                    contentTypesActions.setContentTypeObjectsTotalPages(
                        contentTypeName,
                        dat.pageParams.totalPages,
                    ),
                );
                return dat;
            },
        },
    );

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
            if (netInfo.isInternetReachable) {
                refetch();
            }
        }
    }, [props.navigation, netInfo.isInternetReachable, refetchData, refetch]);

    const returnListData = useCallback(() => {
        const dataIsNotEmpty = data && data.pages.length > 0;
        const persistedData = contentTypeObjects && contentTypeObjects[contentTypeName];
        if (persistedData && !netInfo.isInternetReachable) {
            return transformToArrayForListData(contentTypeObjects, contentTypeName);
        }
        if (dataIsNotEmpty) {
            return data.pages.flat();
        }
        return [];
    }, [data, contentTypeName, contentTypeObjects, netInfo.isInternetReachable]);

    const objectPressHandle = (item) => {
        props.navigation.navigate({
            name: 'ObjectScreen',
            params: {
                objectId: item.id,
                ctoName: contentTypeName,
                objectLabel: transformToHumanReadableTitle(item, partOfTitleProps),
                withReachTextProps,
                partOfTitleProps,
            },
        });
    };

    const renderItem = (item) => (item.item.data ? (
        item.item.data.map((el) => (
            <CustomListItem
                key={`${el.id}-cli}`}
                isSwipeable
                element={el}
                title={transformToHumanReadableTitle(el, partOfTitleProps)}
                onPress={objectPressHandle}
                renderLeft={contentTypeName !== '_media'}
                onEdit={() => {
                    setEditContentId(el.id);
                    setEditContent(el);
                    setFormModalVisibility(true);
                }}
                onDelete={() => onDeleteHandler(el.id)}
            />
        ))
    ) : null);

    if (isLoading || isUpdate || ((isFetching || status === 'loading')
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

    const onEndReachedHandler = async () => {
        const pageLimit = Math.max(getTotalPages(), data.pageParams.totalPages);
        const isNotLoadingData = status !== 'loading' && !isFetching;
        if (netInfo.isInternetReachable && pageLimit && isNotLoadingData) {
            if ((pageNr + 1) <= pageLimit || (pageNr === pageLimit)) {
                if ((pageNr + 1) <= pageLimit) {
                    setPageNr(pageNr + 1);
                    fetchNextPage({ pageParam: pageNr + 1 }).then((dat) => {
                        dispatch(contentTypesActions.setContentTypeObjects(contentTypeName, dat));
                        data = dat;
                    });
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

    const getItemLayout = (d, index) => ({
        length: 70,
        offset: 70 * index,
        index,
    });

    const onHandleHideSearchBox = () => {
        props.navigation.dispatch(CommonActions.setParams({ searchBoxVisible: false }));
    };

    const onPressSaveHandler = async (formData) => {
        const isToUpdate = formData.type && formData.type === 'upload';
        const response = formData;
        if (!isToUpdate) {
            const genUuid = uuidv4();
            response.id = editContentId || `${contentTypeName}-${genUuid}`;
        }
        /* TODO: think about action queue - offline state */

        try {
            setIsUpdate(true);
            if (isToUpdate) {
                await httpCT.uploadMedia(response.data);
            } else if (editContentId) {
                await httpCT.updateContentObject(contentTypeName, editContentId, response);

                setEditContentId(null);
                setEditContent(null);
            } else {
                await httpCT.createContentObject(contentTypeName, response);
            }
            setFormModalVisibility(!formModalVisibility);
            setIsUpdate(false);
            refetch();
        } catch (error) {
            postDataError(error.message).then(async (r) => {
                if (r === 'OK') {
                    setIsUpdate(false);
                }
            });
        }
    };

    const onDeleteHandler = async (ctoId) => {
        if (!ctoId) return;
        /* TODO: think about action queue - offline state */
        try {
            confirmDeleteAction('Are you sure?').then(async (r) => {
                if (r === 'CANCEL') return;
                setIsUpdate(true);
                await httpCT.removeContentObject(contentTypeName, ctoId);
                setIsUpdate(false);
                refetch();
            });
        } catch (error) {
            Alert.alert(
                'Error!',
                error.message,
            );
            setIsUpdate(false);
        }
    };
    const convertedData = returnListData();
    return (
        <SafeAreaView style={{ flex: 1, margin: 0, padding: 0 }}>
            {(route.params && route.params.searchBoxVisible)
                && (
                    <Search
                        onPress={onHandleHideSearchBox}
                        navigation={props.navigation}
                        preChosenCT={contentTypeName}
                    />
                )}
            {(convertedData && convertedData[0] && (convertedData[0].data.length > 0))

                ? (
                    <FlatList
                        keyExtractor={(item) => item.data[0].id}
                        data={convertedData}
                        renderItem={renderItem}
                        getItemLayout={getItemLayout}
                        onEndReached={onEndReachedHandler}
                        onEndReachedThreshold={0.1}
                        initialNumToRender={20}
                        ListFooterComponent={renderListLoader}
                        ListHeaderComponent={headerListLoader}
                        refreshing={status === 'loading' && !isFetching}
                        onRefresh={() => refetch()}
                    />
                )
                : (
                    <NoData
                        title="Create your first"
                        message="Object of type"
                        dataType={contentTypeLabel}
                    />
                )}
            {contentTypeName !== "_media" && (<FloatButton
                onPressFloatBtn={() => setFormModalVisibility(!formModalVisibility)}
            />)}
            {(formModalVisibility && contentTypesDefinitions && contentTypeName)
                && (
                    <FormModal
                        edit={editContentId}
                        isModalVisible={formModalVisibility}
                        onPressSave={onPressSaveHandler}
                        onPressCancel={() => {
                            setFormModalVisibility(!formModalVisibility);
                            setEditContentId(null);
                            setEditContent(null);
                        }}
                        dataName={contentTypeName}
                        data={getDefinitionData(contentTypesDefinitions)}
                        partOfTitleProps={partOfTitleProps}
                        cto={editContent}
                    />
                )}
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
                    size={16}
                    disabled
                    disabledStyle={{ display:"none" }}
                />
            ),
        }
    );
};

export default ContentTypeObjectsScreen;
