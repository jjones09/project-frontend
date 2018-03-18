import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import HubScreen from './screens/HubScreen';

const Navi = StackNavigator(
    {
        Login: { screen: LoginScreen },
        Hub: { screen: HubScreen }
    },
    { mode: 'modal' });

export default Navi;