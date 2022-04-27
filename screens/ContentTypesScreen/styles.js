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
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: Colors.accent3,
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 15,
        color: Colors.accent4,
    },
});

export default styles;
