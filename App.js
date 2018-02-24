import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import SecondScreen from './screens/SignedInScreen';

const Navi = StackNavigator(
    {
        Login: { screen: LoginScreen },
        Second: { screen: SecondScreen }
    },
    { mode: 'modal' });

export default Navi;