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
        marginBottom: 15
    },

    header: {
        color: colours.primaryText,
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 30,
        textAlign: 'left'
    },

    sectionContent: {
        alignItems: 'center'
    },

    tbStyle: {
        justifyContent: 'flex-start',
        width: 200,
        fontSize: 16,
        borderColor: 'transparent',
        borderBottomColor: colours.invertedBackground
    },

    sideBySide: {
        marginLeft: 40,
        marginRight: 40,
        flexDirection: 'row',
        alignItems:'flex-start'
    },

    selectedGame: {
        fontSize: 14,
        marginBottom: 2,
        marginLeft: 10,
        textAlign: 'left',
        width: 200,
    },

    gameImg: {
        margin: 5,
        height: 50,
        width: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colours.disabledText
    },
});