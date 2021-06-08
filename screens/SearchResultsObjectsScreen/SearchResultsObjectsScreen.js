import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { transformToHumanReadableTitle } from '../../helpers/contentTypesHelper';

import IndicatorOverlay from '../../components/Indicators/IndicatorOverlay';
import CustomListItem from '../../components/CustomListItem/CustomListItem';

import styles from './styles';

const SearchResultsObjectsScreen = (props) => {
    const { searchResults, contentTypeName, partOfTitleProps, withRichTextProps } = props.route.params;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading && searchResults) {
            setIsLoading(false);
        }
    }, [searchResults, isLoading]);

    const objectPressHandle = (item, redeableName) => {
        props.navigation.navigate({
            name: 'SearchResultObjectScreen',
            params: {
                objectId: item.id,
                objectName: redeableName,
                objectLabel: item.label,
                searchResult: item,
                withRichTextProps,
            },
        });
    };

    const renderItem = (item) => {
        if (item.item) {
            const element = item.item;
            const humanReadeableTitle = element.id
                ? transformToHumanReadableTitle(element, partOfTitleProps)
                : '';
            return (
                element.id ? (
                    <View
                        key={`${element.id}-view-1`}
                        style={styles.listItemWrapper}
                    >
                        <CustomListItem
                            element={element}
                            title={humanReadeableTitle}
                            onPress={() => objectPressHandle(element, humanReadeableTitle)}
                        />
                    </View>
                )
                    : null);
        }
        return null;
    };

    if (isLoading && !searchResults) {
        return <IndicatorOverlay />;
    }

    const returnListData = () => {
        if (searchResults && searchResults.length > 0) return searchResults;
        return [];
    };

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={returnListData()}
            renderItem={renderItem}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
        />
    );
};

export const searchResultsObjectsScreenOptions = ({ route }) => (
    {
        title: 'Search Results',
    }
);

export default SearchResultsObjectsScreen;
