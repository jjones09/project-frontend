import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({

    signedInView: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    name: {
        marginTop: 5,
        color: colours.primaryText,
        fontSize: 30
    }
});