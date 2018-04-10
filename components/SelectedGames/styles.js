import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    section: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    trashBg: {
        borderRadius: 5,
        padding: 5,
        paddingTop: 8,
        width: 50,
        height: 50,
        backgroundColor: colours.negativeButtonBackground
    }
});