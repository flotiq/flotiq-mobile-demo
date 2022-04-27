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
    title: {
        fontFamily: 'Inter-Medium',
        fontSize: 18,
        color: Colors.accent3,
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: Colors.accent4,
    },
});

export default styles;
