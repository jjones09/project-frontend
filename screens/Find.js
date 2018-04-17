import React, {Component} from 'react';
import {ActivityIndicator, Animated, StyleSheet, Text, View} from 'react-native';

import { colours } from "../components/common/styles";
import { Icon } from 'react-native-elements';

import api from "../lib/api-interface/apiInterface";
import EventCard from "../components/EventCard";

export default class Find extends Component<Props> {
    static navigationOptions = {
        title: 'Find',
        header: null,
        tabBarIcon: (<Icon size={20} color='#FFF' name='magnifying-glass' type='entypo'/>)
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],
            eventIndex: 0
        }
    };

    componentWillMount() {
        this.fetchData().done();
    }

    async fetchData() {
        navigator.geolocation.getCurrentPosition((data) => {

            api.getAvailableEvents(data.coords.latitude, data.coords.longitude)
            .then(res => {
                console.log(res);
                this.setState({
                    loading: false,
                    events: res.events,
                    eventIndex: 0
                });
            });
        });
    }

    nextCard = () => {
        this.setState({eventIndex: this.state.eventIndex + 1});
    };

    getEventCards() {

        const {events, eventIndex} = this.state;

        return events.slice(eventIndex, eventIndex + 4).reverse().map(event => {
            return (
                <EventCard
                    key={event._id}
                    title={event.title}
                    image={event.image}
                    onSwipe={this.nextCard}
                />);
        });
    }

    render() {

        return this.state.loading ? (
            <View style={styles.searchingContainer}>
                <Text style={styles.searchingTxt}>Finding events</Text>
                <ActivityIndicator size='large' color={colours.primaryText} />
            </View>
        ) : (
            <View style={styles.cardContainer}>
                {this.getEventCards()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchingContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: colours.primaryBackground
    },
    searchingTxt: {
        textAlign: 'center',
        color: colours.primaryText,
        fontSize: 24,
        margin: 10
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: colours.primaryBackground
    },
});