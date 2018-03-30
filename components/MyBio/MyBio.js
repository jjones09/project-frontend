import React, {Component} from 'react';
import {AsyncStorage, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import icon from "./iconStyle";

const api = require("../../lib/api-interface/apiInterface");

export default class MyBio extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            bio: 'Hello!\nHow are you?',
            changes: 'Hello!\nHow are you?'
        };
    };

    async fetchData() {
        AsyncStorage.getItem('uID').then(uID => {
            api.getUserBio(uID).then(res => {
                this.setState({bio: res.bio, changes: res.bio});
            });
        });
    }

    componentDidMount() {
        this.fetchData().done();
    }

    toggleEditable() {
        this.setState({editable: !this.state.editable});
    }

    updateChanges(txt) {
        this.setState({changes: txt});
    }

    cancelEdit() {
        this.setState({changes: this.state.bio});
        this.toggleEditable();
    }

    saveBioEdits() {
        if (this.state.bio !== this.state.changes) {
            this.setState({bio: this.state.changes});
            AsyncStorage.getItem('uID').then(uID => {
                api.setUserBio(uID, this.state.bio);
            });
        }
        this.toggleEditable();
    }

    includeIcons() {
        if (!this.state.editable) {
            return (
                <TouchableOpacity style={styles.editBtn} onPress={this.toggleEditable.bind(this)}>
                    <Icon color={icon.color} name='edit' type='entypo' size={icon.size}/>
                </TouchableOpacity>);
        }
        else {
            return (
                    <View>
                        <TouchableOpacity style={styles.saveBtn} onPress={this.saveBioEdits.bind(this)}>
                            <Icon color={icon.color} name='save' type='entypo' size={icon.size}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelBtn} onPress={this.cancelEdit.bind(this)}>
                            <Icon color={icon.color} name='cross' type='entypo' size={icon.size}/>
                        </TouchableOpacity>
                    </View>

        )
        }
    }

    includeBioCount() {
        if (this.state.editable) {
            return (<Text style={styles.bioCounter}>
                {(this.state.changes) ? this.state.changes.length : '0'}/200
            </Text>);
        }
    }

    render() {
        return (
            <View style={{height: 120}}>
                <View style={styles.container}>
                    <TextInput
                        editable={this.state.editable}
                        multiline={true}
                        autoGrow={false}
                        maxLength={200}
                        height={80}
                        onChangeText={this.updateChanges.bind(this)}
                        style={styles.tbStyle}
                        value={this.state.changes}
                        placeholder="e.g My Games Night"
                    />
                    {this.includeIcons()}
                </View>
                {this.includeBioCount()}
            </View>
        );
    }
}