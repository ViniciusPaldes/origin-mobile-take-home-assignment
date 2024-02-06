import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {Marker} from 'react-native-maps';
import {
  ActionBt,
  ActionLabel,
  AmountValue,
  Column,
  Container,
  Content,
  ContentAction,
  ContentBody,
  ContentHeader,
  DateValue,
  Label,
  Map,
  Vendor,
} from './style';
import Geolocation from 'react-native-geolocation-service';
import {
  requestLibraryPermission,
  requestLocationPermission,
} from '../../services/location';
import {
  updateTransactionCoordinates,
  uploadImage,
} from '../../services/transaction';
import {launchImageLibrary} from 'react-native-image-picker';
import TypeIcon from '../../components/type-icon';

const TransactionDetailScreen = ({route}) => {
  const {transaction} = route.params;

  useEffect(() => {
    const getPermission = async () => {
      const hasLocationPermission = await requestLocationPermission();
      if (!hasLocationPermission) {
        Alert.alert(
          'Location Permission',
          'Location permission is required to attach your location to a transaction.',
          [{text: 'OK'}],
        );
      }
    };

    getPermission();
  }, []);

  const attachImage = async () => {
    const hasPermission = await requestLibraryPermission();
    if (!hasPermission) {
      Alert.alert(
        'Library Permission',
        'You need to allow access to your photo library to select a picture.',
        [{text: 'OK'}],
      );
    } else {
      const options = {
        mediaType: 'photo',
        selectionLimit: 1,
      };

      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          uploadImage(transaction.Id, uri).then(result => {
            console.log('Result for final upload is ', result);
          });
        }
      });
    }
  };

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

  const getAmountModifier = (type: string) => {
    switch (type) {
      case 'withdrawal':
      case 'payment':
        return '-';
      case 'deposit':
        return '+';
      default:
        return '';
    }
  };

  return (
    <Container>
      <Map
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
      </Map>
      <Content>
        <ContentHeader>
          <TypeIcon type={transaction.Category} large />
          <Vendor>{transaction.Vendor}</Vendor>
        </ContentHeader>
        <ContentBody>
          <Column>
            <Label>Amount</Label>
            <AmountValue type={transaction.Type}>
              {getAmountModifier(transaction.Type)}$
              {transaction.Amount.toFixed(2)}
            </AmountValue>
          </Column>
          <Column>
            <Label>Date</Label>
            <DateValue>
              {new Date(transaction.Date).toLocaleDateString()}
            </DateValue>
          </Column>
        </ContentBody>
        <ContentAction>
          <Label>Receipt</Label>
          <ActionBt onPress={attachImage}>
            <ActionLabel>+ Add your receipt</ActionLabel>
          </ActionBt>
        </ContentAction>
        <ContentAction>
          <Label>Location</Label>
          <ActionBt onPress={attachLocation}>
            <ActionLabel>+ Add your location</ActionLabel>
          </ActionBt>
        </ContentAction>
      </Content>
    </Container>
  );
};

export default TransactionDetailScreen;
