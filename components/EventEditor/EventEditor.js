import React, {Component} from 'react';
import {AsyncStorage, Image, ScrollView, Switch, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Button from "../Button/";

import styles from './styles';
import {colours} from "../common/styles";

import api from "../../lib/api-interface/apiInterface";
import RNGooglePlaces from "react-native-google-places";
import ModalWrapper from "../ModalWrapper";
import GamePicker from "../GamePicker";

export default class EventEditor extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            eventTitle: '',
            tempURL: '',
            imgSelected: false,
            eventImg: {uri: ''},
            eventDate: '',
            today: new Date(),
            location: '',
            description: '',
            playingBoard: false,
            selectedGames: [],
            showModal: false
        };
    };

    componentDidMount() {
        this.fetchData().done();
    };

    async fetchData() {
        AsyncStorage.getItem('uID').then(uID => {
            api.getUserPreferences(uID).then(prefs => {
                this.setState(prefs);
                this.setState({initialVals: prefs});
            });
        });
    };

    // Updates the saved title for the event
    updateStateTitle(val) {
        this.setState({eventTitle: val});
    }
    updateStateDescription(val) {
        this.setState({description: val});
    }

    // Updates the value stored within the image URL textbox
    updateTempURL(val) {
        this.setState({tempURL: val});
    };

    // Include the 'OK' or 'Clear' button dependent on whether an image has been included
    getImgBtn() {
        return (this.state.imgSelected) ?
            (<Button colour='grey'
                     text='Clear'
                     onPress={this.clearImage.bind(this)}/>) :
            (<Button text='OK'
                     onPress={this.getImage.bind(this)}/>);
    }

    // Update the image box with the new image URL
    getImage() {
        this.setState({imgSelected: !this.state.imgSelected});
        this.setState({eventImg: {uri: this.state.tempURL}});
    };

    // Remove the image from the image box and clear the URL
    clearImage() {
        this.setState({imgSelected: !this.state.imgSelected});
        this.setState({eventImg: {uri: ''}});
    }

    // Open the google location picker
    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal()
            .then(place => {
                console.log('place - ' + JSON.stringify(place));
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

    getTypeSwitchStyle(compareBool) {
        return (this.state.playingBoard === compareBool) ? styles.activeSwitchLabel : styles.inactiveSwitchLabel;
    };

    openGamePicker () {
        this.setState({showModal: true});
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>

                <ModalWrapper title='Add Games'
                              that={this}
                              vis={this.state.showModal}
                              contents={<GamePicker
                                  playingBoard={this.state.playingBoard}
                                  that={this}
                                  thatProp={'selectedGames'}
                              />}
                />

                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View>
                        {/* START TITLE SECTION */}
                        <View style={styles.section}>
                            <Text style={styles.header}>Title</Text>
                            <View style={styles.rowContainer}>
                                <TextInput
                                    style={styles.tbStyle}
                                    autoGrow={false}
                                    maxLength={100}
                                    onChangeText={this.updateStateTitle.bind(this)}
                                    placeholder='e.g My Games Night'
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
                            <DatePicker
                                style={{width:200}}
                                date={this.state.eventDate}
                                placeholder="Select Date"
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
                                    dateText: {
                                        fontSize: 16
                                    },
                                    placeholderText: {
                                        fontSize: 16
                                    }
                                }}
                            />
                        </View>
                        {/* END DATE/TIME SECTION */}

                        {/* START LOCATION SECTION */}
                        <View style={styles.section}>
                            <Text style={styles.header}>Location</Text>
                            {this.getAddress()}
                            {this.getLocationBtns()}
                        </View>
                        {/* END LOCATION SECTION */}

                        {/* START DESCRIPTION SECTION*/}
                        <View style={styles.section}>
                            <Text style={styles.header}>Description</Text>
                            <View style={styles.rowContainer}>
                                <TextInput
                                    style={styles.tbStyle}
                                    maxLength={150}
                                    textAlignVertical='top'
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={this.updateStateDescription.bind(this)}
                                    placeholder='Say a few words about your event'
                                />
                            </View>
                            <View>
                                <Text style={styles.titleCounter}>
                                    {this.state.description.length}/500
                                </Text>
                            </View>
                        </View>
                        {/* END DESCRIPTION SECTION*/}

                        {/*START EVENT TYPE SECTION*/}
                        <View style={styles.section}>
                            <Text style={styles.header}>Games Type</Text>
                            <View style={styles.sideBySide}>
                                <Text style={this.getTypeSwitchStyle(false)}>Video Games</Text>
                                <Switch
                                    onTintColor={colours.disabledText}
                                    tintColor={colours.disabledText}
                                    thumbTintColor={colours.primaryButtonBackground}
                                    onValueChange={this.toggleGameType.bind(this)}
                                    value={this.state.playingBoard} />
                                <Text style={this.getTypeSwitchStyle(true)}>Board Games</Text>
                            </View>
                            {this.getGames()}
                            <View style={styles.locBtn}>
                                <Button
                                    text="Add/Edit games"
                                    onPress={this.openGamePicker.bind(this)} />
                            </View>
                        </View>
                        {/*END GAMES SECTION*/}




                        {/*START EVENT TYPE SECTION*/}
                        <View style={styles.section}>
                            <Text style={styles.header}>Games Type</Text>
                            <View style={styles.sideBySide}>
                                <Text style={this.getTypeSwitchStyle(false)}>Video Games</Text>
                                <Switch
                                    onTintColor={colours.disabledText}
                                    tintColor={colours.disabledText}
                                    thumbTintColor={colours.primaryButtonBackground}
                                    onValueChange={this.toggleGameType.bind(this)}
                                    value={this.state.playingBoard} />
                                <Text style={this.getTypeSwitchStyle(true)}>Board Games</Text>
                            </View>
                        </View>
                        {/*END EVENT TYPE SECTION*/}




                        {/* START PHOTO SECTION */}

                        {/*<View style={styles.section}>*/}
                            {/*<Text style={styles.header}>Image</Text>*/}
                            {/*<View style={styles.tbContainer} >*/}
                                {/*<Image style={styles.eventImg}*/}
                                       {/*source={this.state.eventImg}/>*/}
                            {/*</View>*/}
                            {/*<View style={styles.game}>*/}
                                {/*<TextInput*/}
                                    {/*editable={!this.state.imgSelected}*/}
                                    {/*style={styles.tbUrlStyle}*/}
                                    {/*autoGrow={false}*/}
                                    {/*onChangeText={this.updateTempURL.bind(this)}*/}
                                    {/*placeholder='Enter Image URL'*/}
                                {/*/>*/}
                                {/*{this.getImgBtn()}*/}
                            {/*</View>*/}
                        {/*</View>*/}
                        {/* END PHOTO SECTION */}


                    </View>
                </ScrollView>
            </View>
        );
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
    }
}