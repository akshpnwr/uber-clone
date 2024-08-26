import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const onSingUpPress = () => {
    console.log('form', form);
  };

  return (
    <ScrollView className="bg-white">
      <View>
        <View className="relative h-[225px] w-full">
          <Image className="h-full w-full" source={images.signUpCar} />
          <Text className="absolute bottom-8 left-5 text-center font-JakartaSemiBold text-2xl">
            Welcome 👋
          </Text>
        </View>
        <View className="px-4">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />
          <CustomButton
            title="Log in"
            className="mt-6"
            onPress={onSingUpPress}
          />
          <OAuth />
          <Link
            href="/sign-up"
            className="mt-5 text-center text-base text-general-200"
          >
            <Text>Don't have an account?</Text>
            <Text className="text-primary-500">Sign up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
