import React from 'react';
import {Transaction} from '../../model/transaction';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  IconContainer,
  Details,
  DateText,
  VendorText,
  AmountText,
  TypeText,
  DetailsHorizontal,
} from './style';

type TransactionItemProps = {
  onPress: () => void;
  transaction: Transaction;
};

const TransactionItem: React.FC<TransactionItemProps> = ({
  onPress,
  transaction,
}) => {
  const getIcon = (type: string) => {
    let iconName;
    let iconColor = 'black';

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

  return (
    <Container onPress={onPress}>
      <IconContainer transactionType={transaction.Type}>
        {getIcon(transaction.Type)}
      </IconContainer>
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
