import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HeaderButtonCmp = (props) => (
    <HeaderButton
        {...props}
        IconComponent={MaterialCommunityIcons}
        iconSize={23}
        color="#fff"
    />
);

export default HeaderButtonCmp;
