import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({
    buttonText: {
        color: colours.primaryButtonText,
        fontSize: 16,
        fontWeight: '500'
    },

    button: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: colours.primaryButtonBackground,
        borderRadius: 5
    },

    greyButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: colours.negativeButtonBackground,
        borderRadius: 5
    }
});