import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({
    buttonText: {
        color: colours.buttonText,
        fontSize: 16,
        fontWeight: '500'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colours.buttonBackground,
        margin: 5,
        borderRadius: 5
    }
});