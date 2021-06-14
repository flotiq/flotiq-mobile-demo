import React, { useState } from 'react';
import { Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    View } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';

import FormPickerWithPagination from './FormPickerWithPagination/FormPickerWithPagination';
import FormInput from './FormInput/FormInput';
import ImageFormPicker from './ImageFormPicker/ImageFormPicker';

import { transformToHumanReadableTitle } from '../../helpers/contentTypesHelper';
import { convertNumbers, prepareErrMessages, trimValues } from '../../helpers/formValidatorHelper';

import GradientWrapper from '../GradientWrapper/GradientWrapper';

import CustomBtn from '../CustomBtn/CustomBtn';

import styles from './styles';
import Colors from '../../helpers/constants/colors';

const FormModal = (props) => {
    const { isModalVisible, onPressSave, onPressCancel, data, dataName, edit } = props;
    const contentTypeDefinitions = useSelector((state) => state.contentTypes.definitions);
    const contentTypeDefinition = contentTypeDefinitions.find((ctd) => dataName === ctd.name);
    const contentTypeObject = useSelector(
        (state) => (edit ? state.contentTypes.object[dataName][edit] : null),
    );

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
                Toast.show(
                    'Check form errors',
                    { duration: Toast.SHORT, position: Toast.positions.BOTTOM },
                );
                return;
            }
        }

        let editFormData = null;

        if (edit && !isUpload) {
            editFormData = { ...contentTypeObject, ...trimmedValuesFD };
            Object.keys(contentTypeDefinition.metaDefinition.propertiesConfig)
                .forEach((prop) => {
                    const property = contentTypeDefinition.metaDefinition.propertiesConfig[prop];
                    if (property.inputType === 'datasource') {
                        editFormData[prop] = editFormData[prop].map((el) => {
                            const tmp = { ...el };
                            return {
                                type: 'internal',
                                dataUrl: `/api/v1/content/${tmp.internal.contentType}/${tmp.id}`,
                            };
                        });
                    }
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
        if (typeof contentTypeDefinition === 'undefined') return edit;
        const partOfTitleProps = Object.keys(contentTypeDefinition.metaDefinition.propertiesConfig)
            .filter(
                (
                    param,
                ) => contentTypeDefinition.metaDefinition.propertiesConfig[param].isTitlePart,
            )
            || null;
        return transformToHumanReadableTitle(contentTypeObject, partOfTitleProps);
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
        const relatedObjectName = (properties
                && properties.validation
                && properties.validation.relationContenttype)
            || null;

        if (edit && !formData[fieldName]) {
            const resp = {
                ...formData,
                [fieldName]: contentTypeObject[fieldName] || [],
            };
            setFormData(resp);
        }

        return (
            <FormPickerWithPagination
                key={`${definition.id}-${fieldName}-picker`}
                fieldName={fieldName}
                editRelations={formData[fieldName]}
                relatedObjectName={relatedObjectName}
                data={data}
                dataContent={data}
                edited={edit}
                onChangeValue={onChangeValueHandler}
            />
        );
    };

    const renderInputField = (definition, fieldName, typeOfField, properties) => {
        if (edit && (!formData[fieldName]) && formData[fieldName] !== '') {
            const editableData = contentTypeObject[fieldName];
            const resp = {
                ...formData,
                [fieldName]: editableData || '',
            };
            setFormData(resp);
        }

        const val = formData[fieldName];
        const keyValue = `${definition.id}-${fieldName}-input-field`;
        const readOnlyField = properties && properties.readonly;

        return (
            <FormInput
                key={keyValue}
                text={contentTypeDefinition.metaDefinition.propertiesConfig[fieldName].label}
                value={val || ''}
                errorMessage={validationErrors[fieldName] || ''}
                keyboardType={typeOfField}
                onChangeValue={(changedValue) => onChangeValueHandler(fieldName, changedValue)}
                readOnly={readOnlyField}
                isEdited={edit}
                options={properties.options}
            />
        );
    };

    const renderFields = (def) => Object.entries(def.definitions).map((el) => {
        const name = el[0] || 'Title';
        const properties = el[1] || null;
        const typeOfField = (properties && properties.inputType) || 'text';

        if (typeOfField === 'datasource') {
            return renderPickerFields(def, name, properties);
        }
        if (typeOfField === 'object') {
            // TODO: add list item edit
            return null;
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
