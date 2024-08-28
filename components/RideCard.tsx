import { icons } from '@/constants';
import { formatDate, formatTime } from '@/lib/utils';
import { Ride } from '@/types/type';
import React from 'react';
import { Image, Text, View } from 'react-native';

const RideCard = ({
  ride: {
    origin_address,
    destination_address,
    destination_longitude,
    destination_latitude,
    driver,
    created_at,
    ride_time,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  return (
    <View className="mb-2 rounded-lg bg-white p-4 pb-6 shadow-sm shadow-neutral-300">
      <View className="mb-2 flex flex-row items-center">
        <View>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="h-[90px] w-[80px] rounded-lg"
          />
        </View>
        <View>
          <View className="mx-5 my-2 flex flex-row items-center">
            <Image className="mr-2 h-5 w-5" source={icons.to} />
            <Text numberOfLines={1}>{origin_address}</Text>
          </View>
          <View className="mx-5 my-2 flex flex-row items-center">
            <Image className="mr-2 h-5 w-5" source={icons.point} />
            <Text numberOfLines={1}>{destination_address}</Text>
          </View>
        </View>
      </View>
      <View className="mb-4 flex w-full flex-row justify-between">
        <Text className="text-md font-JakartaMedium text-gray-500">
          Date & Time
        </Text>
        <Text className="text-md font-JakartaMedium text-gray-500">
          {formatDate(created_at)}, {formatTime(ride_time)}
        </Text>
      </View>
      <View className="mb-4 flex w-full flex-row justify-between">
        <Text className="text-md font-JakartaMedium text-gray-500">Driver</Text>
        <Text className="text-md font-JakartaMedium text-gray-500">
          {driver.first_name} {driver.last_name}
        </Text>
      </View>
      <View className="mb-4 flex w-full flex-row justify-between">
        <Text className="text-md font-JakartaMedium text-gray-500">
          Car seats
        </Text>
        <Text className="text-md font-JakartaMedium text-gray-500">
          {driver.car_seats}
        </Text>
      </View>
      <View className="flex w-full flex-row justify-between">
        <Text className="text-md font-JakartaMedium text-gray-500">
          Payment status
        </Text>
        <Text
          className={`text-md font-JakartaMedium capitalize text-gray-500 ${payment_status === 'paid' ? 'text-green-500' : 'text-red-500'}`}
        >
          {payment_status}
        </Text>
      </View>
    </View>
  );
};

export default RideCard;
