import { StyleSheet } from 'react-native';
import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    containerStyle: {
        width: '100%',
        backgroundColor: '#000',
    },
    marker: {
        borderColor: Colors.primary,
    },
    botomContent: {
        color: Colors.secondary,
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
    scannerContainer: {
        backgroundColor: '#000',
    },
});

export default styles;
