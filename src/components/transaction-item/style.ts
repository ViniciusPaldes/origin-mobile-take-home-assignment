import styled from 'styled-components/native';
import {TextProps, ViewProps} from 'react-native';

interface StyledTextProps extends TextProps {
  transactionType: string;
}

export const Container = styled.TouchableOpacity`
  background-color: #fff;
  margin-vertical: 4px;
  margin-horizontal: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
  flex-direction: row;
  align-items: center;
  padding: 12px;
`;


export const Details = styled.View`
  flex: 1;
`;

export const DetailsHorizontal = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const DateText = styled.Text`
  color: #757575;
  font-size: 14px;
`;

export const VendorText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const AmountText = styled.Text<StyledTextProps>`
  font-size: 18px;
  font-weight: bold;
  color: ${({transactionType}) => {
    switch (transactionType) {
      case 'withdrawal':
      case 'payment':
        return '#d32f2f';
      case 'deposit':
        return '#2e7d32';
      case 'invoice':
        return '#01284f';
      default:
        return '#000';
    }
  }};
`;

export const TypeText = styled.Text`
  font-size: 14px;
  color: #616161;
  margin: 4px;
  font-style: italic;
`;
