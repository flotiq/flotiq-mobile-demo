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
        fontFamily: 'Inter-Bold',
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
        fontFamily: 'Inter-Regular',
    },
    nestedSubtitleView: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
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
        fontFamily: 'Inter-Regular',
        fontSize: 16,
    },
    span: {
        fontFamily: 'Inter-Regular',
    },
});

export default styles;
