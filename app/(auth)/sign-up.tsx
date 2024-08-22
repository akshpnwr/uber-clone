import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { icons, images } from '@/constants';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const onSingUpPress = () => {
    console.log('form', form);
  };

  return (
    <ScrollView className="bg-white">
      <View>
        <View className="relative w-full h-[225px]">
          <Image className="w-full h-full" source={images.signUpCar} />
          <Text className="text-center text-2xl font-JakartaSemiBold absolute bottom-8 left-5">
            Create your account
          </Text>
        </View>
        <View className="px-4">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title="Sign up"
            className="mt-6"
            onPress={onSingUpPress}
          />
          <Link
            href="/(auth)/sign-in"
            className="text-center mt-5 text-base text-general-200"
          >
            <Text>Already have an account?</Text>
            <Text className="text-primary-500">Log in</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
