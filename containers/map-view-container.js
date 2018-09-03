import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

class MapScreen extends Component {
        constructor(props) {
        super(props);

        this.state = {
            markerLocation: null
        }
    }

    createMarker = (eventObj) => {
        this.setState({
            markerLocation: eventObj.nativeEvent.coordinate
        });
    }

    renderMarker = () => {
        const {markerLocation} = this.state;
        return markerLocation && <Marker onPress={this.goToWeather} coordinate={markerLocation}/>
    }

    goToWeather = (eventObj) => {
        this.props.navigation.navigate('Weather', {
            coordinate: eventObj.nativeEvent.coordinate
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: 50.431782,
                        longitude: 30.516382,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    zoomControlEnabled={true}
                    onLongPress={this.createMarker}
                >
                {this.renderMarker()}
                </MapView>
            </View>            
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    map: { ...StyleSheet.absoluteFillObject }
  });

export default MapScreen;