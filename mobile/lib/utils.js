
export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validatePassword = (password) => {
    return password.length >= 8;
}

export const validatePost = (post) => {
    return {
        description: {
            valid: post.description.length > 0,
            message: "Description is required"
        }
    }
}