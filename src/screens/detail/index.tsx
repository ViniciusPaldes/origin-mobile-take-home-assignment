import React from 'react';
import {View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {styles} from './style';

const TransactionDetailScreen = ({route}) => {
  const {transaction} = route.params;
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
    </View>
  );
};

export default TransactionDetailScreen;
