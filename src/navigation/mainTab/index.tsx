import React from 'react';
import HomeScreen from '../../screens/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AboutScreen from '../../screens/about';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationOptions from '../../components/navigation-options';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarActiveTintColor: '#01284f',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{display: 'flex'}, null],
        headerRight: () =>
          route.name === 'Transactions' ? (
            <NavigationOptions navigation={navigation} />
          ) : null,
        headerTitle: route.name === 'Transactions' ? 'Transactions' : undefined,
        headerStyle: {
          backgroundColor: '#01284f',
        },
        headerTintColor: '#fff',
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
