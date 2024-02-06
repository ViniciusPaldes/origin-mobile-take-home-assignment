import React, {useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {signUp} from '../../services/auth';
import {
  Container,
  StyledButton,
  StyledButtonText,
  StyledInput,
  StyledTitle,
} from './style';

const SignUpForm = () => {
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
    <Container>
      <StyledTitle>Create your account</StyledTitle>
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
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <StyledButtonText>Sign Up</StyledButtonText>
        )}
      </StyledButton>
    </Container>
  );
};

export default SignUpForm;
