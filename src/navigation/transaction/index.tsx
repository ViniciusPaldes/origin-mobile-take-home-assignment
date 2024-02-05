import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from '../mainTab';
import FilterScreen from '../../screens/filter';
import OrderScreen from '../../screens/order';

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
        name="Filter"
        component={FilterScreen}
        options={{title: 'Filter'}}
      />
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{title: 'Order'}}
      />
    </Stack.Navigator>
  );
};

export default TransactionNavigator;
