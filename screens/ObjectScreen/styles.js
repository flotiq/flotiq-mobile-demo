import { Platform, Dimensions, StyleSheet } from 'react-native';

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
    },
    nestedSubtitleView: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
    headerOptionsTitle: {
        width: Dimensions.get('window').width - 120,
        marginLeft: Platform.OS === 'ios' ? 50 : 'auto',
    },
});

export const htmlStyles = StyleSheet.create({
    p: {
        marginBottom: 10,
        marginTop: 10,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    span: {
        fontFamily: 'Roboto-Regular',
    },
});

export default styles;
