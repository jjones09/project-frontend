import React, {Component} from 'react';
import {AsyncStorage, Image, ScrollView, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Button from "../Button/";

import styles from './styles';
import {colours} from "../common/styles";

import api from "../../lib/api-interface/apiInterface";
import RNGooglePlaces from "react-native-google-places";

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
            location: ''
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

    updateStateTitle(val) {
        this.setState({eventTitle: val});
    };

    updateTempURL(val) {
        this.setState({tempURL: val});
    };

    getImgBtn() {
        return (this.state.imgSelected) ?
            (<Button colour='grey'
                     text='Clear'
                     onPress={this.clearImage.bind(this)}/>) :
            (<Button text='OK'
                     onPress={this.getImage.bind(this)}/>);
    }

    getImage() {
        this.setState({imgSelected: !this.state.imgSelected});
        this.setState({eventImg: {uri: this.state.tempURL}});
    };

    clearImage() {
        this.setState({imgSelected: !this.state.imgSelected});
        this.setState({eventImg: {uri: ''}});
    }

    toggleModal() {
        this.setState({showModal: true});
    }

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

    clearAddress() {
        this.setState({location: ''})
    }

    getAddress() {
        if (this.state.location) {
            let addressLines = this.state.location.address.map((addrLine, i) => {
                return (<Text key={i} style={styles.sectionText}>{addrLine}</Text>)
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

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>

                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View>
                        <View>
                            <Text style={styles.header}>Title</Text>
                            <View style={styles.tbContainer}>
                                <TextInput
                                    style={styles.tbTitleStyle}
                                    autoGrow={false}
                                    maxLength={100}
                                    onChangeText={this.updateStateTitle.bind(this)}
                                    placeholder='e.g My Games Night'
                                />
                            </View>
                            <View>
                                <Text style={styles.titleCounter}>
                                    {this.state.eventTitle.length}/200
                                </Text>
                            </View>
                        </View>

                        {/*Photo for event*/}
                        <Text style={styles.header}>Image</Text>
                        <View style={styles.tbContainer} >
                            <Image style={styles.eventImg}
                                   source={this.state.eventImg}/>
                        </View>

                        <View style={styles.sideBySide}>
                            <TextInput
                                editable={!this.state.imgSelected}
                                style={styles.tbUrlStyle}
                                autoGrow={false}
                                onChangeText={this.updateTempURL.bind(this)}
                                placeholder='Enter Image URL'
                            />
                            {this.getImgBtn()}
                        </View>

                        <View>
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

                        <View>
                            <Text style={styles.header}>Location</Text>
                            {this.getAddress()}
                            {this.getLocationBtns()}
                        </View>


                        <Text style={styles.header}>Description</Text>
                        <View style={styles.rowContainer}>
                            <TextInput
                                style={styles.tbDescStyle}
                                maxLength={150}
                                textAlignVertical='top'
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={this.updateStateTitle.bind(this)}
                                placeholder='Say a few words about your event'
                            />

                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    };
}