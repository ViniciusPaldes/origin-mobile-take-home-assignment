import React, {useState, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useFilter} from '../../context/filter';
import {
  getUniqueTransactionTypes,
  getUniqueVendors,
} from '../../database/model/transaction';
import {styles} from './style';
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
    <View style={styles.container}>
      <Text>Type:</Text>
      <Picker
        selectedValue={selectedType}
        onValueChange={itemValue => setSelectedType(itemValue)}>
        <Picker.Item label="Select Type" value="" />
        {transactionTypes.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>
      <Text>Vendor:</Text>
      <Picker
        selectedValue={selectedVendor}
        onValueChange={itemValue => setSelectedVendor(itemValue)}>
        <Picker.Item label="Select Vendor" value="" />
        {vendors.map(vendor => (
          <Picker.Item key={vendor} label={vendor} value={vendor} />
        ))}
      </Picker>
      <Button title="Apply Filters" onPress={applyFilters} />
    </View>
  );
};

export default FilterScreen;
