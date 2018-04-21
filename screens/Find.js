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
        tabBarIcon: (<Icon size={20} color='#FFF' name='page-multiple' type='foundation'/>)
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],
            eventIndex: 0,
            deviceLocation: {},
            dragging: false
        };

        this.opacity = new Animated.Value(0);
    };

    componentWillMount() {
        this.fetchData().done();
    }

    async fetchData() {
        navigator.geolocation.getCurrentPosition((data) => {
            this.setState({deviceLocation: {
                lat: data.coords.latitude,
                    long: data.coords.longitude
            }});

            api.getAvailableEvents(data.coords.latitude, data.coords.longitude)
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({
                    loading: false,
                    events: res.events,
                    eventIndex: 0
                });
            });
        });
    }

    onStartDrag = () => {
        this.setState({dragging: true});

        Animated.timing(this.opacity, {
            duration: 500, toValue: 0.9
        }).start();
    };

    onStopDrag = () => {

        Animated.timing(this.opacity, {
            duration: 300, toValue: 0
        }).start(this.setState({dragging: false}));
    };

    nextCard = () => {
        this.setState({eventIndex: this.state.eventIndex + 1});
    };

    getEventCards() {

        const {events, eventIndex} = this.state;

        return events.slice(eventIndex, eventIndex + 4).reverse().map(event => {
            return (
                <EventCard
                    key={event._id}
                    event={event}
                    deviceLocation={this.state.deviceLocation}
                    onSwipe={this.nextCard}
                    onStartSwipe={this.onStartDrag}
                    onStopSwipe={this.onStopDrag}
                />);
        });


    }

    showPlay() {
        if (this.state.dragging) {
            return (<Animated.Text style={{
                position: 'absolute',
                top: 20,
                width: '100%',
                zIndex: 5,
                fontSize: 38,
                textAlign: 'center',
                color: colours.primaryText,
                opacity: this.opacity.interpolate({
                    inputRange: [0, 0.9],
                    outputRange: [0, 0.9],
                    extrapolate: 'clamp'
                })
            }}>
                ▲ PLAY
            </Animated.Text>);
        }
    }

    showPass() {
        if (this.state.dragging) {
            return (<Animated.Text style={[{
                position: 'absolute',
                bottom: 20,
                width: '100%',
                zIndex: 5,
                fontSize: 35,
                textAlign: 'center',
                color: colours.passEventText,
                opacity: this.opacity.interpolate({
                    inputRange: [0, 0.7],
                    outputRange: [0, 0.7],
                    extrapolate: 'clamp'
                })
            }, ]}>
                ▼ PASS
            </Animated.Text>);
        }
    }

    getEventNumber() {
        return this.state.eventIndex + 1;
    }

    render() {

        return this.state.loading ? (
            <View style={styles.searchingContainer}>
                <Text style={styles.searchingTxt}>Finding events</Text>
                <ActivityIndicator size='large' color={colours.primaryText} />
            </View>
        ) : (
            <View style={styles.cardContainer}>
                {this.showPlay()}
                {this.getEventCards()}
                {this.showPass()}
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