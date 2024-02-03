import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  date: {
    fontSize: 16,
  },
  vendor: {
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
  },
  amountWithdrawal: {
    color: 'red',
  },
  amountDeposit: {
    color: 'green',
  },
  amountInvoice: {
    color: 'grey',
  },
  type: {
    fontStyle: 'italic',
  },
});
