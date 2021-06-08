import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const smallDeviceScreen = width <= 360;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    textWrapper: {
        flex: 1,
        marginTop: smallDeviceScreen ? 160 : 240,
    },
    title: {
        fontFamily: 'Roboto-Light',
        fontSize: 24,
        letterSpacing: 1.5,
        color: '#82827E',
        textAlign: 'center',
    },
    body: {
        fontFamily: 'Roboto-Medium',
        fontSize: 32,
        textAlign: 'center',
    },
    dataTypeName: {
        fontFamily: 'Roboto-Medium',
        fontSize: 32,
        textAlign: 'center',
    },
});

export default styles;
