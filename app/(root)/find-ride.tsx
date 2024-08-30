import RideLayout from '@/components/RideLayout';
import { useLocationStore } from '@/store';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FindRide = () => {
  const { userAddress, destinationAddress } = useLocationStore();
  return (
    <SafeAreaView>
      <RideLayout title="Go back">
        <Text>
          Find ride form {userAddress} at {destinationAddress}
        </Text>
        <Text>
          Find ride form {userAddress} at {destinationAddress}
        </Text>
        <Text>
          Find ride form {userAddress} at {destinationAddress}
        </Text>
        <Text>
          Find ride form {userAddress} at {destinationAddress}
        </Text>
      </RideLayout>
    </SafeAreaView>
  );
};

export default FindRide;
