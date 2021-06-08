import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MainNavigator } from './StackNavigator';

const FlotiqNavigator = (props) => (
    <NavigationContainer>
        <MainNavigator {...props} />
    </NavigationContainer>
);

export default FlotiqNavigator;
