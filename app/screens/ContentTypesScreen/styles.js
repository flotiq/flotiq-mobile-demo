import { StyleSheet } from 'react-native';

import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    listItemWrapper: {
        flex: 1,
    },
    listItemContainer: {
        padding: 10,
        backgroundColor: 'transparent',
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    indicatorhorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        color: '#000000',
    },
    subtitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#333333',
    },
});

export default styles;
