import { StyleSheet } from 'react-native';
import Colors from '../../../../helpers/constants/colors';

const styles = StyleSheet.create({
    leftAction: {
        marginTop: 20,
        backgroundColor: Colors.accent4,
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
        backgroundColor: Colors.danger,
        justifyContent: 'flex-end',
    },
});

export default styles;
