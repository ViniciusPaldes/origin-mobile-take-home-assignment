import React from 'react';
import HomeScreen from '../../screens/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AboutScreen from '../../screens/about';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {TouchableOpacity} from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        // tabBarStyle is used to apply styles to the tab bar itself
        tabBarStyle: [{display: 'flex'}, null],
        // Add this to apply options based on the route
        headerRight: () =>
          route.name === 'Transactions' ? (
            <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
              <FontAwesome name="filter" size={25} color="black" />
            </TouchableOpacity>
          ) : null,
        headerTitle: route.name === 'Transactions' ? 'Transactions' : undefined,
      })}>
      <Tab.Screen
        name="Transactions"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="money" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="info-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
