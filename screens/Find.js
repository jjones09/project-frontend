import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';

import { colours } from "../components/common/styles";
import { Icon } from 'react-native-elements';

export default class Find extends Component<Props> {
    static navigationOptions = {
        title: 'Find',
        header: null,
        tabBarIcon: (<Icon color='#FFF' name='magnifying-glass' type='entypo'/>)
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