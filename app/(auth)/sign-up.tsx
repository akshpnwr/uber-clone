import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { ReactNativeModal } from 'react-native-modal';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const onSingUpPress = async () => {
    console.log('form', form);
    const { email, password } = form;

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === 'complete') {
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: 'success' });
      } else {
        setVerification({
          ...verification,
          error: 'Verification failed',
          state: 'failed',
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="bg-white">
      <View>
        <View className="relative h-[225px] w-full">
          <Image className="h-full w-full" source={images.signUpCar} />
          <Text className="absolute bottom-8 left-5 text-center font-JakartaSemiBold text-2xl">
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
          <OAuth />
          <Link
            href="/sign-in"
            className="mt-5 text-center text-base text-general-200"
          >
            <Text>Already have an account?</Text>
            <Text className="text-primary-500">Log in</Text>
          </Link>
        </View>

        <ReactNativeModal isVisible={verification.state === 'pending'}>
          <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
            <Text className="font-JakartaBold text-3xl">Verified</Text>
            <Text className="font-JakartaMedium text-base text-gray-400">
              We've sent a verification code to {form.email}
            </Text>

            <InputField
              label="code"
              icon={icons.lock}
              placeholder="12345"
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="mt-2 text-sm text-red-500">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify"
              onPress={onVerifyPress}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === 'success'}>
          <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
            <Image
              source={images.check}
              className="mx-auto my-5 h-[110px] w-[110px]"
            />
            <Text className="text-center font-JakartaBold text-3xl">
              Verified
            </Text>
            <Text className="text-center font-JakartaMedium text-base text-gray-400">
              You have successfully verified yourself.
            </Text>
            <CustomButton
              title="Browse home"
              onPress={() => router.replace('/(root)/(tabs)/home')}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
