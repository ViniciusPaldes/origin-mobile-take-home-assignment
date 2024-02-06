import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import NonLoggedScreen from '../../components/non-logged-screen';
import SignUpForm from '../../components/signup-form';

type Props = {
  navigation: StackNavigationProp<any>;
};

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  return (
    <NonLoggedScreen navigation={navigation}>
      <SignUpForm />
    </NonLoggedScreen>
  );
};

export default SignUpScreen;
