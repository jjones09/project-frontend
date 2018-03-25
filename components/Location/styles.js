import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({
    container: {
        margin: 5,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent: 'center'
    },

    iconContainer: {
        marginLeft: 5,
        marginRight: 5
    },

    text: {
        marginLeft: 5,
        marginRight: 5,
        color: colours.primaryText
    }
});