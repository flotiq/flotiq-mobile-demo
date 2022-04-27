import { StyleSheet, Platform } from 'react-native';

import Colors from '../../../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'red',
    },
    gradientContainer: {
        flex: 0,
    },
    gradientInContainer: {
        flex: 0,
        height: Platform.OS === 'android' ? 70 : 70,
    },
    headerContainer: {
        paddingTop: Platform.OS === 'android' ? 25 : 35,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    header: {
        fontFamily: 'Inter-Bold',
        fontSize: 26,
        color: '#fff',
    },
    itemTitle: {
        fontFamily: 'Inter-regular',
        fontSize: 14,
    },
    innerViewWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemTitleWithPreview: {
        fontFamily: 'Inter-regular',
        fontSize: 14,
        width: '70%',
    },
    preview: {
        width: '30%',
        height: 50,
        marginTop: -20,
        paddingBottom: 0,
    },
    btnCancelWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.danger,
    },
    cancelBtn: {
        backgroundColor: Colors.danger,
    },
    btnPaginationWrapper: {
        flex: 1,
        position: 'absolute',
        bottom: 40,
        left: 50,
        right: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paginationBtn: {
        width: '100%',
        backgroundColor: Colors.accent2,
    },
    paginationCounter: {
        width: '20%',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    paginationCounterText: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
    },
});

export default styles;
