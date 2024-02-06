import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {resetPassword} from '../../auth';
import {
  Button,
  ButtonText,
  Container,
  Input,
  Logo,
  Title,
  styles,
} from './style';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
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
    } catch (error) {
      Alert.alert('Failed to send reset email', error.message);
    }
  };

  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <Logo source={require('../../../assets/logo.png')} resizeMode="contain" />
      <Title>Recover your Account</Title>
      <Input
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button onPress={handleResetPassword}>
        <ButtonText>Recover your password</ButtonText>
      </Button>
    </Container>
  );
};

export default ForgotPasswordScreen;
