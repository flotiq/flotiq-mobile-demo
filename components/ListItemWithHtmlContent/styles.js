import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ratingText: {
        width: '100%',
        backgroundColor: 'blue',
    },
    listTitle: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        width: '100%',
    },
    nestedListItemContainer: {
        padding: 10,
        width: '100%',
    },
    nestedListTitle: {
        fontSize: 18,
        fontWeight: '700',
        width: '100%',
    },
    nestedListSubtitle: {
        fontSize: 15,
    },
    itemSubtitle: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        width: '100%',
    },
    nestedSubtitleView: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        width: '100%',
    },
});

export default styles;
