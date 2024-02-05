import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useFilter} from '../../context/filter';
import {Picker} from '@react-native-picker/picker';
import {StackNavigationProp} from '@react-navigation/stack';
import {transactionOrderOptions} from '../../model/transaction';
import {styles} from './style';

type Props = {
  navigation: StackNavigationProp<any>;
};

const OrderScreen: React.FC<Props> = ({navigation}) => {
  const {filterCriteria, setFilterCriteria} = useFilter();
  const [selectedProperty, setSelectedProperty] = useState('');
  const [orderDirection, setOrderDirection] = useState('ascending');

  useEffect(() => {
    const fetchData = async () => {
      setSelectedProperty(filterCriteria.orderBy || '');
      setOrderDirection(filterCriteria.orderDirection || '');
    };

    fetchData();
  }, [filterCriteria.orderBy, filterCriteria.orderDirection]);

  const applyOrder = () => {
    setFilterCriteria({
      ...filterCriteria,
      orderBy: selectedProperty,
      orderDirection: orderDirection,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Select Property to Order By:</Text>
      <Picker
        selectedValue={selectedProperty}
        onValueChange={itemValue => setSelectedProperty(itemValue)}>
        {transactionOrderOptions.map(property => (
          <Picker.Item key={property} label={property} value={property} />
        ))}
      </Picker>

      <Text>Select Order Direction:</Text>
      <Picker
        selectedValue={orderDirection}
        onValueChange={itemValue => setOrderDirection(itemValue)}>
        <Picker.Item label="Ascending" value="ascending" />
        <Picker.Item label="Descending" value="descending" />
      </Picker>

      <Button title="Apply Order" onPress={applyOrder} />
    </View>
  );
};

export default OrderScreen;
