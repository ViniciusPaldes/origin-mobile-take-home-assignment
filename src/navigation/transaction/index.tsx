import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from '../mainTab';
import FilterOrderScreen from '../../screens/filterOrder';

const Stack = createStackNavigator();

const TransactionNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FilterOrder"
        component={FilterOrderScreen}
        options={{title: 'Filter and order'}}
      />
    </Stack.Navigator>
  );
};

export default TransactionNavigator;
