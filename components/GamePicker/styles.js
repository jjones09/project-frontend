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

    gameTitle: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 10,
        textAlign: 'left',
        width: 200,
    },
});