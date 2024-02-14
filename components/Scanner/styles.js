import { StyleSheet } from 'react-native';
import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerStyle: {
        width: '100%',
        backgroundColor: Colors.accent3,
    },
    marker: {
        borderColor: Colors.primary,
    },
    botomContent: {
        color: Colors.secondary,
        fontSize: 20,
        fontFamily: 'Inter-Regular',
    },
    botomContent: {
        color: Colors.secondary,
        fontSize: 20,
        fontFamily: 'Inter-Regular',
    },
    containerButton: {
        marginTop: 10
    },
});

export default styles;
