import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';

import SignedIn from "../components/SignedIn";
import { colours } from "../components/common/styles";

export default class Find extends Component<Props> {
    static navigationOptions = {
        title: 'Find',
        header: null
    };

    constructor(props) {
        super(props);
    };

    render() {

        return (
            <View style={styles.container}>
                <Text>
                    Find page
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: colours.primaryBackground
    }
});