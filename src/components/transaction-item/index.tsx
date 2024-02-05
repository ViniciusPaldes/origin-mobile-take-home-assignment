import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './style';
import {Transaction} from '../../model/transaction';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type TransactionItemProps = {
  transaction: Transaction;
};

const TransactionItem: React.FC<TransactionItemProps> = ({transaction}) => {
  const getIcon = (type: string) => {
    let iconName;
    let iconColor = 'black'; // Default color, adjust as needed

    switch (type) {
      case 'withdrawal':
      case 'payment':
        iconName = 'arrow-down';
        iconColor = 'red';
        break;
      case 'deposit':
        iconName = 'arrow-up';
        iconColor = 'green';
        break;
      case 'invoice':
        iconName = 'file-text';
        iconColor = 'blue';
        break;
      default:
        iconName = 'question-circle';
        iconColor = 'grey';
    }

    return <FontAwesome name={iconName} size={20} color={iconColor} />;
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
      <View style={styles.iconContainer}>{getIcon(transaction.Type)}</View>
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
