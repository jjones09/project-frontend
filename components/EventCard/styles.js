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
        padding: 10,
        borderRadius: 8,
        borderWidth: 8,
        borderColor: colours.cardBorder,
        overflow: 'hidden',
        backgroundColor: colours.cardBackground
    },

    header: {
        color: colours.primaryButtonText,
        fontWeight: '500',
        textAlignVertical: 'center'
    },

    headerContainer: {
        width: 200,
        height: 50,
        marginLeft: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },

    eventImg: {
        alignSelf: 'center',
        margin: 5,
        height: 200,
        width: 200,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: colours.cardBorder
    },

    eventTitle: {
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent: 'center'
    },

    eventDetails: {
        alignSelf: 'center',
        width: 200
    },

    detailRow: {
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent: 'space-between'
    },

    details: {
        marginVertical: 3,
        color: colours.primaryButtonText,
        fontWeight: '500'
    },

    modalBtn: {
        margin: 3,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
});