import React, { useState } from 'react';
import { View, Text, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import CustomBtn from '../../CustomBtn/CustomBtn';
import ImagePreview from '../ImagePreview/ImagePreview';

import styles from './styles';

const errMess = 'Something went wrong. Please try again.'
    + ' Make sure you have given the app permission to access the device memory and camera.';

const ImageFormPicker = ({ elId, onTakeImg }) => {
    const [imgPreview, setImgPreview] = useState();

    const sendRequest = (source) => {
        if (!source) return;

        const imgName = source.uri.split('/').pop()
            || `${source.modificationDate}_image_mobile.jpg`;

        const img = {
            uri: source.uri,
            type: 'image/jpeg',
            name: imgName,
        };
        // eslint-disable-next-line no-undef
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

    const onPressImagePickerHandler = async () => {
        if (await verifyPermissions2()) {
            try {
                const image = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    quality: 1,
                });

                setImgPreview(image.uri);
                sendRequest(image);
            } catch (err) {
                showAlert();
            }
        } else {
            showAlert();
        }
    };
    const verifyPermissions = async () => {
        const result = await Camera.requestCameraPermissionsAsync();
        if (result.status !== 'granted') {
            showAlert();
            return false;
        }
        return true;
    };

    const verifyPermissions2 = async () => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.status !== 'granted') {
            showAlert();
            return false;
        }
        return true;
    };

    const onPressCameraPickerHandler = async () => {
        const oldAndroid = Platform.OS === 'android' && Platform.Version < '25';
        const defaultQuality = Platform.OS === 'android' ? 1 : 0.8;
        if (await verifyPermissions()) {
            try {
                const image = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    quality: oldAndroid ? 0.6 : defaultQuality,
                });
                setImgPreview(image.uri);
                sendRequest(image);
            } catch (err) {
                showAlert();
            }
        } else {
            showAlert();
        }
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
