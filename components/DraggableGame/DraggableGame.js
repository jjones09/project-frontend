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
            showDraggable: true,
            dropAreaValues: null,
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1)
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

                if (this.isDropArea(gesture)) {

                    Animated.timing(this.state.opacity, {
                        toValue: 0,
                        duration: 300
                    });

                    let listProp = this.props.thatProp;
                    let games = this.props.that.state[listProp];
                    games.splice(this.props.index, 1);

                    this.props.that.setState({
                        [listProp]: games
                    });

                    this.state.pan.setValue({x:0, y:0});
                    this.state.opacity.setValue(new Animated.Value(1))
                }

                else {
                    Animated.spring(this.state.pan, {
                        toValue: {x: 0, y: 0},
                        friction: 8
                    }).start();
                }
            }
        });
        this.state.pan.setValue({x:0, y:0});
    }

    isDropArea(gesture) {
        return (
            gesture.moveY > 520 &&
            gesture.moveX > 140 &&
            gesture.moveX < 220
        );
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