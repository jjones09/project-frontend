import { colours } from '../common/styles';

export const config = {
    tabBarOptions: {
        activeTintColor: colours.headerText,
        inactiveTintColor: colours.headerText,
        showIcon: 'true',
        style: {
            backgroundColor: colours.invertedBackground
        }
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false
};