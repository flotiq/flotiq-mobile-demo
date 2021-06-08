import { StyleSheet, Platform } from 'react-native';
import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    uglyDrawerItem: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: '#000000',
        padding: 15,
        margin: 5,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    removeDrawerItem: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: Colors.danger,
        padding: 15,
        margin: 5,
    },
    touchCmp: {
        flex: Platform.OS === 'android' ? 1 : 0,
    },
});

export default styles;
