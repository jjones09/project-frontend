import React, {Component} from 'react';
import {AsyncStorage, Text, View} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import icon from './iconStyle';

export default class Location extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            location: {
                lat: 0,
                lon: 0
            }
        };
    };

    async fetchData() {
        navigator.geolocation.getCurrentPosition((data) => {
            this.setState({'location': {
                lat: data.coords.latitude,
                lon: data.coords.longitude }});
        });
    }

    componentDidMount() {
        this.fetchData().done();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Icon color={icon.color} name='location' type='entypo' size={icon.size}/>
                </View>
                <Text style={styles.text}>
                    {this.state.location.lat.toFixed(3)}, {this.state.location.lon.toFixed(3)}
                </Text>
            </View>
        );
    }
}