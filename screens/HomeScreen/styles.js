import { StyleSheet } from 'react-native';

import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
    },
    header: {
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 50,
    },
    body: {
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 50,
    },
    h2Style: {
        fontSize: 24,
        color: Colors.accent3,
        textAlign: 'left',
        fontFamily: 'Inter-Regular',
    },
    paragraph: {
        fontSize: 20,
        color: Colors.accent3,
        textAlign: 'left',
        fontFamily: 'Inter-Regular',
    },
    confirmBtn: {
        width: 120,
        marginTop: 20,
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    indicatorHhorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    btnContainer: {
        width: '100%',
    },
    btn: {
        width: '85%',
        backgroundColor: Colors.accent2,
    },
    btnDanger: {
        backgroundColor: 'transparent',
        borderColor: Colors.danger,
        borderWidth: 2,
        marginTop: 30,
        width: '65%',
    },
});

export default styles;
