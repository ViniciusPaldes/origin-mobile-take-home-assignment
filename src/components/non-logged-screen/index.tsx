import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {
  ButtonContainer,
  InputsContainer,
  LogoContainer,
  StyledKeyboardAvoidingView,
  StyledLogo,
} from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  navigation?: StackNavigationProp<any>;
  children: React.ReactNode;
};

const NonLoggedScreen: React.FC<Props> = ({navigation, children}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <LogoContainer>
        <StyledLogo source={require('../../../assets/logo.png')} />
      </LogoContainer>
      {navigation && (
        <ButtonContainer onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color="#fff" />
        </ButtonContainer>
      )}
      <InputsContainer keyboardOpen={keyboardVisible}>
        {children}
      </InputsContainer>
    </StyledKeyboardAvoidingView>
  );
};

export default NonLoggedScreen;
