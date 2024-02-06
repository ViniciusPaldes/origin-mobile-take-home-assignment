import React, {useState} from 'react';
import {signIn} from '../../services/auth';
import {ActivityIndicator, Alert} from 'react-native';
import {
  Container,
  StyledButton,
  StyledButtonText,
  StyledForgotPasswordButton,
  StyledForgotPasswordButtonText,
  StyledInput,
  StyledSignUpButton,
  StyledSignUpButtonText,
  StyledTitle,
} from './style';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const LoginForm: React.FC<Props> = ({navigation}) => {
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
    <Container>
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
    </Container>
  );
};

export default LoginForm;
