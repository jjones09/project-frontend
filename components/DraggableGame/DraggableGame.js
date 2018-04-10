import React, {Component} from 'react';
import {
    Animated,
    PanResponder,
} from 'react-native';

import styles from './styles';

export default class DraggableGame extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY()
        };
    };

    componentWillMount() {
        this._val = {x: 0, y: 0};
        this.state.pan.addListener(value => this._val = value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y}
            ]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(this.state.pan, {
                    toValue: {x: 0, y: 0},
                    friction: 8
                }).start();
            }
        });
        this.state.pan.setValue({x:0, y:0});
    }

    render() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        };

        return (
            <Animated.Image
                { ...this.panResponder.panHandlers}
                style={[styles.gameImg, panStyle]}
                source={{uri: this.props.image}}
            />
        );
    };
}