import Realm from 'realm';

class Transaction {
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

const realm = new Realm({schema: [Transaction.schema]});

export default realm;
