const { z } = require('zod');

const postSchema = z.object({
    description: z.string(),
});

const validatePost = (data) => {
    const post = postSchema.safeParse(data);
    if (!post.success) {
        throw new Error(post.error.errors[0].message);
    }
    return post.data;
};

module.exports = {
    validatePost
}