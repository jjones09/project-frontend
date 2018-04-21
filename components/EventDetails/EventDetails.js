import React, {Component} from 'react';
import {Image, Linking, ScrollView, Text, View} from 'react-native';

import key from '../../config/mapsKey';
import styles from './styles';
import iconStyle from "./iconStyle";
import {Icon} from "react-native-elements";

import api from '../../lib/api-interface/apiInterface';
import UserPic from "../UserPic/UserPic";

export default class EventDetails extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            gameObjs: [],
            host: {},
            attendees: []
        }
    };

    componentWillMount() {
        this.fetchData().done();
    }

    async fetchData() {
        let event = this.props.event;

        console.log(JSON.stringify(event));

        let gameProms = event.games.map(async game => {
            return await api.searchGames(this.getGameType(event.playingBoard), 'id=' + game);
        });

        let games = await Promise.all(gameProms);

        this.setState({gameObjs: games});

        api.getUserPublicProfile(event.host).then(hostObj => {
            hostObj.id = event.host;
            this.setState({host: hostObj});
        });

        event.attendees.map(async playerID => {
            let player = await api.getUserPublicProfile(playerID);
            player.id = playerID;
            this.setState(prev => ({
                attendees: [...prev.attendees, player]
            }));
        });

    }

    getGameType(playingBoard) {
        return playingBoard ? 'board' : 'video';
    }

    buildMapURL(location) {
        return 'https://maps.googleapis.com/maps/api/staticmap?center=' +
            location.lat + ',' + location.long + '&markers=' +
            location.lat + ',' + location.long + '&zoom=16&size=200x200&key=' +
            key;
    }

    getGameIcon(playingBoard) {
        let iconProps = playingBoard ?
            {name: 'dice-multiple', type: 'material-community'} : {name: 'game-controller', type: 'entypo'};
        return (
            <Icon raised
                  color={iconStyle.color}
                  name={iconProps.name}
                  type={iconProps.type}
                  size={iconStyle.size}/>
        );
    }

    getGameLabel(playingBoard) {
        let gameType = playingBoard ? 'Board Games' : 'Video Games';
        return (
            <Text style={styles.typeTxt}>{gameType}</Text>
        );
    }

    getPlayStyleIcon(forGlory) {
        let iconProps = forGlory ?
            {name: 'trophy', type: 'entypo'} : {name: 'emoji-happy', type: 'entypo'};
        return (
            <Icon raised
                  color={iconStyle.color}
                  name={iconProps.name}
                  type={iconProps.type}
                  size={iconStyle.size}/>
        );
    }

    getPlayStyleLabel(forGlory) {
        let playStyle = forGlory ? 'For Glory' : 'For Fun';
        return (
            <Text style={styles.typeTxt}>{playStyle}</Text>
        );
    }

    openExtURL (url) {
        Linking.canOpenURL(url).then(isSupported => {
            if (!isSupported) {
                console.log('Can\'t open url: ' + url);
            }
            else {
                return Linking.openURL(url);
            }
        }).catch(err => console.log('An error occurred', err));
    }

    getPlayingGames() {
        let games = this.state.gameObjs.map((gameObj, i) => {
            return (<View key={i} style={styles.game}>
                <Image
                    style={styles.gameImg}
                    source={{uri: gameObj.image}} />
                <Text style={styles.gameTitle}>{gameObj.name}</Text>
                <Icon
                    name='info-with-circle'
                    type='entypo'
                    color={iconStyle.color}
                    size={iconStyle.size}
                    onPress={() => this.openExtURL(gameObj.extURL)}
                />
            </View>);
        });
        return games;
    }

    getAttending() {
        if (this.state.attendees > 0) {

            this.state.attendees.map((player, i) => {
                return (<View key={i} style={styles.playerIcon}>
                    <UserPic size={50} url={player.url} color='grey'/>
                    <Text style={styles.playerName}>{player.name}</Text>
                </View>);
            });
        }
        else {
            return (<View style={{marginTop: 10, marginBottom: 20}}>
                <Text style={styles.noAttend}>No one... yet!</Text>
                <Text style={styles.noAttend}>Why not be the first?</Text>
            </View>);
        }

    }

    render() {

        let event = this.props.event;
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.header}>
                    {event.title}
                </Text>

                <Image style={styles.eventImg}
                    source={{uri: event.image}} />

                <Text style={styles.descText}>
                    {event.description}
                </Text>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>
                        Date + Time
                    </Text>
                    <Text style={styles.details}>
                        {event.dateTime}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>
                        Location
                    </Text>

                    <View style={styles.location}>
                        <View style={styles.addressView}>
                            <Text style={styles.locationName}>{event.location.name}</Text>
                            {event.location.address.map((line, i) => {
                                return (<Text key={i}>{line}</Text>)
                            })}
                        </View>
                        <Image
                            style={styles.mapImg}
                            source={{
                            uri: this.buildMapURL(event.location)
                        }}/>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>
                        Games
                    </Text>
                    <View style={styles.gameType}>
                        {this.getGameIcon(event.playingBoard)}
                        {this.getGameLabel(event.playingBoard)}
                    </View>
                    {this.getPlayingGames()}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>
                        Play Style
                    </Text>
                    <View style={styles.playStyle}>
                        {this.getPlayStyleIcon(event.forGlory)}
                        {this.getPlayStyleLabel(event.forGlory)}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>
                        Hosted By
                    </Text>
                    <View style={styles.playerIcon}>
                        <UserPic size={50} url={this.state.host.url} color='grey' />
                        <Text style={styles.playerName}>{this.state.host.name}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>
                        Players Attending
                    </Text>
                    {this.getAttending()}
                </View>

            </ScrollView>
        );
    }
}