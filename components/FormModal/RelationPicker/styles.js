import { StyleSheet, Platform } from 'react-native';

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
        fontFamily: Platform.OS === 'ios' ? 'Roboto-Medium' : 'Roboto-Bold',
        color: '#86939e',
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
