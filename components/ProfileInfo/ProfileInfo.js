import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { colours } from "../common/styles";
import Location from "../Location/Location";

export default class ProfileInfo extends Component<Props> {
    static navigationOptions = {
        title: 'Profile',
        header: null
    };

    constructor(props) {
        super(props);

    };

    state = {
        location: {}
    };

    render() {
        return (
            <View>
                <View style={{
                    margin: 5,
                    marginLeft: 90,
                    marginRight: 90,
                    flexDirection: 'row',
                    alignItems:'flex-start',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.text}>Hosting:</Text>
                    <Text style={styles.text}>0</Text>
                    <Text style={styles.text}>Attending:</Text>
                    <Text style={styles.text}>0</Text>
                </View>
                <Location />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        paddingTop: 20,
        backgroundColor: colours.primaryBackground
    },
    text: {
        fontSize: 16,
        marginRight: 10
    }
});