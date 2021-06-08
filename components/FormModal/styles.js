import { StyleSheet, Platform } from 'react-native';

import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    gradientContainer: {
        flex: 0,
    },
    gradientInContainer: {
        flex: 0,
        height: Platform.OS === 'android' ? 110 : 90,
    },
    keyboard: {
        flex: 1,
    },
    headerContainer: {
        paddingTop: Platform.OS === 'android' ? 40 : 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    header: {
        fontFamily: 'Roboto-Medium',
        fontSize: 26,
        color: '#fff',
    },
    bodyContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    innerContainer: {
        flex: 1,
        paddingVertical: 20,
    },
    bottomSageArea: {
        backgroundColor: '#000',
    },
    btnWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    btnSaveWrapper: {
        width: '50%',
        backgroundColor: Colors.primary,
    },
    btnCancelWrapper: {
        width: '50%',
        backgroundColor: Colors.danger,
    },
    imageContainer: {
        width: '100%',
        height: 220,
        paddingBottom: 50,
    },
    image: {
        marginTop: 10,
        width: '100%',
        height: '100%',
    },
});

export default styles;
