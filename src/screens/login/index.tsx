import React, {useState} from 'react';
import {ActivityIndicator, Alert, Platform} from 'react-native';
import {signIn} from '../../services/auth';
import {
  StyledButton,
  StyledButtonText,
  StyledForgotPasswordButton,
  StyledForgotPasswordButtonText,
  StyledInput,
  StyledKeyboardAvoidingView,
  StyledLogo,
  StyledSignUpButton,
  StyledSignUpButtonText,
  StyledTitle,
} from './style';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = () => {
    setLoading(true);
    signIn(email, password)
      .catch(error => {
        Alert.alert(
          'Sign In Failed',
          error.message,
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <StyledLogo
        source={require('../../../assets/logo.png')}
        resizeMode="contain"
      />
      <StyledTitle>Welcome to Transactions App</StyledTitle>
      <StyledInput
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <StyledInput
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />
      <StyledButton onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <StyledButtonText>Sign In</StyledButtonText>
        )}
      </StyledButton>
      <StyledSignUpButton onPress={() => navigation.navigate('SignUp')}>
        <StyledSignUpButtonText>Sign Up</StyledSignUpButtonText>
      </StyledSignUpButton>
      <StyledForgotPasswordButton
        onPress={() => navigation.navigate('ForgotPassword')}>
        <StyledForgotPasswordButtonText>
          Forgot Password?
        </StyledForgotPasswordButtonText>
      </StyledForgotPasswordButton>
    </StyledKeyboardAvoidingView>
  );
};

export default LoginScreen;
