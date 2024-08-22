import { InputFieldProps } from '@/types/type';
import { Fontisto } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const InputField = ({
  label,
  className,
  labelStyle,
  iconStyle,
  icon,
  placeholder,
  secureTextEntry,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-1 w-full">
          <Text className={`text-base font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View className="flex flex-row items-center justify-start rounded-full bg-neutral-100 border border-neutral-100 focus:border-primary-500">
            {icon && (
              <Image source={icon} className={`w-4 h-4 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              placeholder={placeholder}
              className={`rounded-full p-2 font-JakartaSemiBold text-[12.5px] flex-1 text-left ${className}`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
