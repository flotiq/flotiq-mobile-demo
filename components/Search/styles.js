import { StyleSheet, Platform } from 'react-native';
import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    overlay: {
        height: Platform.OS === 'android' ? 290 : 'auto',
        width: '85%',
        borderRadius: 2,
        alignContent: 'center',
        justifyContent: 'space-between',
        padding: 0,
    },
    searchBarContainer: {
        marginHorizontal: 30,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: Colors.accent3,
        paddingBottom: 1,
    },
    searchBarPickerContainerIOS: {
        height: 200,
        marginTop: 0,
        alignItems: 'center',
    },
    searchBarPickerContainerAndroid: {
        width: '100%',
        margin: 0,
        padding: 0,
        borderBottomWidth: 1,
    },
    searchBarPicker: {
        height: 60,
        width: '90%',
        marginHorizontal: 25,
    },
    searchBarInputContainer: {
        backgroundColor: '#ffffff',
    },
    searchBarInput: {
        fontFamily: 'Inter-Regular',
        paddingBottom: 0,
        marginTop: 25,
        marginLeft: 0,
        paddingLeft: 0,
        textAlign: 'left',
        color: Colors.accent3,
    },
    searchBarInputLoader: {
        marginTop: 25,
        marginBottom: 0,
        marginLeft: 5,
    },
    searchBarInputClearIcon: {
        marginTop: 25,
        marginBottom: 0,
        marginLeft: 5,
    },
    searchButton: {
        width: '60%',
        marginTop: 20,
        marginBottom: 30,
        marginHorizontal: 30,
        backgroundColor: Colors.primary,
    },
    searchButtonTitleStyle: {
        fontFamily: 'Inter-Bold',
    },
    searchResultContainer: {
        paddingTop: 10,
        justifyContent: 'center',
        marginLeft: 30,
    },
    searchResultText: {
        fontFamily: 'Inter-Regular',
        color: Colors.accent6,
    },
    searchResultTextValue: {
        fontFamily: 'Inter-Bold',
        color: Colors.accent2,
    },
    searchLimitBox: {
        paddingTop: 10,
        marginHorizontal: 30,
    },
    searchLimitText: {
        fontFamily: 'Inter-Regular',
        color: Colors.danger,
    },
});

export default styles;
