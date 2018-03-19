import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';

import { colours } from "../components/common/styles";
import Button from "../components/Button";
import ModalWrapper from "../components/ModalWrapper"

export default class Host extends Component<Props> {
    static navigationOptions = {
        title: 'Host',
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            hostCount: 0,
            showModal: false
        };
    };

    render() {

        return (
            <View style={styles.container}>
                <ModalWrapper title='Create Event' that={this} vis={this.state.showModal} />
                {this.getHostingText()}
                <Button text='Create new event' onPress={this.openEventCreator.bind(this)}/>
            </View>
        );
    };

    getHostingText() {
        return (this.state.hostCount > 0) ? (
            <Text style={styles.hostingText}>
                You are hosting {this.state.hostCount} upcoming events
            </Text>
        ) :
        (
            <Text style={styles.hostingText}>
                You are not hosting any upcoming events
            </Text>
        );
    };

    openEventCreator() {
        console.log("Creating new event");
        this.setState({showModal: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        backgroundColor: colours.primaryBackground
    },
    hostingText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    }
});