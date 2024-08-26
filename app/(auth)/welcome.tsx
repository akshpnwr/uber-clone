import CustomButton from '@/components/CustomButton';
import { onboarding } from '@/constants';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = onboarding.length - 1 === activeIndex;

  const handleOnPress = () => {
    if (isLastSlide) {
      router.replace('/(auth)/sign-up');
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace('/sign-up');
        }}
        className="flex w-full items-end p-5"
      >
        <Text className="font-JakartaBold text-base text-black">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#E2E8F0]" />
        }
        activeDot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#0286ff]" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="h-[300px] w-full"
              resizeMode="contain"
            />
            <View className="mx-8 mt-4">
              <Text className="mb-3 text-center font-JakartaBold text-3xl text-black">
                {item.title}
              </Text>
              <Text className="text-center font-JakartaSemiBold text-lg text-gray-400">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={`${isLastSlide ? 'Get Started' : 'Next'}`}
        className="mb-4 w-11/12"
        onPress={handleOnPress}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
