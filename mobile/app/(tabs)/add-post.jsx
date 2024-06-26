import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import usePosts from '../../hooks/usePosts'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from 'react-native-toast-notifications'
import { validatePost } from '../../lib/utils'

const AddPost = () => {
    const toast = useToast();
    const { createPost, creatingPost } = usePosts();

    const [formData, setFormData] = useState({
        description: ''
    });

    const handleSubmit = () => {
        if (!formData.description) {
            return toast.show("Say something; don't be shy", {
                type: 'danger'
            });
        }
        const validationResults = validatePost(formData);
        if (!validationResults.description.valid) {
            return toast.show(validationResults.description.message, {
                type: 'danger'
            });
        }
        createPost(formData, true);
    }

    return (
        <SafeAreaView className='p-3 px-5 h-full justify-center'>
            <View>
                <Text className='text-xl font-rubiksemibold text-gray-800'>New Post</Text>
            </View>
            <View className='mb-5 mt-8 bg-black'>
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
                title='Add Post'
                handlePress={handleSubmit}
                isLoading={creatingPost}
                containerStyles='mt-8'
            />
        </SafeAreaView>
    )
}

export default AddPost