import CustomButton from '@/components/CustomButton';
import DriverCard from '@/components/DriverCard';
import RideLayout from '@/components/RideLayout';
import { useDriverStore } from '@/store';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title="Choose a driver" snapPoints={['65%', '85%']}>
      <FlatList
        data={drivers}
        renderItem={({ item, index }) => (
          <DriverCard
            selected={selectedDriver}
            setSelected={() => setSelectedDriver(item.id)}
            item={item}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-10 my-5">
            <CustomButton
              title="Select ride"
              onPress={() => router.push('/(root)/book-ride')}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
