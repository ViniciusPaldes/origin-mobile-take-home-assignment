import realm from '../../database';
import Realm from 'realm';

export type Transaction = {
  Id: number;
  Amount: number;
  Date: string;
  Vendor: string;
  Type: string;
  Category: string;
  Lat: number;
  Lon: number;
  ReceiptImage: string | null;
};

interface FilterCriteria {
  type?: string;
  vendor?: string;
}

export const getLocalTransactions = (
  filterCriteria?: FilterCriteria,
): Transaction[] => {
  let transactions = realm.objects('Transaction');

  try {
    if (filterCriteria?.type) {
      transactions = transactions.filtered('type == $0', filterCriteria.type);
    }

    if (filterCriteria?.vendor) {
      transactions = transactions.filtered(
        'vendor == $0',
        filterCriteria.vendor,
      );
    }
  } catch (error) {
    console.error(error);
  }

  transactions = transactions.sorted('date', true);

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
  fetchedTransactions: [Transaction],
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

function addTransactionsToRealm(fetchedTransactions: [Transaction]) {
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

export const getUniqueTransactionTypes = () => {
  const transactions = getLocalTransactions();
  const uniqueTypes = Array.from(new Set(transactions.map(t => t.Type)));
  return uniqueTypes;
};

export const getUniqueVendors = () => {
  const transactions = getLocalTransactions();
  const uniqueVendors = Array.from(new Set(transactions.map(t => t.Vendor)));
  return uniqueVendors;
};
