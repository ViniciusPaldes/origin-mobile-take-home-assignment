import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NotLoggedStackNavigator from './notLogged';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import TransactionNavigator from './transaction';

const Stack = createStackNavigator();

function AppNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up the listener for authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NotLogged">
        {user ? (
          <Stack.Screen
            name="MainStack"
            component={TransactionNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="NotLogged"
            component={NotLoggedStackNavigator}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
