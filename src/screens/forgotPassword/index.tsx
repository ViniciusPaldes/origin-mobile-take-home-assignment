import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import NonLoggedScreen from '../../components/non-logged-screen';
import ForgotPasswordForm from '../../components/forgot-password-form';

type Props = {
  navigation: StackNavigationProp<any>;
};

const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  return (
    <NonLoggedScreen navigation={navigation}>
      <ForgotPasswordForm navigation={navigation} />
    </NonLoggedScreen>
  );
};

export default ForgotPasswordScreen;
