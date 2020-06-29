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
    listFooterLoader: {
        paddingVertical: 80,
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: '#000000',
    },
    subtitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#333333',
    },
});

export default styles;
