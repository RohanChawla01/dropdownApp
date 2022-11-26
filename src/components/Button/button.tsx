import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import {style} from './button.style';

interface Props {
  style: ViewStyle;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = (props: Props) => {
  const {label, onClick, disabled} = props;
  return (
    <TouchableOpacity
      style={[style.container, props.style, disabled && style.buttonDisabled]}
      disabled={disabled}
      onPress={onClick}>
      <Text style={style.text}>{label}</Text>
    </TouchableOpacity>
  );
};
