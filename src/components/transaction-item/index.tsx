import React from 'react';
import {Transaction} from '../../model/transaction';
import {
  Container,
  Details,
  DateText,
  VendorText,
  AmountText,
  TypeText,
  DetailsHorizontal,
} from './style';
import TypeIcon from '../type-icon';

type TransactionItemProps = {
  onPress: () => void;
  transaction: Transaction;
};

const TransactionItem: React.FC<TransactionItemProps> = ({
  onPress,
  transaction,
}) => {
  return (
    <Container onPress={onPress}>
      <TypeIcon type={transaction.Type} />
      <Details>
        <VendorText>{transaction.Vendor}</VendorText>
        <DetailsHorizontal>
          <AmountText transactionType={transaction.Type}>
            ${transaction.Amount.toFixed(2)}
          </AmountText>
          <TypeText>({transaction.Type})</TypeText>
        </DetailsHorizontal>
        <DateText>{new Date(transaction.Date).toLocaleDateString()}</DateText>
      </Details>
    </Container>
  );
};

export default TransactionItem;
