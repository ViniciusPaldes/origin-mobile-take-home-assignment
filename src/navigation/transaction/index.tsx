import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from '../mainTab';
import FilterScreen from '../../screens/filter';

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
    </Stack.Navigator>
  );
};

export default TransactionNavigator;
