import { colours } from '../common/styles';

export const config = {
    tabBarOptions: {
        activeTintColor: colours.headerText,
        inactiveTintColor: colours.headerText,
        showIcon: 'true',
        style: {
            backgroundColor: colours.invertedBackground
        },
        labelStyle: {
            fontSize: 10
        }
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false
};