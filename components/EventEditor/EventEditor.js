import React, {Component} from 'react';
import {Image, ScrollView, Switch, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Button from "../Button/";

import styles from './styles';
import {colours} from "../common/styles";

import api from "../../lib/api-interface/apiInterface";
import RNGooglePlaces from "react-native-google-places";
import ModalWrapper from "../ModalWrapper";
import GamePicker from "../GamePicker";
import Toast from '@remobile/react-native-toast';

export default class EventEditor extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = this.props.initialVals ? {
                eventTitle: this.props.initialVals.title,
                eventDate: this.props.initialVals.dateTime,
                today: new Date(),
                location: this.props.initialVals.location,
                description: this.props.initialVals.description,
                playingBoard: this.props.initialVals.playingBoard,
                selectedGames: this.props.initialVals.games,
                forGlory: this.props.initialVals.forGlory,
                publicEvent: this.props.initialVals.publicEvent,
                showModal: false,
                eventID: this.props.initialVals.id
            } :
            {
                eventTitle: '',
                eventDate: '',
                today: new Date(),
                location: '',
                description: '',
                playingBoard: false,
                selectedGames: [],
                forGlory: false,
                publicEvent: false,
                showModal: false
            };
    };

    componentDidMount() {
        this.fetchData().done();
    }

    async fetchData() {
        if (this.state.selectedGames.length > 0) {
            let games = this.state.selectedGames;

            let promises = games.map(gameID => {
                return new Promise((resolve, reject) => {
                    api.searchGames(
                        (this.state.playingBoard ? 'board' : 'video'),
                        'id=' + gameID
                    ).then(game => {
                        resolve(game);
                    })
                });
            });

            Promise.all(promises).then(gameDetails => {
               this.setState({selectedGames: gameDetails});
            });
        }
    }

    // Updates the saved title for the event
    updateStateTitle(val) {
        this.setState({eventTitle: val});
    }
    updateStateDescription(val) {
        this.setState({description: val});
    }

    // Open the google location picker
    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal()
            .then(place => {

                this.setState({
                    location: {
                        lat: place.latitude,
                        long: place.longitude,
                        name: place.name,
                        address: place.address.split(', ')
                    }
                });
            })
            .catch(err => {console.log(err.message)});
    }

    // Clear the selected location from state
    clearAddress() {
        this.setState({location: ''})
    }

    // Splits the address into lines to display in location section
    getAddress() {
        if (this.state.location) {
            let addressLines = this.state.location.address.map((addrLine, i) => {
                return (<Text key={i} style={styles.addressText}>{addrLine}</Text>)
            });
            return (
                <View>
                    <Text style={styles.locationName}>{this.state.location.name}</Text>
                    {addressLines}
                </View>
            );
        } else {
            return (<Text style={styles.sectionText}>You haven't set a location yet</Text>);
        }
    }

    // Include the 'Pick location' or 'clear location' button, dependent on whether a location has been set
    getLocationBtns() {
        let contents = (this.state.location) ?
            (<Button
                colour="grey"
                text="Clear Location"
                onPress={this.clearAddress.bind(this)} />) :
            (<Button
                text="Pick a Location"
                onPress={this.openSearchModal.bind(this)} />);

        return (<View style={styles.locBtn}>
            {contents}
        </View>)
    }

    toggleGameType() {
        this.setState({
            playingBoard: !this.state.playingBoard,
            selectedGames: []
        });
    }

    togglePlayStyle() {
        this.setState({
            forGlory: !this.state.forGlory
        });
    }

    togglePrivacy() {
        this.setState({
            publicEvent: !this.state.publicEvent
        });
    }

    getTypeSwitchStyle(compareBool) {
        return (this.state.playingBoard === compareBool) ?
            styles.activeSwitchLabel : styles.inactiveSwitchLabel;
    };

    getPlaySwitchStyle(compareBool) {
        return (this.state.forGlory === compareBool) ?
            styles.activeSwitchLabel : styles.inactiveSwitchLabel;
    };

    getPrivacySwitchStyle(compareBool) {
        return (this.state.publicEvent === compareBool) ?
            styles.activeSwitchLabel : styles.inactiveSwitchLabel;
    };

    getSwitchLabelStyle(compareBool, stateValue) {
        return (stateValue === compareBool) ?
            styles.activeSwitchLabel : styles.inactiveSwitchLabel;
    };

    openGamePicker () {
        this.setState({showModal: true});
    };

    getGames() {
        return this.state.selectedGames.map((game, i) => {
            return (
                <View key={i} style={styles.game}>
                    <Image
                        style={styles.gameImg}
                        source={{uri: game.image}} />
                    <Text style={{textAlign: 'left'}}>{game.name}</Text>
                </View>
            );
        });
    };

    validateParams () {
        let errs = [];

        let title = this.state.eventTitle;
        if (!title || title.split(' ').join().length < 5) {
            errs.push("Missing a valid event title");
        }

        if (!this.state.eventDate) {
            errs.push("Missing event date/time");
        }

        if (!this.state.location) {
            errs.push("Missing event location");
        }

        let desc = this.state.description;
        if (!desc || desc.split(' ').join().length < 5) {
            errs.push("Missing a valid event description");
        }

        if (this.state.selectedGames.length === 0) {
            errs.push("At least one game should be selected");
        }

        return errs;
    }

    getEventObj () {
        console.log(JSON.stringify(this.state));
        return {
            title: this.state.eventTitle,
            dateTime: this.state.eventDate,
            location: this.state.location,
            description: this.state.description,
            playingBoard: this.state.playingBoard,
            games: this.state.selectedGames.map(game => game.id),
            forGlory: this.state.forGlory,
            publicEvent: this.state.publicEvent,
            image: this.state.selectedGames[0].image
        };
    }

    showFormErrors(errs) {
        let toastMsg = "Please fix the following errors before submitting:\n" + errs.join('\n');
        Toast.showLongCenter(toastMsg);
    }

    submitEvent () {
        let formErrs = this.validateParams();

        if (formErrs.length === 0) {
            let eventObj = this.getEventObj();

            api.createEvent(eventObj);
            this.props.onSave();
        }
        else {
            this.showFormErrors(formErrs);
        }
    };

    submitEdits () {
        let formErrs = this.validateParams();
        if (formErrs.length === 0) {
            let eventObj = this.getEventObj();

            api.editEvent(eventObj, this.state.eventID);
            this.props.onSave();
        }
        else {
            this.showFormErrors(formErrs);
        }
    };

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>

                <ModalWrapper
                    title='Add Games'
                    that={this}
                    vis={this.state.showModal}
                    contents={<GamePicker
                        playingBoard={this.state.playingBoard}
                        that={this}
                        thatProp={'selectedGames'}
                    />}
                />

                <ScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    showsVerticalScrollIndicator={true} >
                    <View>
                        {/* START TITLE SECTION */}
                        <View style={styles.section}>
                            <Text style={styles.header}>Title</Text>
                            <View style={styles.sectionDescription}>
                                <Text style={styles.descriptionText}>
                                    Give people a short and snappy summary
                                    of what they can expect at your game night.
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <TextInput
                                    style={styles.tbStyle}
                                    autoGrow={false}
                                    maxLength={100}
                                    onChangeText={this.updateStateTitle.bind(this)}
                                    placeholder="Give your event a name"
                                    value={this.state.eventTitle}
                                />
                            </View>
                            <View>
                                <Text style={styles.titleCounter}>
                                    {this.state.eventTitle.length}/100
                                </Text>
                            </View>
                        </View>
                        {/* END TITLE SECTION */}

                        {/* START DATE/TIME SECTION */}
                        <View style={styles.section}>
                            <Text style={styles.header}>Date and Time</Text>
                            <View style={styles.sectionDescription}>
                                <Text style={styles.descriptionText}>
                                    Let people know when they should arrive (hopefully with snacks).
                                </Text>
                            </View>
                            <DatePicker
                                style={{width:200}}
                                date={this.state.eventDate}
                                placeholder="Pick a Date"
                                mode="datetime"
                                format="ddd DD MMM H:mm"
                                minDate={this.state.today}
                                showIcon={false}
                                onDateChange={date => {
                                    this.setState({eventDate: date});
                                }}
                                customStyles={{
                                    dateInput: {
                                        marginLeft:40,
                                        borderColor: 'transparent',
                                        borderBottomColor: colours.invertedBackground
                                    },
                                    dateText: {fontSize: 16},
                                    placeholderText: {fontSize: 16}
                                }}
                            />
                        </View>
                        {/* END DATE/TIME SECTION */}

                        {/* START LOCATION SECTION */}
                        <View style={styles.section}>
                            <Text style={styles.header}>Location</Text>
                            <View style={styles.sectionDescription}>
                                <Text style={styles.descriptionText}>
                                    Tell players where you're planning on playing games.
                                    Unless you're playing 'Find the Games Night', of course.
                                </Text>
                            </View>
                            {this.getAddress()}
                            {this.getLocationBtns()}
                        </View>
                        {/* END LOCATION SECTION */}

                        {/* START DESCRIPTION SECTION*/}
                        <View style={styles.section}>
                            <Text style={styles.header}>Description</Text>
                            <View style={styles.sectionDescription}>
                                <Text style={styles.descriptionText}>
                                    The world of games has a near infinite supply of characters,
                                    but here we're giving you 200 to tell people a bit more about your event.
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <TextInput
                                    style={styles.tbStyle}
                                    maxLength={200}
                                    textAlignVertical='top'
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={this.updateStateDescription.bind(this)}
                                    placeholder="Let everyone know a bit more about what they can expect"
                                    value={this.state.description}
                                />
                            </View>
                            <View>
                                <Text style={styles.titleCounter}>
                                    {this.state.description.length}/500
                                </Text>
                            </View>
                        </View>
                        {/* END DESCRIPTION SECTION*/}

                        {/*START GAMES SECTION*/}
                        <View style={styles.section}>
                            <Text style={styles.header}>Games</Text>
                            <View style={styles.sectionDescription}>
                                <Text style={styles.descriptionText}>
                                    What would a games night be without games?
                                    Let people know if you'll be sat at a screen or a table,
                                    and give a few examples of what you'll be playing.
                                </Text>
                            </View>
                            <View style={styles.switchRow}>
                                <Text style={this.getSwitchLabelStyle(false, this.state.playingBoard)}>Video Games</Text>
                                <Switch
                                    onTintColor={colours.disabledText}
                                    tintColor={colours.disabledText}
                                    thumbTintColor={colours.primaryButtonBackground}
                                    onValueChange={this.toggleGameType.bind(this)}
                                    value={this.state.playingBoard} />
                                <Text style={this.getSwitchLabelStyle(true, this.state.playingBoard)}>Board Games</Text>
                            </View>
                            {this.getGames()}
                            <View style={styles.locBtn}>
                                <Button
                                    text="Add/Edit games"
                                    onPress={this.openGamePicker.bind(this)} />
                            </View>
                        </View>
                        {/*END GAMES SECTION*/}


                        {/*START PLAY STYLE SECTION*/}
                        <View style={styles.section}>
                            <Text style={styles.header}>Play Style</Text>
                            <View style={styles.sectionDescription}>
                                <Text style={styles.descriptionText}>
                                    Are you here to make some friends, or to take no prisoners?
                                    Pick the play style that suits your event best!
                                </Text>
                            </View>
                            <View style={styles.switchRow}>
                                <Text style={this.getSwitchLabelStyle(false, this.state.forGlory)}>For Fun</Text>
                                <Switch
                                    onTintColor={colours.disabledText}
                                    tintColor={colours.disabledText}
                                    thumbTintColor={colours.primaryButtonBackground}
                                    onValueChange={this.togglePlayStyle.bind(this)}
                                    value={this.state.forGlory} />
                                <Text style={this.getSwitchLabelStyle(true, this.state.forGlory)}>For Glory</Text>
                            </View>
                        </View>
                        {/*END PLAY STYLE SECTION*/}


                        {/*START VISIBILITY SECTION*/}
                        <View style={styles.section}>
                            <Text style={styles.header}>Visibility</Text>
                            <View style={styles.sectionDescription}>
                                <Text style={styles.descriptionText}>
                                    Lastly, are you looking for some new players or
                                    would you rather play with old friends? Your call!
                                </Text>
                            </View>
                            <View style={styles.switchRow}>
                                <Text style={[
                                    this.getSwitchLabelStyle(false, this.state.publicEvent),
                                    styles.smallTxt]}>Just Friends</Text>
                                <Switch
                                    onTintColor={colours.disabledText}
                                    tintColor={colours.disabledText}
                                    thumbTintColor={colours.primaryButtonBackground}
                                    onValueChange={this.togglePrivacy.bind(this)}
                                    value={this.state.publicEvent} />
                                <Text style={[
                                    this.getSwitchLabelStyle(true, this.state.publicEvent),
                                    styles.smallTxt]}>Anyone Welcome</Text>
                            </View>
                        </View>
                        {/*END VISIBILITY SECTION*/}


                        {/*START SUBMIT SECTION*/}
                        <View style={[styles.section, {alignItems:'center'}]}>
                            {this.getSubmitButton()}
                        </View>
                        {/*END SUBMIT SECTION*/}

                    </View>
                </ScrollView>
            </View>
        );
    };

    getSubmitButton() {
        return this.state.eventID ?
            (<View style={{width: 130}}>
                <Button
                    text="Save Changes"
                    onPress={this.submitEdits.bind(this)} />
            </View>) :
            (<View style={{width: 155}}>
                <Button
                    text="Create Your Event"
                    onPress={this.submitEvent.bind(this)} />
            </View>);
    }
}