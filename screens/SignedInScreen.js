import React, {Component} from 'react';
import { AsyncStorage, StyleSheet, View} from 'react-native';

import SignedIn from "../components/SignedIn";

export default class SecondScreen extends Component<Props> {
    static navigationOptions = {
        title: 'Second Screen',
        header: null
    };

    constructor(props) {
        super(props);
    };

    state = {
        name: ''
    };

    render() {
        AsyncStorage.getItem('userName').then(value => {
            this.setState({'name': value});
        });

        return (
            <View style={styles.container}>
                <SignedIn />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#F5FCFF'
    }
});