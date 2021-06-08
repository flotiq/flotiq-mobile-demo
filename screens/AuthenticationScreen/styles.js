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
        marginBottom: 30,
    },
    body: {
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 30,
    },
    h2Style: {
        fontSize: 24,
        color: '#000000',
        textAlign: 'left',
        fontFamily: 'Roboto-Regular',
    },
    paragraph: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'left',
        fontFamily: 'Roboto-Regular',
    },
    confirmBtn: {
        width: '85%',
        marginTop: 20,
        backgroundColor: Colors.accent2,
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    indicatorHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    btnContainer: {
        width: '100%',
    },
    description: {
        paddingVertical: 10,
    },
});

export default styles;
