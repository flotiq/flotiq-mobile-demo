import { StyleSheet, Platform } from 'react-native';
import Colors from '../../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    listItemContainer: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    pickerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    pickerHeaderTxt: {
        fontFamily: Platform.OS === 'ios' ? 'Inter-Medium' : 'Inter-Bold',
        color: Colors.accent6,
        fontSize: 16,
        textTransform: 'capitalize',
    },
    pickerLabel: {
        width: '55%',
    },
    pickerBtn: {
        paddingHorizontal: 30,
    },
    pickerBtnTitle: {
        fontSize: 14,
    },
});

export default styles;
