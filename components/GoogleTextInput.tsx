import { icons } from '@/constants';
import { GoogleInputProps } from '@/types/type';
import React from 'react';
import { Image, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GoogleTextInput = ({
  icon,
  containerStyle,
  textInputBackgroundColor,
  initialLocation,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View className={`z-50 mb-4 rounded-xl bg-white px-2 ${containerStyle}`}>
      <GooglePlacesAutocomplete
        placeholder="Where do you want to go?"
        fetchDetails={true}
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            position: 'relative',
            shadowColor: '#d4d4d4',
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || 'white',
            fontSize: 16,
            fontWeight: '600',
            marginTop: 5,
            width: '100%',
          },
          listView: {
            backgroundColor: textInputBackgroundColor || 'white',
            position: 'relative',
            top: 0,
            width: '100%',
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: 'en',
        }}
        renderLeftButton={() => (
          <View className="h-6 w-6 items-center justify-center">
            <Image
              className="h-6 w-6"
              resizeMode="contain"
              source={icon ? icon : icons.search}
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: 'gray',
          placeholder: initialLocation ?? 'Where do you want to go?',
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
