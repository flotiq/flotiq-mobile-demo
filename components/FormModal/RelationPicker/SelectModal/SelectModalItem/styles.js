import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pickerItemsContainer: {
        marginBottom: 92,
    },
    pickerItem: {
        flexDirection: 'row',
        borderColor: 'lightgrey',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
    },
    pickerItemWithPreview: {
        flexDirection: 'row',
        borderColor: 'lightgrey',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    itemTitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
    },
    itemTitleWithPreview: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        width: '70%',
    },
    preview: {
        width: '30%',
        height: 50,
        marginTop: -20,
        paddingBottom: 0,
    },
});

export default styles;
