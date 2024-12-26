import prisma from '../config/prisma.js';

export const createNewPost = async (postData, userId) => {
  return prisma.post.create({
    data: {
      ...postData,
      userId
    }
  });
};

export const getPostWithDetails = async (postId) => {
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
          verificationLevel: true
        }
      },
      comments: {
        include: {
          user: {
            select: {
              username: true,
              avatar: true
            }
          }
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true
        }
      }
    }
  });
};