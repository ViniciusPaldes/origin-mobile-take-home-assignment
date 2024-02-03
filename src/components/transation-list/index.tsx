import React from 'react';
import {FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import TransactionItem from '../transaction-item';
import {useTransactions} from '../../viewModel/transaction';

const TransactionList = () => {
  const {transactions, loading, isRefreshing, handleRefresh, handleLoadMore} =
    useTransactions();

  //TODO implement filter and order options
  return (
    <FlatList
      data={transactions}
      renderItem={({item}) => <TransactionItem transaction={item} />}
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
