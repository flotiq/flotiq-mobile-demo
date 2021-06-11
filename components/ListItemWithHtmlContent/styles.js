import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '100%',
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
    },
    nestedListTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    nestedListSubtitle: {
        fontSize: 15,
    },
    itemSubtitle: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        flexDirection: 'row',
        flexShrink: 1,
    },
    nestedSubtitleView: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        flexDirection: 'row',
        flexShrink: 1,
    },
});

export default styles;
