import React from 'react';
import {FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import TransactionItem from '../transaction-item';
import {useTransactions} from '../../services/transaction';
import {StackNavigationProp} from '@react-navigation/stack';
import {Transaction} from '../../database/model/transaction';
import {formatISO} from 'date-fns';
import {useFilter} from '../../context/filter';

type Props = {
  navigation: StackNavigationProp<any>;
};

const TransactionList: React.FC<Props> = ({navigation}) => {
  const {transactions, loading, isRefreshing, handleRefresh, handleLoadMore} =
    useTransactions();
  const {filterCriteria, setFilterCriteria} = useFilter();

  const localHandleRefresh = () => {
    setFilterCriteria({});
    handleRefresh();
  };

  const localHandleLoadMore = () => {
    if (filterCriteria.type || filterCriteria.vendor) {
    } else {
      handleLoadMore();
    }
  };
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
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={localHandleRefresh}
        />
      }
      onEndReached={localHandleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
      }
    />
  );
};

export default TransactionList;
