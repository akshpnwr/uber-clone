import CustomButton from '@/components/CustomButton';
import GoogleTextInput from '@/components/GoogleTextInput';
import RideLayout from '@/components/RideLayout';
import { icons } from '@/constants';
import { useLocationStore } from '@/store';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();
  return (
    <RideLayout title="Ride" snapPoints={['85%']}>
      <View>
        <Text className="mb-5 font-JakartaBold text-xl">From</Text>
        <GoogleTextInput
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          icon={icons.target}
          initialLocation={userAddress!}
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="mb-5 font-JakartaBold text-xl">To</Text>
        <GoogleTextInput
          // containerStyle="bg-neutral-100"
          // textInputBackgroundColor="transparent"
          icon={icons.map}
          initialLocation={destinationAddress!}
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        title="Find now"
        onPress={() => router.push('/(root)/confirm-ride')}
      />
    </RideLayout>
  );
};

export default FindRide;
