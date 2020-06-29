import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, queryCache } from 'react-query';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import * as contentTypesAction from '../../store/actions/contentTypes';

import ApiTokenError from '../../api/http/errors/apiTokenError';
import ApiNoDataError from '../../api/http/errors/apiNoDataError';
import * as authTypesActions from '../../store/actions/auth';
import * as httpCT from '../../api/http/rquests/contentTypes';
import { fetchingDataErrorAlert } from '../../helpers/alertsHelper';

import ListItemWIthHtmlContent from '../../components/ListItemWithHtmlContent/ListItemWithHtmlContent';
import IndicatorOverlay from '../../components/Indicators/IndicatorOverlay';
import ListHeaderIndicator from '../../components/Indicators/List/Header/ListHeaderIndicator';

import styles from './styles';

const ObjectScreen = (props) => {
    const { objectId, ctoName, withReachTextProps } = props.route.params;
    const contentObject = useSelector((state) => state.contentTypes.object);
    const dispatch = useDispatch();

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
    } = useQuery((ctoName && objectId) && [ctoName, objectId], httpCT.fetchContentObject, {
        retry: 1,
        onError: (err) => {
            const noPersistedData = !contentObject || !contentObject[ctoName] || !contentObject[ctoName][objectId];
            if (netInfo.isInternetReachable) {
                if (err instanceof ApiTokenError) {
                    dispatch(authTypesActions.validateApiToken(false));
                    return;
                }
                if (err instanceof ApiNoDataError) {
                    dispatch(contentTypesAction.clearContentObject(ctoName, objectId));
                    fetchingDataErrorAlert(err.message).then(() => {
                        queryCache.removeQueries(ctoName);
                        props.navigation.navigate({
                            name: 'ContentTypeObjectsScreen',
                            params: {
                                refetchData: true,
                            },
                        });
                    });
                    return;
                }
            }
            if (noPersistedData) {
                fetchingDataErrorAlert(err.message).then(() => {
                    queryCache.removeQueries(ctoName);
                    props.navigation.navigate('ContentTypeObjectsScreen');
                });
            } else {
                Toast.showWithGravity(err.message, Toast.LONG, Toast.CENTER);
            }
        },
        onSuccess: (dat) => {
            dispatch(contentTypesAction.setContentObject(ctoName, data));
            return dat;
        },
    });

    if ((isFetching || status === 'loading')
        && (!contentObject || !contentObject[ctoName] || !contentObject[ctoName][objectId])) {
        return <IndicatorOverlay />;
    }

    const renderItem = (item) => Object.keys(item.item).map((el, i) => (el !== 'object_data'
        ? (
            <ListItemWIthHtmlContent
                key={`${item.item.id}-child-${i}`}
                item={item.item[el]}
                element={el}
                withHtml={withReachTextProps}
            />
        )
        : null));
    const listLoader = () => {
        if (status !== 'loading' && isFetching) return <ListHeaderIndicator />;

        return null;
    };

    const returnListData = () => {
        const dataIsNotEmpty = data && data.length > 0;
        const persistedData = contentObject && contentObject[ctoName] && contentObject[ctoName][objectId];
        if (persistedData && (!netInfo.isInternetReachable || !dataIsNotEmpty)) return [contentObject[ctoName][objectId]];
        if (data) return [data];
        return [];
    };

    return (
        <SafeAreaView>
            <FlatList
                keyExtractor={(item) => item.id}
                data={returnListData()}
                renderItem={renderItem}
                ListHeaderComponent={listLoader}
                refreshing={status === 'loading' && !isFetching}
                onRefresh={() => refetch()}
            />
        </SafeAreaView>
    );
};

export const contentObjectScreenOptions = ({ route }) => {
    const ctoName = route.params.objectName || 'Details';
    const screenTitle = route.params.objectLabel
        ? `${ctoName} - ${route.params.objectLabel}` : 'Object Details';
    return (
        {
            headerTitle: screenTitle,
            headerTitleStyle: styles.headerOptionsTitle,
        }
    );
};

export default ObjectScreen;
