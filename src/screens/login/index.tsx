import React from 'react';
import LoginForm from '../../components/login-form';
import {StackNavigationProp} from '@react-navigation/stack';
import NonLoggedScreen from '../../components/non-logged-screen';

type Props = {
  navigation: StackNavigationProp<any>;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  return (
    <NonLoggedScreen>
      <LoginForm navigation={navigation} />
    </NonLoggedScreen>
  );
};

export default LoginScreen;
