import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { user } = useUser();
  return (
    <SafeAreaView className="text-xl">
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
    </SafeAreaView>
  );
};

export default Home;
