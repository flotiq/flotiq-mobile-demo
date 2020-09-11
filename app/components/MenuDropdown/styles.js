import { StyleSheet, Platform } from 'react-native';
import Colors from '../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        opacity: 0,
        flex: 1,
    },
    dropdownBtnContainer: {
        marginRight: 5,
    },
    dropdownBtn: {
        backgroundColor: 'transparent',
        borderRadius: 25,
        paddingVertical: 6,
        paddingHorizontal: 2,
    },
    dropdownList: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 51 : 30,
        right: 5,
        width: 170,
        backgroundColor: '#fff',
        borderRadius: 2,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.8,
        elevation: 8,
    },
    actionBtnWrapper: {
        flex: 1,
    },
    actionBtnContainer: {
        borderRadius: 0,
    },
    actionBtnTitle: {
        fontSize: 16,
    },
    actionBtn: {
        backgroundColor: 'transparent',
        borderColor: '#82827E',
        borderRadius: 0,
    },
});

export default styles;
