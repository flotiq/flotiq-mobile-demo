import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { Icon } from 'react-native-elements';

import ApiTokenError from '../../../api/http/errors/apiTokenError';
import * as authTypesActions from '../../../store/actions/auth';
import { fetchingDataErrorAlert } from '../../../helpers/alertsHelper';

import * as contentTypesActions from '../../../store/actions/contentTypes';
import ApiNoDataError from '../../../api/http/errors/apiNoDataError';
import PickerItems from './PickerItems/PickerItems';
import ImagePreview from '../ImagePreview/ImagePreview';
import IndicatorOverlay from '../../Indicators/IndicatorOverlay';
import CustomBtn from '../../CustomBtn/CustomBtn';
import TouchableFeedback from '../../TouchableFeedback/TouchableFeedback';

import { IMAGE_URL } from '../../../helpers/constants/global';

import { transformToArrayForListData, transformToHumanReadableTitle }
    from '../../../helpers/contentTypesHelper';

import * as httpCT from '../../../api/http/rquests/contentTypes';

import styles from './styles';

const URL_PREFIX = `${IMAGE_URL}/300x0/`;

const FormPickerWithPagination = (props) => {
    const dispatch = useDispatch();
    const {
        dataContent,
        edited,
        onChangeValue,
        fieldName,
        relatedObjectName,
        editRelations,
    } = props;
    const contentRelationObjects = useSelector((state) => state.contentTypes.relations);
    const totalPagesMax = useSelector((state) => state.contentTypes.totalPages);

    const [picked, setPicked] = useState();
    const [showPickerItem, setShowPickerItem] = useState();

    const [imgPreviewData, setImgPreviewData] = useState({});
    const [pageNr, setPageNr] = useState(1);

    const [netInfo, setNetInfo] = useState({
        isConnected: true,
        isInternetReachable: true,
    });
    const queryClient = useQueryClient();

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
        isFetching,
    } = useQuery(
        [relatedObjectName, pageNr],
        () => httpCT.fetchContentTypeObjects(relatedObjectName, pageNr),
        {
            retry: 1,
            // eslint-disable-next-line consistent-return
            initialData: () => {
                const persistedData = contentRelationObjects
                && contentRelationObjects[relatedObjectName];
                if (persistedData && !netInfo.isInternetReachable) {
                    return transformToArrayForListData(contentRelationObjects, relatedObjectName);
                }
            },
            onError: (err) => {
                const noPersistedData = !contentRelationObjects
                || !contentRelationObjects[relatedObjectName];
                if (netInfo.isInternetReachable) {
                    if (err instanceof ApiTokenError) {
                        dispatch(authTypesActions.validateApiToken(false));
                        return;
                    }
                    if (err instanceof ApiNoDataError) {
                        dispatch(contentTypesActions.clearContentTypeObjects(relatedObjectName));
                        fetchingDataErrorAlert(err.message).then(() => {
                            queryClient.invalidateQueries(relatedObjectName);
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
                        queryClient.invalidateQueries(relatedObjectName);
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
                const dataExists = dat && dat.data;
                if (dataExists) {
                    const lastData = dat.data;
                    const totalPages = dat.pageParams.totalPages || 1;
                    if (Array.isArray(lastData) && (lastData.length > 0)) {
                        const { partOfTitleProps } = dataContent[relatedObjectName];
                        const newData = dat.data.map((el) => {
                            const labelFormat = transformToHumanReadableTitle(el, partOfTitleProps);
                            const formattedLabel = (labelFormat !== el.id)
                                ? `${labelFormat} - ${el.id}`
                                : el.id;

                            const newObj = { id: el.id, name: formattedLabel };
                            if (relatedObjectName === '_media') {
                                newObj.extension = el.extension;
                            }
                            return newObj;
                        });
                        const transformedData = [];
                        transformedData[pageNr - 1] = { ...dat, data: newData };

                        dispatch(
                            contentTypesActions.setRelationsObjects(
                                relatedObjectName,
                                transformedData,
                            ),
                        );
                        dispatch(
                            contentTypesActions.setContentTypeObjectsTotalPages(
                                relatedObjectName,
                                totalPages,
                            ),
                        );
                    }
                }
                return dat;
            },
        },
    );

    const returnListData = useCallback(() => (contentRelationObjects
        && contentRelationObjects[relatedObjectName]
        && contentRelationObjects[relatedObjectName][pageNr - 1]
        ? contentRelationObjects[relatedObjectName][pageNr - 1] : []),
    [contentRelationObjects, relatedObjectName, pageNr]);

    // eslint-disable-next-line consistent-return
    const setInitPickerItem = useCallback(async (objName, keyName, editedRelations) => {
        if (!objName || !contentRelationObjects || !contentRelationObjects[relatedObjectName]) {
            return null;
        }

        const objData = returnListData();
        const obj = objData.data || null;
        if (edited) {
            let newLabel = null;
            let relId = null;
            const relatedData = editedRelations || null;
            relId = relatedData[0].id;

            let imgUrl = null;
            obj.forEach((cot) => {
                if (cot.id !== relId) return;
                newLabel = cot.name;
                if (cot.extension) {
                    imgUrl = `${URL_PREFIX}${cot.id}.${cot.extension}`;
                }
            });

            if (relatedObjectName === '_media' && relId && imgUrl) {
                setImgPreviewData({
                    picked: relId,
                    imgPreviewUrl: imgUrl,
                });
            }

            if (!picked && relId) {
                setPicked(newLabel);
            }
        }
    }, [contentRelationObjects, edited, picked, relatedObjectName, returnListData]);

    useEffect(() => {
        if (!picked && contentRelationObjects && contentRelationObjects[relatedObjectName]) {
            setInitPickerItem(relatedObjectName, fieldName, editRelations);
        }
    }, []);

    const onRemoveSelectedValueHandler = () => {
        setPicked(false);
        setImgPreviewData({});
        onChangeValue(fieldName, []);
    };

    const onSelectValueHandler = async (
        field,
        val,
        position = null,
        relatedObj = '',
        previewUrl = '',
        newLabel = '',
    ) => {
        if (!field) return;

        const newField = field;

        if (relatedObj === '_media' && previewUrl) {
            setImgPreviewData({
                picked: val,
                imgPreviewUrl: previewUrl,
            });
        }
        onChangeValue(newField, val, position, relatedObj);
        setPicked(newLabel);

        setShowPickerItem(false);
    };

    const getTotalPages = () => {
        if (totalPagesMax && totalPagesMax[relatedObjectName]) {
            return totalPagesMax[relatedObjectName];
        }
        return 1;
    };

    return (
        <>
            <View
                style={styles.pickerHeader}
            >
                <Text
                    style={styles.pickerHeaderTxt}
                >
                    {fieldName}
                </Text>
            </View>
            {(!isFetching || contentRelationObjects)
                ? (
                    <View>
                        <View style={styles.picker}>
                            <View style={styles.pickerLabel}>
                                <Text
                                    onPress={() => setShowPickerItem(true)}
                                    numberOfLines={1}
                                >
                                    {picked}
                                </Text>
                            </View>
                            <CustomBtn
                                title="Select"
                                onPressBtn={() => setShowPickerItem(true)}
                                titleStyle={styles.pickerBtnTitle}
                                buttonStyle={styles.pickerBtn}

                            />
                            {picked
                            && (
                                <TouchableFeedback
                                    onPress={onRemoveSelectedValueHandler}
                                >
                                    <View
                                        style={styles.clearPicker}
                                    >
                                        <Icon
                                            name="close"
                                            size={24}
                                            color="#fff"
                                        />
                                    </View>
                                </TouchableFeedback>
                            )}
                        </View>
                        {showPickerItem && (
                            <PickerItems
                                listData={returnListData()}
                                data={dataContent}
                                name={fieldName}
                                relatedObjectName={relatedObjectName}
                                editRelations={editRelations}
                                onPressCancel={() => setShowPickerItem(false)}
                                onSelect={onSelectValueHandler}
                                pageNr={pageNr}
                                totalPages={getTotalPages()}
                                onPressPrev={() => (pageNr > 1) && setPageNr(pageNr - 1)}
                                onPressNext={
                                    () => (pageNr < getTotalPages()) && setPageNr(pageNr + 1)
                                }
                            />
                        )}
                    </View>
                )
                : <IndicatorOverlay />}
            {(imgPreviewData.picked && imgPreviewData.imgPreviewUrl)
            && (
                <ImagePreview
                    picked={imgPreviewData.picked}
                    imgPreviewUrl={imgPreviewData.imgPreviewUrl}
                />
            )}
        </>
    );
};

export default FormPickerWithPagination;
