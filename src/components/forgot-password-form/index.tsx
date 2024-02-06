import React, {useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {resetPassword} from '../../services/auth';
import {Button, ButtonText, Container, Input, Title} from './style';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const ForgotPasswordForm: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = () => {
    setLoading(true);
    resetPassword(email)
      .then(() => {
        Alert.alert(
          'Check your email',
          'A link to reset your password has been sent to your email.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(), // Navigate back when OK is pressed
            },
          ],
        );
      })
      .catch(error => {
        Alert.alert(
          'Failed to send reset email',
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
      <Title>Recover your Account</Title>
      <Input
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button onPress={handleResetPassword}>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <ButtonText>Recover your password</ButtonText>
        )}
      </Button>
    </Container>
  );
};

export default ForgotPasswordForm;
