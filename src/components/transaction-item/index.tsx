import React from 'react';
import {View, Text} from 'react-native';
import {Transaction} from '../../viewModel/Transaction';
import {styles} from './style';

type TransactionItemProps = {
  transaction: Transaction;
};

const TransactionItem: React.FC<TransactionItemProps> = ({transaction}) => {
  // TODO implement better iconography for the whole app
  const getIcon = (type: string) => {
    switch (type) {
      case 'withdrawal':
      case 'payment':
        return '↓';
      case 'deposit':
        return '↑';
      case 'invoice':
        return '📄';
      default:
        return '⧉';
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'withdrawal':
      case 'payment':
        return styles.amountWithdrawal;
      case 'deposit':
        return styles.amountDeposit;
      case 'invoice':
        return styles.amountInvoice;
      default:
        return styles.amount;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{getIcon(transaction.Type)}</Text>
      <View style={styles.details}>
        <Text style={styles.date}>
          {new Date(transaction.Date).toLocaleDateString()}
        </Text>
        <Text style={styles.vendor}>{transaction.Vendor}</Text>
        <Text style={[styles.amount, getAmountColor(transaction.Type)]}>
          ${transaction.Amount.toFixed(2)}
        </Text>
        <Text style={styles.type}>{transaction.Type}</Text>
      </View>
    </View>
  );
};

export default TransactionItem;
