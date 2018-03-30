// import React, {Component} from 'react';
// import {StyleSheet, View, Text, Dimensions, TouchableOpacity} from 'react-native';
// import MapView, { Marker, Callout, ProviderPropType } from 'react-native-maps';
//
// const { width, height } = Dimensions.get('window');
//
// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const SPACE = 0.01;
//
// export default class Callouts extends Component<props> {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             region: {
//                 latitude: LATITUDE,
//                 longitude: LONGITUDE,
//                 latitudeDelta: LATITUDE_DELTA,
//                 longitudeDelta: LONGITUDE_DELTA,
//             },
//             markers: [
//                 {
//                     coordinate: {
//                         latitude: LATITUDE + SPACE,
//                         longitude: LONGITUDE + SPACE,
//                     },
//                 },
//                 {
//                     coordinate: {
//                         latitude: LATITUDE,
//                         longitude: LONGITUDE,
//                     },
//                 },
//                 {
//                     coordinate: {
//                         latitude: LATITUDE + SPACE,
//                         longitude: LONGITUDE - SPACE,
//                     },
//                 },
//             ],
//         };
//     }
//
//     show() {
//         this.marker1.showCallout();
//     }
//
//     hide() {
//         this.marker1.hideCallout();
//     }
//
//     render() {
//         const { region, markers } = this.state;
//         return (
//             <View style={styles.container}>
//                 <MapView
//                     provider={this.props.provider}
//                     style={styles.map}
//                     initialRegion={region}
//                 >
//                     <Marker
//                         ref={ref => { this.marker1 = ref; }}
//                         coordinate={markers[0].coordinate}
//                         title="This is a native view"
//                         description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" // eslint-disable-line max-len
//                     />
//                     <Marker
//                         coordinate={markers[1].coordinate}
//                     >
//                         <Callout style={styles.plainView}>
//
//                             <View>
//                                 <Text>This is a plain view</Text>
//                             </View>
//                         </Callout>
//                     </Marker>
//                     <Marker
//                         coordinate={markers[2].coordinate}
//                         calloutOffset={{ x: -8, y: 28 }}
//                         calloutAnchor={{ x: 0.5, y: 0.4 }}
//                     >
//                         <Callout tooltip style={styles.customView}>
//                         </Callout>
//                     </Marker>
//                 </MapView>
//                 <View style={styles.buttonContainer}>
//                     <View style={styles.bubble}>
//                         <Text>Tap on markers to see different callouts</Text>
//                     </View>
//                 </View>
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity onPress={() => this.show()} style={[styles.bubble, styles.button]}>
//                         <Text>Show</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => this.hide()} style={[styles.bubble, styles.button]}>
//                         <Text>Hide</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     }
// }
//
// Callouts.propTypes = {
//     provider: ProviderPropType,
// };
//
// const styles = StyleSheet.create({
//     customView: {
//         width: 140,
//         height: 100,
//     },
//     plainView: {
//         width: 60,
//     },
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
//     bubble: {
//         flex: 1,
//         backgroundColor: 'rgba(255,255,255,0.7)',
//         paddingHorizontal: 18,
//         paddingVertical: 12,
//         borderRadius: 20,
//     },
//     latlng: {
//         width: 200,
//         alignItems: 'stretch',
//     },
//     button: {
//         width: 80,
//         paddingHorizontal: 12,
//         alignItems: 'center',
//         marginHorizontal: 10,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         marginVertical: 20,
//         backgroundColor: 'transparent',
//     },
// });



import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import RNGooglePlaces from 'react-native-google-places';

export default class LocationPicker extends Component<Props> {

    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal()
            .then(place => {
                console.log('place - ' + JSON.stringify(place));
            })
            .catch(err => {console.log(err.message)});
    }

    render() {
        return (
        <View>
            <TouchableOpacity
            onPress={() => this.openSearchModal()}>
                <Text>Pick a Location</Text>
            </TouchableOpacity>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});