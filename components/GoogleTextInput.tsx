import { GoogleInputProps } from '@/types/type';
import React from 'react';
import { Image, Text, View } from 'react-native';

const GoogleTextInput = ({
  icon,
  containerStyle,
  initialLocation,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View className={`mb-4 rounded-lg bg-white px-2 py-3 ${containerStyle}`}>
      {/* {icon && <Image source={icon} />} */}
      <Text>Search</Text>
    </View>
  );
};

export default GoogleTextInput;
