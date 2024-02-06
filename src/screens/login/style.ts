import {Dimensions, ViewProps} from 'react-native';
import styled from 'styled-components/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  background-color: '#f0f0f0';
`;

export const LogoContainer = styled.View`
  position: absolute;
  top: 0;
  height: ${screenHeight * 0.35}px;
  width: ${screenWidth}px;
  overflow: hidden;
`;

export const StyledLogo = styled.Image`
  width: 100%;
  height: 100%;
`;

interface InputContainerProps extends ViewProps {
  keyboardOpen: boolean;
}

export const InputsContainer = styled.View<InputContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f0f0f0;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 20px;
  margin-top: ${({keyboardOpen}) => {
    return keyboardOpen ? '24px' : `${screenHeight * 0.3}px`;
  }};
`;

export const StyledTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
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

export const StyledSignUpButton = styled(StyledButton)`
  border-color: #004c31;
  border-width: 1px;
  background-color: transparent;
`;

export const StyledSignUpButtonText = styled(StyledButtonText)`
  color: #004c31;
`;

export const StyledForgotPasswordButton = styled.TouchableOpacity`
  margin-top: 10px;
`;

export const StyledForgotPasswordButtonText = styled(StyledButtonText)`
  color: #004c31;
  font-size: 16px;
`;
