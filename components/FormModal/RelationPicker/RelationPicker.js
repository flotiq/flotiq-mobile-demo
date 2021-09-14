import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import CustomBtn from '../../CustomBtn/CustomBtn';

import SelectedItem from './SelectedItem/SelectedItem';
import SelectModal from './SelectModal/SelectModal';

const RelationPicker = ({
    onChangeValue,
    fieldName,
    relatedObjectName,
    editRelations,
    isMultiple,
}) => {
    const [showPickerItem, setShowPickerItem] = useState();

    const onSelectValueHandler = (item) => {
        const isDuplicate = editRelations.findIndex((el) => el.id === item.id) !== -1;
        if (isDuplicate) {
            return;
        }
        onChangeValue(fieldName, isMultiple ? [item, ...editRelations] : [item]);
        setShowPickerItem(false);
    };

    const onRemoveSelectedValueHandler = (item) => {
        const index = editRelations.findIndex((el) => el.id === item.id);
        const newRelations = [...editRelations];
        newRelations.splice(index, 1);
        onChangeValue(fieldName, newRelations);
    };

    return (
        <View style={styles.container}>
            <View style={styles.pickerHeader}>
                <Text style={styles.pickerHeaderTxt}>
                    {fieldName}
                </Text>
                <CustomBtn
                    title="Select"
                    onPressBtn={() => setShowPickerItem(true)}
                    titleStyle={styles.pickerBtnTitle}
                    buttonStyle={styles.pickerBtn}
                />
            </View>

            {showPickerItem && (
                <SelectModal
                    ctdName={relatedObjectName}
                    onPressCancel={() => setShowPickerItem(false)}
                    onSelect={onSelectValueHandler}
                />
            )}

            { editRelations.map((selectedItem) => (
                <SelectedItem
                    key={selectedItem.id}
                    item={selectedItem}
                    onDelete={onRemoveSelectedValueHandler}
                />
            )) }
        </View>
    );
};

export default RelationPicker;
