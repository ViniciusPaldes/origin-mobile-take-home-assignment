import React, {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {signUp} from '../../auth';
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

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during signup.';
      Alert.alert('Signup Failed', errorMessage);
    }
  };

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <StyledLogo
        source={require('../../../assets/logo.png')}
        resizeMode="contain"
      />
      <StyledTitle>Sign Up</StyledTitle>
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
