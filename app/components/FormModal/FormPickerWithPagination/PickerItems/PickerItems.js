import React from 'react';
import { FlatList, Modal, View, Text } from 'react-native';

import GradientWrapper from '../../../GradientWrapper/GradientWrapper';
import CustomBtn from '../../../CustomBtn/CustomBtn';
import PickerItem from './PickerItem/PickerItem';

import { prepareRelatedField,
    getRelatedFieldName } from '../../../../helpers/definitionObjectsHelper';

import styles from './styles';
import { IMAGE_URL } from '../../../../helpers/constants/global';

const URL_PREFIX = `${IMAGE_URL}/150x0/`;

const PickerItems = (props) => {
    const { data, name, relatedObjectName, editRelations, onPressCancel, onSelect, listData, pageNr, totalPages, onPressPrev, onPressNext } = props;

    const onChangeValueHandler = async (field, val, position = null, relatedObj = '', newLabel, prevUrl = null) => {
        if (!field) return;
        const newVal = relatedObj ? prepareRelatedField(val, relatedObj) : val;
        const newField = relatedObj ? getRelatedFieldName(field) : field;
        const previewUrl = (relatedObj === '_media') && prevUrl;

        onSelect(newField, newVal, position, relatedObj, previewUrl, newLabel);
    };

    const renderPickerItem = (objName = relatedObjectName, keyName = name, editedRelations, item) => {
        if (!objName || !data || !item.item) return null;

        const co = item.item || null;

        let imgUrl = null;
        if (objName === '_media') {
            imgUrl = `${URL_PREFIX}${co.id}.${co.extension}`;
        }

        return (
            <PickerItem
                key={`${co.id}-pick}`}
                coId={co.id}
                coName={co.name}
                imgUrl={imgUrl}
                onChangeValue={() => onChangeValueHandler(keyName, co.id, null, relatedObjectName, co.name, imgUrl)}
            />
        );
    };

    return (
        <>
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    statusBarTranslucent
                    visible
                    presentationStyle="fullScreen"
                >
                    <GradientWrapper
                        containerStyle={styles.gradientContainer}
                        gradientStyle={styles.gradientInContainer}
                    >
                        <View
                            style={styles.headerContainer}
                        >
                            <Text
                                style={styles.header}
                                numberOfLines={1}
                            >
                                Select item
                            </Text>
                        </View>
                    </GradientWrapper>
                    <View style={styles.innerViewWrapper}>
                        <View style={styles.pickerItemsContainer}>
                            <FlatList
                                data={listData.data}
                                renderItem={(item) => renderPickerItem(relatedObjectName, name, editRelations, item)}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                        <View
                            style={styles.btnPaginationWrapper}
                        >
                            <CustomBtn
                                title="<"
                                buttonStyle={styles.paginationBtn}
                                onPressBtn={() => onPressPrev()}
                                disabled={(pageNr - 1) < 1}
                            />
                            <View style={styles.paginationCounter}>
                                <Text
                                    style={styles.paginationCounterText}
                                >
                                    {`${pageNr}`}
                                </Text>
                            </View>
                            <CustomBtn
                                title=">"
                                buttonStyle={styles.paginationBtn}
                                onPressBtn={() => onPressNext()}
                                disabled={(pageNr + 1) > totalPages}
                            />
                        </View>
                        <View
                            style={styles.btnCancelWrapper}
                        >
                            <CustomBtn
                                title="Cancel"
                                buttonStyle={styles.cancelBtn}
                                onPressBtn={() => onPressCancel()}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
};

export default PickerItems;
