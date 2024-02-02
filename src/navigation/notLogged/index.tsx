import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/login';
import SignUpScreen from '../../screens/signup';
import ForgotPasswordScreen from '../../screens/forgotPassword';

const Stack = createStackNavigator();

const NotLoggedStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{title: 'Recover your password'}}
      />
    </Stack.Navigator>
  );
};

export default NotLoggedStackNavigator;
