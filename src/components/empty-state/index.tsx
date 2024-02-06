import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Message} from './style';

type EmptyStateProps = {
  iconName: string;
  message: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({iconName, message}) => {
  return (
    <Container>
      <Icon name={iconName} size={24} color="#004c31" />
      <Message>{message}</Message>
    </Container>
  );
};

export default EmptyState;
