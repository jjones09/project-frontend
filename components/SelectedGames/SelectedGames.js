import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import DraggableGame from "../DraggableGame";
import iconStyle from "./iconStyle";

export default class SelectedGames extends Component<Props> {

    constructor(props) {
        super(props);
    };

    getGames() {
        let results;
        let listProp = this.props.thatProp;
        if (this.props.that.state[listProp].length === 0) {
            results = (<Text>Find games using the search bar above</Text>);
        }
        else {
            results = this.props.that.state[listProp].map((game, i) => {

                // DRAGGABLE GAME IMAGE
                return (<DraggableGame
                            key={i}
                            index={i}
                            image={game.image}
                            that={this.props.that}
                            thatProp={this.props.thatProp}
                />);
            });
        }
        return results;
    }


    showTrash() {
        let listProp = this.props.thatProp;
        if (this.props.that.state[listProp].length > 0) {

            return (<View style={styles.section}>
                <View style={styles.trashBg}>
                    <Icon
                        name='trash'
                        type='entypo'
                        size={iconStyle.size}
                        color={iconStyle.color}
                    />
                </View>
            </View>);
        }
    }


    render() {
        return (
            <View>
                <View style={[styles.section, {height: 60}]}>
                    {this.getGames()}
                </View>
                {this.showTrash()}
            </View>
        );
    };
}