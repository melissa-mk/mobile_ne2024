import CustomButton from '../../components/CustomButton';
import useAuth from '../../hooks/useAuth';
import usePosts from '../../hooks/usePosts';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const { user } = useAuth();
  const { posts } = usePosts();

  const router = useRouter();
  return (
    <SafeAreaView
      className='bg-white h-full px-3 pt-3'
    >
      <FlatList
        data={posts}
        ListEmptyComponent={() => (
          <View className='h-full justify-center items-center bg-gray-950 rounded-lg'>
            <Image
              source={require('../../assets/images/no-data.png')}
              style={{ width: 200, height: 200 }}
              className='rounded-lg'
            />
            <Text className='text-lg text-gray-700 pt-3 '>You haven't created any posts yet.</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='p-3  rounded-lg mb-3 border border-gray-800 shadow-sm'>
            <Text className='text-base text-gray-500 mb-3'>{item.description}</Text>
            <CustomButton
              handlePress={() => router.push(`/post/${item.id}`)}
              title='View'
              containerStyles='p-3 rounded-lg bg-blue-500 text-white text-center w-full'
              variant='outline'
              titleStyles='text-base'
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='mb-6'>
            <Text className='text-xl text-gray-800 justify-center font-rubiksemibold'>Welcome, {user?.name}</Text>
            <Text className='text-gray-500 text-base'>Here are the posts you have created</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
