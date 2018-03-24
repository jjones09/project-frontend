import {StyleSheet} from "react-native";
import {colours} from "../common/styles";

export default StyleSheet.create({
    containerHead: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'flex-start',
        paddingTop: 20,
        backgroundColor: colours.invertedBackground
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