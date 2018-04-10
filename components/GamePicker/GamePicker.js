import React, {Component} from 'react';
import {
    Animated,
    ActivityIndicator,
    PanResponder,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import styles from './styles';
import {colours} from "../common/styles";

import api from "../../lib/api-interface/apiInterface";
import Button from "../Button";

import Toast from '@remobile/react-native-toast';
import SearchResult from "../SearchResult";
import SelectedGames from "../SelectedGames";

export default class GamePicker extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            searchTerm: '',
            searching: false,
            games: [],
            selected: [],
            pan: new Animated.ValueXY()
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(
                    this.state.pan,
                    {toValue: {x: 0, y: 0}}
                ).start();
            }
        });
    };

    // Update the state with the value in the search bar
    updateQuery(val) {
        this.setState({query: val});
    };

    // Find games on the server
    searchForGames() {
        // Clear any current results, and show spinner
        this.setState({
            games: [],
            searching: true,
            searchTerm: this.state.query
        });

        // Remove focus from search bar
        this.refs.search.blur();

        // Get results from REST API
        api.searchGames(this.getEventType(), this.state.query).then(results => {

            // Add results to state, and disable spinner
            this.setState({
                games: results,
                searching: false,
                query: ''
            });
        });
    };

    // Map the JSON search results to JSX components
    getSearchResults() {

        let results;
        // If there is an active search, show the activity indicator spinner
        if (this.state.searching) {
            results = (
                <ActivityIndicator size='small' color={colours.primaryText} />
            );
        }
        else {
            results = this.state.games.map((game, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        onPress={() => (this.addGame.bind(this))(i)}>
                        <SearchResult
                            imgURL={game.image}
                            name={game.name}
                        />
                    </TouchableOpacity>
                );
            });
        }
        return results;
    }

    addGame(key) {
        let listProp = this.props.thatProp;

        if (this.props.that.state[listProp].length === 5) {
            Toast.showShortCenter('You can only add 5 games. Please remove one before adding another.');
        }
        else {
            let game = this.state.games[key];
            this.props.that.setState({
                [listProp]: [...new Set(this.props.that.state[listProp].concat(game))]
            });
        }
    };

    getGameCount() {
        let listProp = this.props.thatProp;
        let count = this.props.that.state[listProp].length;
        return count.toString() + "/5";
    }

    removeSelectedGame(key) {
        let listProp = this.props.thatProp;
        let games = this.props.that.state[listProp];
        games.splice(key, 1);
        this.props.that.setState({
            [listProp]: games
        });
    }

    getEventType() {
        return (this.props.playingBoard) ? 'board' : 'video'
    };

    getResultsLabel() {
        if (this.state.games.length > 0) {
            return (<Text style={{marginVertical:5}}>Results for '{this.state.searchTerm}':</Text>);
        }
    };

    render() {
        return (
            <View>

                {/*START SEARCH RESULTS SECTION*/}
                <View style={styles.section}>
                    <Text style={styles.header}>Find Games</Text>
                    <View style={styles.sectionContent}>
                        <View style={styles.sideBySide}>
                            <TextInput
                                ref="search"
                                style={styles.tbStyle}
                                autoGrow={false}
                                maxLength={100}
                                onChangeText={this.updateQuery.bind(this)}
                                placeholder="e.g 'Mario Kart'"
                            />
                            <View style={{width: 60}}>
                                <Button
                                    icon='magnifying-glass'
                                    onPress={this.searchForGames.bind(this)} />
                            </View>
                        </View>
                        {this.getResultsLabel()}
                        <View style={{height: 200, alignItems:'center', justifyContent:'center'}}>
                            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                                {this.getSearchResults()}
                            </ScrollView>
                        </View>
                    </View>
                </View>
                {/*END SEARCH RESULTS SECTION*/}

                {/*START ADDED GAMES SECTION*/}
                <View style={styles.section}>
                    <Text style={styles.header}>Added Games</Text>
                    <SelectedGames
                        that={this.props.that}
                        thatProp={this.props.thatProp}
                    />
                </View>
                {/*END ADDED GAMES SECTION*/}

            </View>
        );
    };
}