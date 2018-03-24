import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Icon } from 'react-native-elements';
import InterestedIn from '../InterestedIn';
import { colours } from "../common/styles";

export default class ProfileInfo extends Component<Props> {
    static navigationOptions = {
        title: 'Profile',
        header: null
    };

    constructor(props) {
        super(props);

        navigator.geolocation.getCurrentPosition((data) => {
            this.setState({'location': {
                    lat: data.coords.latitude,
                    lon: data.coords.longitude }});
        });
    };

    state = {
        name: '',
        location: {}
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={
                    {
                        flex: 1,
                        flexDirection: 'row',
                        alignItems:'flex-start',
                        justifyContent: 'center'
                    }}>
                    <Text style={styles.text}>Hosting:</Text>
                    <Text style={styles.text}>0</Text>
                    <Text style={styles.text}>Attending:</Text>
                    <Text style={styles.text}>0</Text>
                </View>
                {/*<View style={*/}
                    {/*{*/}
                        {/*flex: 2,*/}
                        {/*flexDirection: 'row',*/}
                        {/*alignItems:'flex-start',*/}
                        {/*justifyContent: 'center'*/}
                    {/*}}>*/}
                    {/*<InterestedIn />*/}
                {/*</View>*/}
                <View style={
                    {
                        flex: 1,
                        flexDirection: 'row',
                        alignItems:'flex-start',
                        justifyContent: 'center'
                    }}>

                    {/*<Icon name='location' type='entypo' size={18}/>*/}
                    {/*<Text style={styles.labelText}>*/}
                        {/*{this.state.location.lat}, {this.state.location.lon}*/}
                    {/*</Text>*/}

                </View>
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