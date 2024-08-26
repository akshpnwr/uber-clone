import { InputFieldProps } from '@/types/type';
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
          <Text className={`mb-3 font-JakartaSemiBold text-base ${labelStyle}`}>
            {label}
          </Text>
          <View className="flex flex-row items-center justify-start rounded-full border border-neutral-100 bg-neutral-100 focus:border-primary-500">
            {icon && (
              <Image source={icon} className={`ml-4 h-4 w-4 ${iconStyle}`} />
            )}
            <TextInput
              placeholder={placeholder}
              className={`flex-1 rounded-full p-2 text-left font-JakartaSemiBold text-[12.5px] ${className}`}
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
