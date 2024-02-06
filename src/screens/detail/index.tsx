import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
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
  getAmountModifier,
  updateTransactionCoordinates,
  uploadImage,
} from '../../services/transaction';
import {launchImageLibrary} from 'react-native-image-picker';
import TypeIcon from '../../components/type-icon';
import ReceiptViewer from '../../components/receipt-viewer';

const TransactionDetailScreen = ({route}) => {
  const {transaction} = route.params;
  const [receiptLoading, setReceiptLoading] = useState<boolean>(false);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [viewerVisible, setViewerVisible] = useState<boolean>(false);

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

  useEffect(() => {
    console.log(
      `ReceiptLoading ${receiptLoading} | LocationLoading ${locationLoading}`,
    );
  }, [receiptLoading, locationLoading]);

  const attachImage = async () => {
    if (transaction.ReceiptImage) {
      setViewerVisible(true);
    } else {
      setReceiptLoading(true);
      const hasPermission = await requestLibraryPermission();
      if (!hasPermission) {
        Alert.alert(
          'Library Permission',
          'You need to allow access to your photo library to select a picture.',
          [{text: 'OK'}],
        );
        setReceiptLoading(false);
      } else {
        const options = {
          mediaType: 'photo',
          selectionLimit: 1,
        };

        launchImageLibrary(options, response => {
          try {
            if (response.didCancel) {
              console.log('User cancelled image picker');
              setReceiptLoading(false);
            } else if (response.errorCode) {
              throw new Error(`ImagePicker Error: ${response.errorMessage}`);
            } else {
              const uri = response.assets[0].uri;
              uploadImage(transaction.Id, uri).then(result => {
                console.log('Result is', result);
                if (result?.ok) {
                  Alert.alert(
                    'Success',
                    'Receipt attached to the transaction successfully.',
                  );
                } else {
                  throw new Error('Failed to update transaction receipt');
                }
                setReceiptLoading(false);
              });
            }
          } catch (error) {
            Alert.alert(
              'Error',
              'Failed to attach location to the transaction.',
            );
            console.error(error);
            setReceiptLoading(false);
          }
        });
      }
    }
  };

  const attachLocation = () => {
    setLocationLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        Alert.alert(
          'Attach Location',
          `Confirm attaching your current location (Lat: ${latitude}, Long: ${longitude}) to this transaction?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => setLocationLoading(false),
            },
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
        setLocationLoading(false);
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
      Alert.alert(
        'Success',
        'Location attached to the transaction successfully.',
      );
      setLocationLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to attach location to the transaction.');
      console.error(error);
      setLocationLoading(false);
    }
  };

  return (
    <Container>
      <ReceiptViewer
        visible={viewerVisible}
        onClose={() => setViewerVisible(false)}
        imageUrl={transaction.ReceiptImage}
      />
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
            {receiptLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <ActionLabel>
                {transaction.ReceiptImage
                  ? 'See receipt'
                  : '+ Add your receipt'}
              </ActionLabel>
            )}
          </ActionBt>
        </ContentAction>
        <ContentAction>
          <Label>Location</Label>
          <ActionBt onPress={attachLocation}>
            {locationLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <ActionLabel>+ Add your location</ActionLabel>
            )}
          </ActionBt>
        </ContentAction>
      </Content>
    </Container>
  );
};

export default TransactionDetailScreen;
