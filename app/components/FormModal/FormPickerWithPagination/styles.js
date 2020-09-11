import { StyleSheet, Platform } from 'react-native';

import Colors from '../../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItemContainer: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 5,
        // backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    pickerHeader: {
        marginHorizontal: 10,
    },
    pickerHeaderTxt: {
        fontFamily: Platform.OS === 'ios' ? 'Roboto-Medium' : 'Roboto-Bold',
        color: '#86939e',
        fontSize: 16,
        textTransform: 'capitalize',
    },
    picker: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    clearPicker: {
        height: Platform.OS === 'ios' ? 36 : '100%',
        backgroundColor: Colors.danger,
        padding: 6,
        borderRadius: 4,
    },
});

export default styles;
