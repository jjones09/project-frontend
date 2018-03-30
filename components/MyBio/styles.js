import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({
    container: {
        margin: 5,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent: 'center'
    },

    tbStyle: {
        width: 200
    },

    editBtn: {
        marginTop: 25
    },

    saveBtn: {
        marginTop: 5,
        marginBottom: 10
    },

    cancelBtn: {
        marginTop: 10,
        marginBottom: 5
    },

    bioCounter: {
        textAlign: 'right',
        fontSize: 12,
        color: colours.disabledText
    },

    text: {
        marginLeft: 5,
        marginRight: 5,
        color: colours.primaryText
    }
});