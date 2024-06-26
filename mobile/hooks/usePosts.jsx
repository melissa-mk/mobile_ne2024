/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import useSWR from "swr";
import axios from "../lib/axios.config";
import useAuth from "./useAuth";


export default function usePosts() {
    const toast = useToast();
    const router = useRouter();
    const { user } = useAuth();
    const [creatingPost, setCreatingPost] = useState(false);
    const [deletingPost, setDeletingPost] = useState(false);
    const [updatingPost, setUpdatingPost] = useState(false);

    const { data: posts, isLoading, error, mutate } = useSWR("/posts", async (url) => {
        if (!user) return;
        const { data } = await axios.get(url);
        return data.posts;
    });

    useEffect(() => {
        mutate();
    }, [user])

    const createPost = async (post, redirect=false) => {
        setCreatingPost(true);
        try {
            const { data } = await axios.post("/posts", post);
            if (data.success) {
                toast.show("Post created successfully", {
                    type: 'success'
                });
                mutate([...posts || [], data.post]);
                if (redirect) {
                    router.push(`/home`);
                }
            } else {
                toast.show("An error occurred while creating post", {
                    type: 'danger'
                });
            }
        } catch (error) {
            console.error(error);
            toast.show("An error occurred while creating post", {
                type: 'danger'
            });
        } finally {
            setCreatingPost(false);
        }
    }

    const deletePost = async (id, redirect=false) => {
        setDeletingPost(true);
        try {
            const { data } = await axios.delete(`/posts/${id}`);
            if (data.success) {
                toast.show("Post deleted successfully", {
                    type: 'success'
                });
                mutate(posts?.filter(post => post.id !== id));
                if (redirect) {
                    router.push(`/home`);
                }
            } else {
                toast.show("An error occurred while deleting post", {
                    type: 'danger'
                });
            }
        } catch (error) {
            console.error(error);
            toast.show("An error occurred while deleting post", {
                type: 'danger'
            });
        } finally {
            setDeletingPost(false);
        }
    }

    const updatePost = async (post, redirect=false) => {
        setUpdatingPost(true);
        try {
            const { data } = await axios.put(`/posts/${post.id}`, post);
            if (data.success) {
                toast.show("Post updated successfully", {
                    type: 'success'
                });
                mutate(posts?.map(p => p.id === post.id ? post : p));
                if (redirect) {
                    router.push(`/home`);
                }
            } else {
                toast.show("An error occurred while updating post", {
                    type: 'danger'
                });
            }
        } catch (error) {
            console.error(error);
            toast.show("An error occurred while updating post", {
                type: 'danger'
            });
        } finally {
            setUpdatingPost(false);
        }
    }

    return {
        posts,
        isLoading,
        error,
        createPost,
        deletePost,
        updatePost,
        creatingPost,
        deletingPost,
        updatingPost
    }

}