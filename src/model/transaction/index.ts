import realm from '../../database';
import Realm from 'realm';
import {TransactionVM} from '../../viewModel/Transaction';

export class Transaction {
  static schema = {
    name: 'Transaction',
    primaryKey: 'id',
    properties: {
      id: 'int',
      amount: 'double',
      date: 'date',
      vendor: 'string',
      type: 'string',
      category: 'string',
      lat: 'double',
      lon: 'double',
      receiptImage: 'string?',
    },
  };
}

export const getLocalTransactions = (): TransactionVM[] => {
  const transactions = realm.objects('Transaction').sorted('date', true);
  return transactions.map(transaction => ({
    Id: transaction.id as number,
    Amount: transaction.amount as number,
    Date: transaction.date as string,
    Vendor: transaction.vendor as string,
    Type: transaction.type as string,
    Category: transaction.category as string,
    Lat: transaction.lat as number,
    Lon: transaction.lon as number,
    ReceiptImage: transaction.receiptImage as string | null,
  }));
};

export function updateLocalTransactions(
  fetchedTransactions: [TransactionVM],
  forceRefresh = false,
) {
  // If forceRefresh is true, clear existing transactions before adding new ones
  if (forceRefresh) {
    realm.write(() => {
      const existingTransactions = realm.objects('Transaction');
      realm.delete(existingTransactions);
    });
  }
  addTransactionsToRealm(fetchedTransactions);
}

function addTransactionsToRealm(fetchedTransactions: [TransactionVM]) {
  realm.write(() => {
    fetchedTransactions.forEach(transaction => {
      let existingTransaction = realm.objectForPrimaryKey(
        'Transaction',
        transaction.Id,
      );
      if (!existingTransaction) {
        realm.create(
          'Transaction',
          {
            id: transaction.Id,
            amount: transaction.Amount,
            date: new Date(transaction.Date),
            vendor: transaction.Vendor,
            type: transaction.Type,
            category: transaction.Category,
            lat: transaction.Lat,
            lon: transaction.Lon,
            receiptImage: transaction.ReceiptImage,
          },
          Realm.UpdateMode.Modified,
        );
      }
    });
  });
}
