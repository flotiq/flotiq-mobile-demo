import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import ListItemWIthHtmlContent
    from '../../components/ListItemWithHtmlContent/ListItemWithHtmlContent';
import IndicatorOverlay from '../../components/Indicators/IndicatorOverlay';
import styles from './styles';

const SearchResultObjectScreen = (props) => {
    const { objectId, objectName, searchResult, withRichTextProps } = props.route.params;
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchResult) {
            setIsLoading(false);
        }
    }, [dispatch, searchResult]);

    if (isLoading && !searchResult) {
        return <IndicatorOverlay />;
    }
    const renderItem = (item) => (
        Object.keys(item.item).map((el, i) => (el !== 'object_data'
            ? (
                <ListItemWIthHtmlContent
                    key={`${item.item.id}-child-${i}`}
                    item={item.item[el]}
                    element={el}
                    withHtml={withRichTextProps}
                />
            )
            : null))

    );

    const returnListData = () => {
        const da = Object.keys(searchResult).map((item) => ({ [item]: searchResult[item] }));
        if (searchResult) return da;
        return [];
    };

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={returnListData()}
            renderItem={renderItem}
        />
    );
};

export const searchResultObjectScreenOptions = ({ route }) => {
    const screenTitle = route.params.objectName
        ? `${route.params.objectName} - details` : 'Object Details';
    return (
        {
            title: screenTitle,
            headerTitleStyle: styles.headerOptionsTitle,
        }
    );
};

export default SearchResultObjectScreen;
