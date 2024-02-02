import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from './style';
import {signOut} from '../../auth';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home screen</Text>
      <Button onPress={signOut} title="Logout" />
    </View>
  );
};

export default HomeScreen;
