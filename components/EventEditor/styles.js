import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    section: {
        marginTop: 10,
        marginBottom: 25
    },

    header: {
        color: colours.primaryText,
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 30,
        textAlign: 'left'
    },

    tbStyle: {
        justifyContent: 'flex-start',
        width: 300,
        fontSize: 16,
        borderColor: 'transparent',
        borderBottomColor: colours.invertedBackground
    },

    tbUrlStyle: {
        width: 200,
        fontSize: 16,
        textAlign: 'center',
        borderColor: 'transparent',
        borderBottomColor: colours.invertedBackground
    },

    titleCounter: {
        textAlign: 'right',
        fontSize: 12,
        color: colours.disabledText,
        marginRight: 50
    },

    rowContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },


    sectionText: {
        color: colours.disabledText,
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 30,
        textAlign: 'left'
    },

    addressText: {
        color: colours.disabledText,
        fontSize: 16,
        marginLeft: 30,
        textAlign: 'left'
    },

    locationName: {
        color: colours.disabledText,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 30,
        textAlign: 'left'
    },

    eventImg: {
        margin: 5,
        height: 250,
        width: 250,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colours.disabledText
    },

    sideBySide: {
        marginLeft: 40,
        marginRight: 40,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },

    locBtn: {
        marginTop: 10,
        marginLeft: 100,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
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
});