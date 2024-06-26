const { validatePost } = require('./postValidator');
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

async function createPost(req, res) {
    try {
        const post = validatePost(req.body);
        const createdBy = await prismaClient.user.findUnique({
            where: {
                id: req.user
            }
        })
        if (!createdBy) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const newPost = await prismaClient.post.create({
            data: {
                ...post,
                createdBy: { connect: { id: createdBy.id } }
            }
        });

        res.status(201).json({
            success: true,
            post: newPost
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
async function getPosts(req, res) {
    try {
        const createdBy = await prismaClient.user.findUnique({
            where: {
                id: req.user
            }
        })
        if (!createdBy) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const posts = await prismaClient.post.findMany({
            where: {
                createdBy: {
                    id: createdBy.id
                }
            }
        });
        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
async function updatePost(req, res) {
    try {
        const postId = req.params.id;
        const post = validatePost(req.body);

        const existingPost = await prismaClient.post.findUnique({
            where: {
                id: postId
            }
        });
        if (!existingPost) {
            return res.status(404).json({
                message: "Post not found"
            })
        }
        // @ts-ignore
        if (existingPost.userId !== req.user) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        const updatedPost = await prismaClient.post.update({
            where: {
                id: postId,
            },
            data: post
        });

        res.status(200).json({
            success: true,
            updatedPost
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function deletePost(req, res) {
    try {
        const postId = req.params.id;

        const createdBy = await prismaClient.user.findUnique({
            where: {
                // @ts-ignore
                id: req.user
            }
        })
        if (!createdBy) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const post = await prismaClient.post.delete({
            where: {
                id: postId,
                userId: createdBy.id
            }
        });
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }
        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
}