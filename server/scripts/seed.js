import { getDatabase, initializeDatabase } from '../config/database.js';
import { generateId } from '../utils/db-helpers.js';
import bcrypt from 'bcryptjs';

async function seed() {
  const db = await getDatabase();

  // Create sample users
  const users = [
    {
      id: generateId(),
      username: 'aysel.m',
      email: 'aysel@example.com',
      password: await bcrypt.hash('password123', 10),
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      verification_level: 'VERIFIED',
      trust_score: 85
    },
    {
      id: generateId(),
      username: 'cavid_94',
      email: 'cavid@example.com',
      password: await bcrypt.hash('password123', 10),
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      verification_level: 'PREMIUM',
      trust_score: 95
    }
  ];

  // Insert users
  for (const user of users) {
    await db.run(`
      INSERT OR IGNORE INTO users (id, username, email, password, avatar, verification_level, trust_score)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [user.id, user.username, user.email, user.password, user.avatar, user.verification_level, user.trust_score]);
  }

  // Create sample posts
  const posts = [
    {
      id: generateId(),
      title: 'iPhone 13 Pro Max',
      description: 'Mükəmməl vəziyyətdə, tam orjinal',
      price: 1899.99,
      image_urls: JSON.stringify([
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
        'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?w=800'
      ]),
      status: 'AVAILABLE',
      is_sponsored: true,
      category_id: 'phones',
      user_id: users[0].id
    },
    {
      id: generateId(),
      title: 'MacBook Pro M2',
      description: 'Yeni model, qutuda, istifadə edilməyib',
      price: 3499.99,
      image_urls: JSON.stringify([
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800'
      ]),
      status: 'AVAILABLE',
      is_sponsored: false,
      category_id: 'laptops',
      user_id: users[1].id
    }
  ];

  // Insert posts
  for (const post of posts) {
    await db.run(`
      INSERT OR IGNORE INTO posts (id, title, description, price, image_urls, status, is_sponsored, category_id, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [post.id, post.title, post.description, post.price, post.image_urls, post.status, post.is_sponsored, post.category_id, post.user_id]);
  }

  // Create sample comments
  const comments = [
    {
      id: generateId(),
      text: 'Qiymətdə endirim mümkündür?',
      user_id: users[1].id,
      post_id: posts[0].id
    },
    {
      id: generateId(),
      text: 'Əla vəziyyətdədir, məsləhət görürəm',
      user_id: users[0].id,
      post_id: posts[1].id
    }
  ];

  // Insert comments
  for (const comment of comments) {
    await db.run(`
      INSERT OR IGNORE INTO comments (id, text, user_id, post_id)
      VALUES (?, ?, ?, ?)
    `, [comment.id, comment.text, comment.user_id, comment.post_id]);
  }

  // Create sample likes
  const likes = [
    {
      id: generateId(),
      user_id: users[0].id,
      post_id: posts[1].id
    },
    {
      id: generateId(),
      user_id: users[1].id,
      post_id: posts[0].id
    }
  ];

  // Insert likes
  for (const like of likes) {
    await db.run(`
      INSERT OR IGNORE INTO likes (id, user_id, post_id)
      VALUES (?, ?, ?)
    `, [like.id, like.user_id, like.post_id]);
  }

  console.log('Database seeded successfully!');
}

// Run seeder
seed().catch(console.error);