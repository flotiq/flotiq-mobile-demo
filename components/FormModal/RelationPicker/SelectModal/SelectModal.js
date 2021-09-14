import React, { useState } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import Toast from 'react-native-root-toast';
import SelectModalItem from './SelectModalItem/SelectModalItem';
import GradientWrapper from '../../../GradientWrapper/GradientWrapper';
import CustomBtn from '../../../CustomBtn/CustomBtn';
import * as httpCT from '../../../../api/http/rquests/contentTypes';
import IndicatorOverlay from '../../../Indicators/IndicatorOverlay';
import { getImageUrl, transformToHumanReadableTitle } from '../../../../helpers/contentTypesHelper';
import styles from './styles';

const SelectModal = ({
    ctdName,
    onPressCancel,
    onSelect,
}) => {
    const [pageNr, setPageNr] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [data, setData] = useState();

    const {
        isFetching,
    } = useQuery(
        [ctdName, pageNr],
        () => httpCT.fetchContentTypeObjects(ctdName, pageNr),
        {
            retry: 1,
            onError: (err) => {
                Toast.show(
                    err.message,
                    { duration: Toast.durations.LONG, position: Toast.positions.BOTTOM },
                );
            },
            onSuccess: (dat) => {
                setTotalPages(dat.pageParams.totalPages || 1);
                setData(dat.data);
            },
        },
    );

    const renderPickerItem = (co) => (
        <SelectModalItem
            key={`${co.id}-pick}`}
            coId={co.id}
            coName={transformToHumanReadableTitle(co)}
            imgUrl={getImageUrl(co)}
            onPress={() => onSelect(co)}
        />
    );

    return (
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
                    {!isFetching
                        ? (
                            <View style={styles.pickerItemsContainer}>
                                <FlatList
                                    data={data}
                                    renderItem={(item) => renderPickerItem(item.item)}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                        )
                        : <IndicatorOverlay />}
                    <View
                        style={styles.btnPaginationWrapper}
                    >
                        <CustomBtn
                            title="<"
                            buttonStyle={styles.paginationBtn}
                            onPressBtn={() => setPageNr((page) => page - 1)}
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
                            onPressBtn={() => setPageNr((page) => page + 1)}
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
    );
};

export default SelectModal;
