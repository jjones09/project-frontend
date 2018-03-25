import React, {Component} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import icon from "./iconStyle";

export default class MyBio extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            bio: 'Hello!\nHow are you?',
            changes: 'Hello!\nHow are you?'
        };
    };

    // async fetchData() {
    //
    // }
    //
    // componentDidMount() {
    //     this.fetchData().done();
    // }

    toggleEditable() {
        this.setState({editable: !this.state.editable});
    }

    updateChanges(txt) {
        this.setState({changes: txt});
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
                        <TouchableOpacity style={styles.saveBtn} onPress={this.toggleEditable.bind(this)}>
                            <Icon color={icon.color} name='save' type='entypo' size={icon.size}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelBtn} onPress={this.toggleEditable.bind(this)}>
                            <Icon color={icon.color} name='cross' type='entypo' size={icon.size}/>
                        </TouchableOpacity>
                    </View>

        )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    editable={this.state.editable}
                    autoGrow={false}
                    maxLength={200}
                    height={80}
                    onChangeText={this.updateChanges.bind(this)}
                    style={styles.tbStyle}
                    value={this.state.changes}
                />
                {this.includeIcons()}
            </View>
        );
    }
}