import React, {useState} from 'react';
import {ActivityIndicator, Alert, Platform} from 'react-native';
import {signUp} from '../../services/auth';
import {
  StyledButton,
  StyledButtonText,
  StyledInput,
  StyledKeyboardAvoidingView,
  StyledLogo,
  StyledTitle,
} from './style';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = () => {
    setLoading(true);
    signUp(email, password)
      .catch(error => {
        Alert.alert(
          'Sign Up Failed',
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
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <StyledTitle>Sign Up</StyledTitle>
      )}
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
      <StyledButton onPress={handleSignUp}>
        <StyledButtonText>Sign Up</StyledButtonText>
      </StyledButton>
    </StyledKeyboardAvoidingView>
  );
};

export default SignUpScreen;
