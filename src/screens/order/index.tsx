import React, {useEffect, useState} from 'react';
import {useFilter} from '../../context/filter';
import {Picker} from '@react-native-picker/picker';
import {StackNavigationProp} from '@react-navigation/stack';
import {transactionOrderOptions} from '../../database/model/transaction';
import {Apply, ApplyText, Container, Label} from './style';

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
    <Container>
      <Label>Select Property to Order By:</Label>
      <Picker
        selectedValue={selectedProperty}
        onValueChange={itemValue => setSelectedProperty(itemValue)}>
        {transactionOrderOptions.map(property => (
          <Picker.Item key={property} label={property} value={property} />
        ))}
      </Picker>

      <Label>Select Order Direction:</Label>
      <Picker
        selectedValue={orderDirection}
        onValueChange={itemValue => setOrderDirection(itemValue)}>
        <Picker.Item label="Ascending" value="ascending" />
        <Picker.Item label="Descending" value="descending" />
      </Picker>

      <Apply onPress={applyOrder}>
        <ApplyText>Apply Order</ApplyText>
      </Apply>
    </Container>
  );
};

export default OrderScreen;
