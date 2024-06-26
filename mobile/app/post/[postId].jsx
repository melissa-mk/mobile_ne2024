import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import usePosts from '../../hooks/usePosts';
import Ioicons from '@expo/vector-icons/Ionicons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

const PostView = () => {
    const toast = useToast();
    const pathname = usePathname();
    const { posts, updatePost, updatingPost, deletePost, deletingPost } = usePosts();
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [formData, setFormData] = useState({
        description: ''
    });

    useEffect(() => {
        if (pathname) {
            const id = pathname.split('/')[2];
            const post = posts?.find((p) => p.id === id);
            if (post) {
                setPost(post);
                setFormData({
                    description: post.description
                });
            }
        }
    }, [pathname]);

    const handleSubmit = () => {
        if (!formData.description){
            return toast.show("Say something; don't be shy", {
                type: 'danger'
            });
        }
        // check if something changed
        if (formData.description === post?.description) {
            return toast.show("No changes detected", {
                type: 'info'
            });
        }
        updatePost({
            ...formData,
            id: post?.id
        }, true);

    }

    if (!post) return null
    return (
        <SafeAreaView className='bg-white h-full p-3'>
            <View className='flex-row justify-between' >
                <TouchableOpacity
                    onPress={() => router.push('/home')}
                    className='flex-row items-center h-fit'>
                    <Ioicons name='arrow-back' size={24} />
                    <Text>Back to posts</Text>
                </TouchableOpacity>
                <CustomButton
                    isLoading={deletingPost}
                    handlePress={() => deletePost(post.id, true)}
                    title='Delete'
                    variant='outline'
                    titleStyles='text-red-500'
                    containerStyles='border-red-500 w-32 py-1'
                />
            </View >
            <View className='mt-6'>
                <Text className='text-xl font-rubiksemibold text-gray-800'>Post Details</Text>
                <View className='mb-5 mt-4'>
                    <CustomInput
                        value={formData.description}
                        placeholder="What's on your mind?"
                        onChangeText={(val) => setFormData({ ...formData, description: val })}
                        multiline
                        numberOfLines={4}
                        containerStyles='mt-3'
                    />
                </View>
                <CustomButton
                    isLoading={updatingPost}
                    title='Update Post'
                    handlePress={handleSubmit}
                    containerStyles='mt-8'
                />
            </View>
        </SafeAreaView>
    )
}

export default PostView