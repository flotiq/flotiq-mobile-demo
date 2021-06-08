import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    leftAction: {
        marginTop: 20,
        backgroundColor: '#348fc0',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row-reverse',
    },
    actionIcon: {
        width: 30,
        marginHorizontal: 10,
    },
    rightAction: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#dd2c00',
        justifyContent: 'flex-end',
    },
});

export default styles;
