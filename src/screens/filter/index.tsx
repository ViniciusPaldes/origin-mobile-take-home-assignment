import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useFilter} from '../../context/filter';
import {
  getUniqueTransactionTypes,
  getUniqueVendors,
} from '../../database/model/transaction';
import {Apply, ApplyText, Container, Label} from './style';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const FilterScreen: React.FC<Props> = ({navigation}) => {
  const {filterCriteria, setFilterCriteria} = useFilter();

  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
  const [vendors, setVendors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const types = await getUniqueTransactionTypes();
      const uniqueVendors = await getUniqueVendors();
      setTransactionTypes(types);
      setVendors(uniqueVendors);

      setSelectedType(filterCriteria.type || '');
      setSelectedVendor(filterCriteria.vendor || '');
    };

    fetchData();
  }, [filterCriteria.type, filterCriteria.vendor]);

  const applyFilters = () => {
    setFilterCriteria({
      ...filterCriteria,
      type: selectedType,
      vendor: selectedVendor,
    });

    navigation.goBack();
  };

  return (
    <Container>
      <Label>Type:</Label>
      <Picker
        selectedValue={selectedType}
        onValueChange={itemValue => setSelectedType(itemValue)}>
        <Picker.Item label="Select Type" value="" />
        {transactionTypes.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>
      <Label>Vendor:</Label>
      <Picker
        selectedValue={selectedVendor}
        onValueChange={itemValue => setSelectedVendor(itemValue)}>
        <Picker.Item label="Select Vendor" value="" />
        {vendors.map(vendor => (
          <Picker.Item key={vendor} label={vendor} value={vendor} />
        ))}
      </Picker>
      <Apply onPress={applyFilters}>
        <ApplyText>Apply Filters</ApplyText>
      </Apply>
    </Container>
  );
};

export default FilterScreen;
