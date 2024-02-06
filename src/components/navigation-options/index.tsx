import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const NavigationOptions: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        style={styles.action}
        onPress={() => navigation.navigate('Order')}>
        <FontAwesome name="sort" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.action}
        onPress={() => navigation.navigate('Filter')}>
        <FontAwesome name="filter" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationOptions;
