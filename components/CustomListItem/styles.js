import { StyleSheet } from 'react-native';
import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 2,
        marginTop: 20,
        marginHorizontal: 30,
    },
    listItemContainer: {
        padding: 10,
        borderColor: Colors.accent2,
        borderWidth: 2,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        width: '85%',
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
