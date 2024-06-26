const { validateComment } = require('./commentValidator');
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

async function createComment(req, res) {
    try {
        const comment = validateComment(req.body);
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

        const newComment = await prismaClient.comment.create({
            data: {
                ...comment,
                createdBy: { connect: { id: createdBy.id } }
            }
        });

        res.status(201).json({
            success: true,
            comment: newComment
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
async function getComments(req, res) {
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

        const comments = await prismaClient.comment.findMany({
            where: {
                createdBy: {
                    id: createdBy.id
                }
            }
        });
        res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
async function getCommentById(req, res) {
    try {
        const commentId = req.params.id; // Extract the comment ID from the request parameters
        const comment = await prismaClient.comment.findUnique({
            where: {
                id: commentId
            }
        });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function updateComment(req, res) {
    try {
        const commentId = req.params.id;
        const comment = validateComment(req.body);

        const existingComment = await prismaClient.comment.findUnique({
            where: {
                id: commentId
            }
        });
        if (!existingComment) {
            return res.status(404).json({
                message: "Comment not found"
            })
        }
        // @ts-ignore
        if (existingComment.userId !== req.user) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        const updatedComment = await prismaClient.comment.update({
            where: {
                id: commentId,
            },
            data: comment
        });

        res.status(200).json({
            success: true,
            updatedComment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function deleteComment(req, res) {
    try {
        const commentId = req.params.id;

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
        const comment = await prismaClient.comment.delete({
            where: {
                id: commentId,
                userId: createdBy.id
            }
        });
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            })
        }
        res.status(200).json({
            success: true,
            comment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    createComment,
    getComments,
    getCommentById,
    updateComment,
    deleteComment
}