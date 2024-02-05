import React from 'react';
import {FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import TransactionItem from '../transaction-item';
import {useTransactions} from '../../viewModel/transaction';
import {StackNavigationProp} from '@react-navigation/stack';
import {Transaction} from '../../model/transaction';
import {formatISO} from 'date-fns';

type Props = {
  navigation: StackNavigationProp<any>;
};

const TransactionList: React.FC<Props> = ({navigation}) => {
  const {transactions, loading, isRefreshing, handleRefresh, handleLoadMore} =
    useTransactions();

  const handleItemPressed = (selectedTransaction: Transaction) => {
    navigation.navigate('Detail', {
      transaction: {
        ...selectedTransaction,
        Date: formatISO(selectedTransaction.Date),
      },
    });
  };

  return (
    <FlatList
      data={transactions}
      renderItem={({item}) => (
        <TransactionItem
          transaction={item}
          onPress={() => handleItemPressed(item)}
        />
      )}
      keyExtractor={item => item.Id.toString()}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
      }
    />
  );
};

export default TransactionList;
