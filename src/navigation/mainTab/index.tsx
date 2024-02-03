import React from 'react';
import HomeScreen from '../../screens/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Transactions'}}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
