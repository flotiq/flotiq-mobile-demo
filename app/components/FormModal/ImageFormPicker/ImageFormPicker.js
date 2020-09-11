import React, { useState } from 'react';
import { View, Text, Platform, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import CustomBtn from '../../CustomBtn/CustomBtn';
import ImagePreview from '../ImagePreview/ImagePreview';

import styles from './styles';

const errMess = 'Something went wrong. Please try again. Make sure you have given the app permission to access the device memory.';

const ImageFormPicker = ({ elId, onTakeImg }) => {
    const [imgPreview, setImgPreview] = useState();

    const sendRequest = (source) => {
        if (!source) return;

        const imgName = source.path.split('/').pop() || `${source.modificationDate}_image_mobile.jpg`;

        const img = {
            uri: source.path,
            type: source.mime,
            name: imgName,
        };
        const formdata = new FormData();
        formdata.append('file', img);
        formdata.append('type', 'image');
        formdata.append('save', 1);

        const imgData = {
            file: img,
            data: formdata,
        };

        onTakeImg(imgData);
    };

    const showAlert = () => {
        Alert.alert(
            'Error',
            errMess,
        );
    };

    const onPressImagePickerHandler = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then((image) => {
            setImgPreview(image.path);
            sendRequest(image);
        }).catch((_) => {
            showAlert();
        });
    };

    const onPressCameraPickerHandler = () => {
        const oldAndroid = Platform.OS === 'android' && Platform.Version < '25';
        const defaultQuality = Platform.OS === 'android' ? 1 : 0.8;
        const defaultSettings = {
            compressImageQuality: oldAndroid ? 0.6 : defaultQuality,
            mediaType: 'photo',
        };
        if (Platform.OS === 'android') {
            defaultSettings.cropping = true;
        }

        ImagePicker.openCamera(defaultSettings).then((image) => {
            setImgPreview(image.path);
            sendRequest(image);
        }).catch((_) => {
            showAlert();
        });
    };

    return (
        <>
            <View style={styles.container}>
                {imgPreview
                    ? (
                        <View
                            style={styles.previewWrapper}
                        >
                            <ImagePreview
                                picked={elId || `img_picker_${imgPreview}`}
                                imgPreviewUrl={imgPreview}
                                containerStyle={styles.preview}
                            />
                        </View>
                    )
                    : (
                        <View
                            style={styles.noImgContainer}
                        >
                            <Text
                                style={styles.noImgText}
                            >
                                NO IMAGE
                            </Text>
                        </View>
                    )}
                <CustomBtn
                    title="Pick image (from disk)"
                    buttonStyle={styles.imgBtn}
                    onPressBtn={onPressImagePickerHandler}
                />
                <CustomBtn
                    title="Take photo"
                    buttonStyle={styles.photoBtn}
                    onPressBtn={onPressCameraPickerHandler}
                />
            </View>
        </>
    );
};

export default ImageFormPicker;
