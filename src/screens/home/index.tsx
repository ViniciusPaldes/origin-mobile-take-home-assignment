import React from 'react';
import TransactionList from '../../components/transation-list';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  return <TransactionList navigation={navigation} />;
};

export default HomeScreen;
