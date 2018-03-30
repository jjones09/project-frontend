import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({
    header: {
        marginTop: 10,
        margin: 5,
        color: colours.primaryText,
        fontSize: 16,
        textAlign: 'center'
    },

    headerTwo: {
        marginTop: 10,
        margin: 5,
        color: colours.disabledText,
        fontSize: 16,
        textAlign: 'center'
    },

    tbStyle: {
        width: 300,
        fontSize: 16,
        textAlign: 'center'
    },

    tbContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
});