import {ViewProps} from 'react-native';
import styled from 'styled-components/native';

interface StyledViewProps extends ViewProps {
  transactionType: string;
  large?: boolean;
}

export const IconContainer = styled.View<StyledViewProps>`
  background-color: ${({transactionType}) => {
    switch (transactionType) {
      case 'withdrawal':
      case 'payment':
        return '#ffebee';
      case 'deposit':
      case 'invoice':
        return '#e8f5e9';
      case 'entertainment':
        return '#3498DB';
      case 'shopping':
        return '#27AE60';
      case 'drinks and dinning':
        return '#2980B9';
      default:
        return '#eeeeee';
    }
  }};
  padding: ${({large}) => {
    return large ? '16px' : '8px';
  }};
  border-radius: ${({large}) => {
    return large ? '50px' : '30px';
  }};
  width: ${({large}) => {
    return large ? '70px' : 'auto';
  }};
  height: ${({large}) => {
    return large ? '70px' : 'auto';
  }};
  align-items: center;
  margin-right: 12px;
`;
