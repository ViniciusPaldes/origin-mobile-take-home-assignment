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
export const ButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 10px;
  padding: 10px;
  z-index: 10;
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
