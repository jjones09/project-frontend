import {StyleSheet} from "react-native";
import {colours} from "../common/styles";

export default StyleSheet.create({
    containerHead: {
        height: 60,
        flexDirection: 'row',
        alignItems:'flex-start',
        paddingTop: 20,
        backgroundColor: colours.invertedBackground,
        zIndex: 1
    },

    containerContent: {
        flex: 12,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'flex-start'
    },

    title: {
        fontSize: 20,
        fontWeight: '500',
        color: colours.headerText,
        flex: 4,
        marginLeft: 50,
        textAlign: 'center'
    },
    cancel: {
        flex: 1
    }
});