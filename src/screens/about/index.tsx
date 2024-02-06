import React from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Container, Label, Button, ButtonText} from './style';

const AboutScreen = () => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  return (
    <Container>
      <Label>
        Tech Challenge for Orbit financial, developed by Vinicius Paldes
      </Label>
      <Button onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </Container>
  );
};

export default AboutScreen;
