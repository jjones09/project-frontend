import React from 'react';
import { TabNavigator } from 'react-navigation';

import Find from '../../screens/Find';
import Attending from '../../screens/Attending';
import Host from '../../screens/Host';
import Profile from '../../screens/Profile';

import {config} from './config';

export const Tabs = TabNavigator(
    {

        Find: {
            screen: Find
        },
        Attending: {
            screen: Attending
        },
        Host: {
            screen: Host
        },
        Profile: {
            screen: Profile
        }
    },
    config
);