import { StyleSheet } from 'react-native';
import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 2,
        marginTop: 20,
        marginHorizontal: 30,
    },
    defaultBackground: {
        borderColor: Colors.accent4,
        borderWidth: 2,
        backgroundColor: 'transparent',
    },
});

export default styles;
