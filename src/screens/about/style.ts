import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const Label = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #004c31;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16px;
`;
