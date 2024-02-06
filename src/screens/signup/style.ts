import styled from 'styled-components/native';

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fafbf6;
`;

export const StyledLogo = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

export const StyledTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const StyledInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border-color: gray;
  border-width: 1px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: #004c31;
  border-radius: 5px;
  padding-vertical: 12px;
  padding-horizontal: 20px;
  margin-bottom: 10px;
`;

export const StyledButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
