import React, {Component} from 'react';
import {Animated, Image, PanResponder, Text} from 'react-native';
import styles from "./styles";


export default class EventCard extends Component<Props> {

    constructor(props) {
        super(props);
    };

    componentWillMount() {
        this.pan = new Animated.ValueXY();

        this.cardPanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null,
                {dx: this.pan.x, dy: this.pan.y}
            ]),
            onPanResponderRelease: (e, {dy}) => {
                const absDy = Math.abs(dy);
                const direction = absDy / dy;

                if (absDy > 120) {
                    Animated.decay(this.pan, {
                        velocity: {x: 0, y: 3 * direction},
                        deceleration: 0.995
                    }).start(this.props.nextCard)
                }
                else {
                    Animated.spring(this.pan, {
                        toValue: {x: 0, y: 0},
                        friction: 3.2
                    }).start()
                }
            }
        });
    }

    render() {

        const rotateCard = this.pan.y.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['10deg', '0deg', '-10deg'],
        });

        const animatedStyle = {
            transform: [
                {translateX: this.pan.x},
                {translateY: this.pan.y},
                {rotate: rotateCard}
            ]
        };

        return (
            <Animated.View
                {...this.cardPanResponder.panHandlers}
                style={[styles.card, animatedStyle]}
            >
                <Text style={styles.header}>{this.props.title}</Text>
                <Image
                    style={styles.eventImg}
                    source={{uri: this.props.image}}
                />

            </Animated.View>
        );
    };
}