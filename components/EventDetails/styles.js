import { StyleSheet } from 'react-native';
import { colours } from '../common/styles';

export default StyleSheet.create({

    container: {
        width: '100%',
        marginTop: 15
    },

    header: {
        color: colours.primaryText,
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10
    },

    subHeader: {
        color: colours.primaryText,
        fontSize: 18,
        marginLeft: 30,
        marginVertical: 7
    },

    details: {
        color: colours.disabledText,
        fontSize: 16,
        textAlign: 'center',
    },

    eventImg: {
        alignSelf: 'center',
        margin: 5,
        marginBottom: 10,
        height: 200,
        width: 200,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: colours.disabledText
    },

    mapImg: {
        alignSelf: 'center',
        margin: 5,
        marginBottom: 10,
        height: 150,
        width: 150,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: colours.disabledText
    },

    location: {
        marginHorizontal: 30,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent: 'space-between'
    },

    addressView: {
        width: 140
    },

    locationName: {
        fontWeight: 'bold',
        marginBottom: 5
    },

    descText: {
        width: '80%',
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
    },

    gameType: {
        width: 180,
        height: 50,
        margin: 5,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },

    typeTxt: {
        color: colours.disabledText,
        fontSize: 20,
    }
});