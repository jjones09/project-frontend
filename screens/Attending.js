import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { colours } from "../components/common/styles";
import { Icon } from 'react-native-elements';


export default class Attending extends Component<Props> {
    static navigationOptions = {
        title: 'Attending',
        header: null,
        tabBarIcon: (<Icon size={24} color='#FFF' name='torsos-all' type='foundation'/>)
    };

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.fetchData().done();
    }

    async fetchData() {

    }

    render() {
        return (
            <View style={styles.container}>

                <Text>Attending</Text>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: colours.primaryBackground
    },
    hostingText: {
        textAlign: 'center',
        color: colours.primaryText,
        fontSize: 26
    },
    header: {
        width: 350,
        marginVertical: 20,
    },
    eventsList: {
        height: 320,
        marginBottom: 20
    },
    event: {
        margin: 10,
        width: 300,
        alignContent: 'flex-start'
    },
    eventTitle: {
        fontSize: 22,
        color: colours.subHeader
    },
    eventInfo: {
        fontSize: 14,
        color: colours.disabledText
    },
    eventImg: {
        margin: 5,
        height: 60,
        width: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colours.disabledText
    },
    eventBtn: {
        margin: 5,
        padding: 5
    },
    eventDetails: {
        width: 200
    }
});