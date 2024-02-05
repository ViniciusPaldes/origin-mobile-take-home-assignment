import React, {useEffect} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {styles} from './style';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationPermission} from '../../services/location';
import {updateTransactionCoordinates} from '../../services/transaction';

const TransactionDetailScreen = ({route}) => {
  const {transaction} = route.params;

  useEffect(() => {
    const getPermission = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert(
          'Location Permission',
          'Location permission is required to attach your location to a transaction.',
          [{text: 'OK'}],
        );
      }
    };

    getPermission();
  }, []);

  const attachLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        Alert.alert(
          'Attach Location',
          `Confirm attaching your current location (Lat: ${latitude}, Long: ${longitude}) to this transaction?`,
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Confirm',
              onPress: () => handleLocationUpdate(latitude, longitude),
            },
          ],
          {cancelable: true},
        );
      },
      error => {
        Alert.alert('Location Error', 'Unable to retrieve current location.');
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleLocationUpdate = async (lat: number, lon: number) => {
    try {
      const response = await updateTransactionCoordinates(
        transaction.Id,
        lat,
        lon,
      );
      if (!response.ok) {
        throw new Error('Failed to update transaction coordinates');
      }
      // Handle success
      Alert.alert(
        'Success',
        'Location attached to the transaction successfully.',
      );
    } catch (error) {
      // Handle failure
      Alert.alert('Error', 'Failed to attach location to the transaction.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Type: {transaction.Type}</Text>
      <Text>Amount: ${transaction.Amount.toFixed(2)}</Text>
      <Text>Date: {new Date(transaction.Date).toLocaleDateString()}</Text>
      <Text>Vendor: {transaction.Vendor}</Text>
      <Text>Category: {transaction.Category}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: transaction.Lat,
          longitude: transaction.Lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{latitude: transaction.Lat, longitude: transaction.Lon}}
          title={transaction.Vendor}
          description={`Amount: $${transaction.Amount.toFixed(2)}`}
        />
      </MapView>
      <Button title="Attach My Location" onPress={attachLocation} />
    </View>
  );
};

export default TransactionDetailScreen;
