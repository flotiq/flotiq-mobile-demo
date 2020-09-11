import React, { useState, useRef } from 'react';
import { View, Modal, TouchableNativeFeedback, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';
import CustomBtn from '../CustomBtn/CustomBtn';

const MenuDropdown = React.memo(({ items }) => {
    const [isVisible, setIsVisible] = useState(false);

    const slideAnim = useRef(new Animated.Value(0)).current;

    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start((finsihed) => {
            setIsVisible(false);
        });
    };

    const renderItems = () => {
        return items.map((item, i) => (
            <View
                key={item.title}
            >
                <CustomBtn
                    title={item.title}
                    buttonStyle={styles.actionBtn}
                    titleStyle={[styles.actionBtnTitle, item.titleStyle]}
                    btnContainerStyle={styles.actionBtnContainer}
                    onPressBtn={() => {
                        setIsVisible(false);
                        item.onPressAction();
                    }}
                />
            </View>
        ));
    };

    return (
        <View>
            <Button
                onPress={() => {
                    setIsVisible(!isVisible);
                    slideIn();
                }}
                icon={{
                    name: 'more-vert',
                    size: 26,
                    color: '#fff',
                }}
                containerStyle={styles.dropdownBtnContainer}
                buttonStyle={styles.dropdownBtn}
            />
            {isVisible
                && (
                    <Modal
                        onRequestClose={() => {
                            slideOut();
                        }}
                        presentationStyle="overFullScreen"
                        transparent
                    >
                        <TouchableNativeFeedback
                            onPress={() => {
                                slideOut();
                            }}
                        >
                            <View style={styles.overlay} />
                        </TouchableNativeFeedback>
                        <Animated.View
                            style={[
                                styles.dropdownList,
                                {
                                    transform: [{
                                        translateX: slideAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [155, 0],
                                        }),
                                    }],
                                    opacity: slideAnim,
                                },
                            ]}
                        >
                            <View
                                style={styles.actionBtnWrapper}
                            >
                                {items && renderItems()}
                            </View>
                        </Animated.View>
                    </Modal>
                )}
        </View>
    );
});

export default MenuDropdown;
