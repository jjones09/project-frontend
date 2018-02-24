import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({
    outerView: {
        backgroundColor: colours.buttonBackground,
        height: 'auto',
        width: 180,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5
    },
    innerView: {
        marginLeft: 10,
        alignItems: 'center'
    },
    pic: {
    },
    description: {
        color: '#FFFFFF',
        fontSize: 10
    },
    name: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold'
    }
});