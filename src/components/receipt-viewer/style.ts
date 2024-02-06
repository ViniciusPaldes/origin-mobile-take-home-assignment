import styled from 'styled-components/native';

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 16px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ImageStyle = styled.Image`
  width: 300px;
  height: 300px;
  margin-bottom: 15px;
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: #2196f3;
  border-radius: 20px;
  padding: 10px;
  elevation: 2;
`;

export const CloseButtonText = styled.Text`
  color: white;
  text-align: center;
`;
