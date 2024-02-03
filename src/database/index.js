import Realm from 'realm';
import {Transaction} from '../model/transaction';

const realm = new Realm({schema: [Transaction.schema]});

export default realm;
