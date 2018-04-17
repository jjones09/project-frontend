import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';

import { colours } from "../components/common/styles";
import {Tabs} from "../components/Tabs/Tabs";

export default class SecondScreen extends Component<Props> {
    static navigationOptions = {
        title: 'Second Screen',
        header: null
    };

    constructor(props) {
        super(props);
    };

    render() {
        return (<Tabs />);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: colours.primaryBackground
    }
});