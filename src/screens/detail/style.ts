import {Dimensions, TextProps} from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Map = styled(MapView)`
  width: ${Dimensions.get('window').width}px;
  height: ${Math.floor(Dimensions.get('window').height / 3)}px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  border-radius: 24px;
  background-color: #fff;
  margin-top: -35px;
  padding: 16px;
`;

export const ContentHeader = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const Vendor = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: black;
  flex: 1;
`;

export const ContentBody = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 8px;
  margin-vertical: 16px;
  border-top-width: 0.2px;
  border-bottom-width: 0.2px;
  border-color: lightgray;
`;

export const Column = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const Label = styled.Text`
  color: gray;
  font-size: 14px;
  text-transform: uppercase;
`;

interface AmountValueProps extends TextProps {
  type: string;
}

export const AmountValue = styled.Text<AmountValueProps>`
  font-size: 24px;
  font-weight: bold;
  color: ${({type}) => {
    switch (type) {
      case 'withdrawal':
      case 'payment':
        return '#d32f2f';
      case 'deposit':
        return '#2e7d32';
      case 'invoice':
        return '#1976d2';
      default:
        return '#000';
    }
  }};
`;

export const DateValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
`;

export const ContentAction = styled.View`
  flex-direction: column;
  padding: 8px;
`;

export const ActionBt = styled.TouchableOpacity`
  background-color: white;
  border-color: #276400;
  border-width: 1px;
  height: 35px;
  border-radius: 16px;
  margin-vertical: 8px;
  padding: 8px 16px;
  flex: 1;
`;

export const ActionLabel = styled.Text`
  color: #276400;
  font-weight: bold;
  font-size: 14px;
`;
