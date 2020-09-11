import React, { useState } from 'react';
import { Platform,
    Modal, View,
    Text,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

import FormPickerWithPagination from './FormPickerWithPagination/FormPickerWithPagination';
import FormInput from './FormInput/FormInput';
import ImageFormPicker from './ImageFormPicker/ImageFormPicker';


import { transformToHumanRedeableTitle } from '../../helpers/contentTypesHelper';
import { trimValues, prepareErrMessages, convertNumbers } from '../../helpers/formValidatorHelper';

import GradientWrapper from '../GradientWrapper/GradientWrapper';

import CustomBtn from '../CustomBtn/CustomBtn';

import styles from './styles';
import Colors from '../../helpers/constants/colors';

const FormModal = (props) => {
    const { isModalVisible, onPressSave, onPressCancel, data, dataName, edit } = props;
    const contentTypeObjects = useSelector((state) => state.contentTypes.objects);

    const [formData, setFormData] = useState({});
    const [validationErrors, setValidationErrors] = useState([]);

    const onPressBtnHandler = () => {
        if (formData.length < 1) {
            Alert.alert('Missing data!', 'Complete all data!');
            return;
        }
        setValidationErrors({});

        let trimmedValuesFD = trimValues(formData);

        const { definitions } = data[dataName];
        const isUpload = trimmedValuesFD.type && trimmedValuesFD.type === 'upload';

        if (definitions && !isUpload) {
            trimmedValuesFD = convertNumbers(definitions, trimmedValuesFD);
            const errorsMessages = prepareErrMessages(definitions, trimmedValuesFD);

            if (Object.keys(errorsMessages).length) {
                setValidationErrors(errorsMessages);
                Toast.show('Check form errors', Toast.SHORT, [
                    'UIAlertController',
                ]);
                return;
            }
        }

        let editFormData = null;

        if (edit && !isUpload) {
            const ob = contentTypeObjects[dataName][0].data;
            ob.forEach((element) => {
                if (element.id !== edit) return;
                editFormData = { ...element, ...trimmedValuesFD };
            });
        }
        if (editFormData) {
            onPressSave(editFormData);
        } else {
            onPressSave(trimmedValuesFD);
        }
        setFormData({});
    };

    const getTitle = () => {
        if (!contentTypeObjects[dataName] || !edit) return edit;
        const obj = contentTypeObjects[dataName][0].data || null;
        const partOfTitleProps = data[dataName].partOfTitleProps || null;
        let title = edit;
        obj.forEach((el) => {
            if (el.id !== edit) return;
            title = transformToHumanRedeableTitle(el, partOfTitleProps);
        });
        return title;
    };

    const onChangeValueHandler = async (field, val) => {
        if (!field) return;
        const resp = {
            ...formData,
            [field]: val || '',
        };

        setFormData(resp);
    };

    const renderPickerFields = (definition, fieldName, properties) => {
        const relatedObjectName = (properties && properties.validation && properties.validation.relationContenttype) || null;

        const editedRelations = {};
        if (edit && !formData[fieldName]) {
            if (dataName && contentTypeObjects && contentTypeObjects[dataName]) {
                const editableData = contentTypeObjects[dataName][0].data;
                editableData.forEach((element) => {
                    if (element.id !== edit) return;
                    editedRelations[edit] = element;
                });
            }
            const resp = {
                ...formData,
                [fieldName]: editedRelations[edit][fieldName] || [],
            };
            setFormData(resp);
        }


        return (
            <FormPickerWithPagination
                key={`${definition.id}-${fieldName}-picker`}
                fieldName={fieldName}
                editRelations={formData[fieldName]}
                relatedObjectName={relatedObjectName}
                contentTypeObjects={contentTypeObjects}
                data={data}
                dataContent={data}
                edited={edit}
                onChangeValue={onChangeValueHandler}
            />
        );
    };

    const renderInputField = (definition, fieldName, typeOfField, properties) => {
        if (edit && (!formData[fieldName]) && formData[fieldName] !== '') {
            let editValue = null;
            if (dataName && contentTypeObjects && contentTypeObjects[dataName]) {
                const editableData = contentTypeObjects[dataName][0].data;

                editableData.forEach((element) => {
                    if (element.id !== edit) return;
                    editValue = `${element[fieldName]}`;
                });
            }
            const resp = {
                ...formData,
                [fieldName]: editValue || '',
            };
            setFormData(resp);
        }

        const val = formData[fieldName];
        const keyValue = `${definition.id}-${fieldName}-input-field`;
        const readOnlyField = properties && properties.readonly;

        return (
            <FormInput
                key={keyValue}
                text={fieldName}
                value={val || ''}
                errorMessage={validationErrors[fieldName] || ''}
                keyboardType={typeOfField}
                onChangeValue={(changedValue) => onChangeValueHandler(fieldName, changedValue)}
                readOnly={readOnlyField}
                isEdited={edit}
            />
        );
    };

    const renderFields = (def) => Object.entries(def.definitions).map((el, i) => {
        const name = el[0] || 'Title';
        const properties = el[1] || null;
        const typeOfField = (properties && properties.inputType) || 'text';

        if (typeOfField === 'datasource') {
            return renderPickerFields(def, name, properties);
        }

        return renderInputField(def, name, typeOfField, properties);
    });

    const onTakeImgHandler = (imgData) => {
        if (!data) return;
        setFormData({
            type: 'upload',
            data: imgData,
        });
    };

    return (
        <Modal
            visible={isModalVisible}
            statusBarTranslucent
            // animationType="fade"
            style={styles.modalContainer}
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
                        numberOfLines={2}
                    >
                        {!edit ? `Add new: ${dataName}` : `Edit: ${getTitle()}`}
                    </Text>
                </View>
            </GradientWrapper>
            {(dataName !== '_media')
                ? (
                    <KeyboardAvoidingView
                        style={styles.keyboard}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 18}
                        enabled
                    >
                        <View
                            style={styles.bodyContainer}
                        >
                            <ScrollView>

                                <View
                                    style={styles.innerContainer}
                                >
                                    <>
                                        {(data && data[dataName]) && renderFields(data[dataName])}
                                    </>
                                </View>
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                )
                : (
                    <View
                        style={styles.bodyContainer}
                    >
                        <ImageFormPicker
                            elId={edit}
                            onTakeImg={onTakeImgHandler}
                        />
                    </View>
                )}
            <SafeAreaView
                style={styles.bottomSageArea}
            >
                <View
                    style={styles.btnWrapper}
                >
                    <View
                        style={styles.btnSaveWrapper}
                    >
                        <CustomBtn
                            title="Save"
                            buttonStyle={{
                                backgroundColor: Colors.primary,
                            }}
                            onPressBtn={() => onPressBtnHandler(formData)}
                        />
                    </View>
                    <View
                        style={styles.btnCancelWrapper}
                    >
                        <CustomBtn
                            title="Cancel"
                            buttonStyle={{
                                backgroundColor: Colors.danger,
                            }}
                            onPressBtn={() => {
                                setFormData({});
                                onPressCancel();
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default FormModal;
