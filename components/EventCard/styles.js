import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({

    card: {
        alignContent: 'center',
        position: 'absolute',
        width: 300,
        top: 30,
        left: 20,
        height: 450,
        margin: 10,
        borderRadius: 8,
        borderWidth: 8,
        borderColor: colours.cardBorder,
        overflow: 'hidden',
        backgroundColor: colours.cardBackground
    },

    header: {
        color: colours.primaryButtonText,
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 10,
        textAlign: 'center'
    },

    eventImg: {
        alignSelf: 'center',
        margin: 5,
        height: 200,
        width: 200,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: colours.cardBorder
    }
});