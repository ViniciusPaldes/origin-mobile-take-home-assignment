import React from 'react';
import {Modal} from 'react-native';
import {
  CenteredView,
  ModalView,
  ImageStyle,
  CloseButton,
  CloseButtonText,
} from './style';

interface ReceiptViewerProps {
  visible: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ReceiptViewer: React.FC<ReceiptViewerProps> = ({
  visible,
  onClose,
  imageUrl,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <CenteredView>
        <ModalView>
          <ImageStyle source={{uri: imageUrl}} />
          <CloseButton onPress={onClose}>
            <CloseButtonText>Close</CloseButtonText>
          </CloseButton>
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

export default ReceiptViewer;
