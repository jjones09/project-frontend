import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({
    gameResult: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    resultImg: {
        margin: 5,
        height: 50,
        width: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colours.disabledText
    },

    gameTitle: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 10,
        textAlign: 'left',
        width: 210,
    },
});