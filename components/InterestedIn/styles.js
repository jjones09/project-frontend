import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },

    rowContainerStyle1: {
        margin: 5,
        marginLeft: 90,
        marginRight: 90,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent: 'space-between'
    },

    rowContainerStyle2: {
        marginLeft: 50,
        marginRight: 50,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent: 'space-between'
    },

    header: {
        color: colours.primaryText,
        fontSize: 24,
        margin: 10,
        textAlign: 'center'
    },

    activeSwitchLabel: {
        justifyContent: 'flex-start',
        color: colours.primaryText,
        fontSize: 18,
        fontWeight: '400'
    },

    inactiveSwitchLabel: {
        justifyContent: 'flex-start',
        color: colours.disabledText,
        fontSize: 18
    },

    switchBtn: {
        justifyContent: 'flex-end'
    },

    btnContainer: {
        margin: 5,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent: 'center'
    }
});