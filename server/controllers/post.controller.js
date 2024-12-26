import prisma from '../config/prisma.js';
import { validatePost } from '../validators/post.validator.js';

export const createPost = async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { title, price, images } = req.body;
    const userId = req.user.id;

    const post = await prisma.post.create({
      data: {
        title,
        price,
        images,
        userId,
        status: 'AVAILABLE'
      }
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
            verificationLevel: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
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

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};