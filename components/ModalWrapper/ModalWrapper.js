import React, {Component} from 'react';
import { Modal, View, Text, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import styles from './styles';
import cancelStyle from './cancelStyle';
import KeyboardSpacer from "react-native-keyboard-spacer";

export default class ModalWrapper extends Component<Props> {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Modal
                onRequestClose={() => console.log("Requesting modal close")}
                visible={this.props.vis}
                style={{position: 'absolute'}}>
                <View style={styles.containerHead}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <TouchableOpacity style={styles.cancel} onPress={this.props.onClose}>
                        <Icon name='cross'
                              type='entypo'
                              size={cancelStyle.size}
                              color={cancelStyle.color}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerContent}
                >{this.props.contents}
                </View>
            </Modal>
        );
    };

    static propTypes = {
        vis: PropTypes.bool,
        title: PropTypes.string
    };

    static defaultProps = {
        vis: false,
        title: 'New Modal'
    };
}