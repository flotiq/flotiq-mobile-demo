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
        borderColor: Colors.accent4,
        borderWidth: 2,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        width: '85%',
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
