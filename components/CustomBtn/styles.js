import { StyleSheet } from 'react-native';
import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter-Regular',
    },
    loader: {
        color: Colors.primary,
        paddingVertical: 12,
    },
});

export default styles;
