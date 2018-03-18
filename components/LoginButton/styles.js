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
        backgroundColor: colours.primaryButtonBackground,
        margin: 5,
        borderRadius: 5
    },
    logOutButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colours.secondaryButtonBackground,
        margin: 5,
        borderRadius: 5
    },
    logOutText: {
        color: colours.secondaryButtonText,
        fontSize: 10,
        fontWeight: '500'
    },
    notYouText: {
        color: colours.notificationText,
        marginTop: 60,
        marginBottom: 10
    }
});