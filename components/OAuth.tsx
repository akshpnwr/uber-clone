import { Image, Text, View } from 'react-native';
import CustomButton from './CustomButton';
import { icons } from '@/constants';

const OAuth = () => {
  const handleGoogleSignIn = () => {};
  return (
    <View>
      <View className="my-3 flex flex-row items-center">
        <View className="h-[.5px] flex-1 bg-gray-300"></View>
        <Text className="mx-3 text-base text-gray-600">Or</Text>
        <View className="h-[.5px] flex-1 bg-gray-300"></View>
      </View>
      <CustomButton
        IconLeft={() => (
          <Image className="mr-2 h-4 w-4" source={icons.google} />
        )}
        title="Log in with google"
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
