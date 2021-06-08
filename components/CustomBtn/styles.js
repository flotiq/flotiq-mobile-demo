import { StyleSheet } from 'react-native';
import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#299BAC',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
    },
    loader: {
        color: Colors.primary,
        paddingVertical: 12,
    },
});

export default styles;
