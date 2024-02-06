import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {IconContainer} from './style';

type Props = {
  type: string;
  large?: boolean;
};

const TypeIcon: React.FC<Props> = ({type, large = false}) => {
  const getIcon = () => {
    let iconName;
    let iconColor = 'black';

    switch (type) {
      case 'withdrawal':
      case 'payment':
        iconName = 'arrow-down';
        iconColor = 'red';
        break;
      case 'deposit':
        iconName = 'arrow-up';
        iconColor = 'green';
        break;
      case 'invoice':
        iconName = 'file-text';
        iconColor = '#01284f';
        break;
      case 'entertainment':
        iconName = 'ticket';
        iconColor = 'white';
        break;
      case 'shopping':
        iconName = 'shopping-bag';
        iconColor = 'white';
        break;
      case 'drinks and dinning':
        iconName = 'cutlery';
        iconColor = 'white';
        break;
      default:
        iconName = 'question-circle';
        iconColor = 'white';
    }

    return (
      <FontAwesome name={iconName} size={large ? 35 : 20} color={iconColor} />
    );
  };
  return (
    <IconContainer transactionType={type} large={large}>
      {getIcon()}
    </IconContainer>
  );
};

export default TypeIcon;
