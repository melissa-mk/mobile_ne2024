const { z } = require('zod');

const commentSchema = z.object({
    description: z.string(),
});

const validateComment = (data) => {
    const comment = commentSchema.safeParse(data);
    if (!comment.success) {
        throw new Error(comment.error.errors[0].message);
    }
    return comment.data;
};

module.exports = {
    validateComment
}