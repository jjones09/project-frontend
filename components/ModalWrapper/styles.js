import {StyleSheet} from "react-native";
import {colours} from "../common/styles";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'flex-start',
        paddingTop: 20,
        backgroundColor: colours.primaryBackground
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