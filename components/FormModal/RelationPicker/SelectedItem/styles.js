import { Platform, StyleSheet } from 'react-native';
import Colors from '../../../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
        marginBottom: 8,
    },
    item: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemText: {
        paddingHorizontal: 5,
    },
    preview: {
        borderTopWidth: 1,
        borderColor: 'lightgray',
    },
    clearButton: {
        height: Platform.OS === 'ios' ? 36 : '100%',
        backgroundColor: Colors.danger,
        padding: 6,
        borderRadius: 4,
    },
});

export default styles;
