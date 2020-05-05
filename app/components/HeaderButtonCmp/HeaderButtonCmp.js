import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderButtonCmp = (props) => (
    <HeaderButton
        {...props}
        IconComponent={Icon}
        iconSize={23}
        color="#fff"
    />
);

export default HeaderButtonCmp;
