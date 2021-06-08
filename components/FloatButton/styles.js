import { StyleSheet } from 'react-native';
import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 20,
        paddingRight: 20,
        bottom: 0,
        right: 0,
    },
    buttonShape: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    button: {
        backgroundColor: Colors.primary,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
