import { StyleSheet } from 'react-native';
import Colors from '../../../helpers/constants/colors';

const styles = StyleSheet.create({
    readOnly: {
        marginLeft: 15,
        marginTop: -20,
        fontSize: 12,
        marginBottom: 10,
        color: Colors.accent5,
    },
    pickerContainer: {
        marginHorizontal: 10,
        marginTop: 0,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.accent6,
        padding: 0,
    },
    pickerLabel: {
        color: Colors.accent6,
        fontWeight: 'bold',
        fontSize: 16,
    },
    picker: {
        paddingHorizontal: 0,
    },
});

export default styles;
