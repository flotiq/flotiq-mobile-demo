import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../helpers/constants/colors';

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
        fontFamily: 'Inter-Light',
        fontSize: 24,
        letterSpacing: 1.5,
        color: Colors.accent6,
        textAlign: 'center',
    },
    body: {
        fontFamily: 'Inter-Medium',
        fontSize: 32,
        textAlign: 'center',
    },
    dataTypeName: {
        fontFamily: 'Inter-Medium',
        fontSize: 32,
        textAlign: 'center',
    },
});

export default styles;
