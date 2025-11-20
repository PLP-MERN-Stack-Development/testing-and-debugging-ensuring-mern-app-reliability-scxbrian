const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Post = require('../../src/models/Post');

describe('/api/posts', () => {
  afterEach(async () => {
    await Post.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all posts', async () => {
      await Post.create([
        { title: 'Post 1', content: 'Content 1' },
        { title: 'Post 2', content: 'Content 2' },
      ]);

      const res = await request(app).get('/api/posts');

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('POST /', () => {
    it('should create a new post', async () => {
      const newPost = { title: 'New Post', content: 'New Content' };

      const res = await request(app)
        .post('/api/posts')
        .send(newPost);

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(newPost.title);
      expect(res.body.content).toBe(newPost.content);
    });
  });

  describe('GET /:id', () => {
    it('should return a single post', async () => {
      const post = await Post.create({ title: 'Post 1', content: 'Content 1' });

      const res = await request(app).get(`/api/posts/${post._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(post.title);
    });
  });

  describe('PUT /:id', () => {
    it('should update a post', async () => {
      const post = await Post.create({ title: 'Post 1', content: 'Content 1' });
      const updatedPost = { title: 'Updated Post', content: 'Updated Content' };

      const res = await request(app)
        .put(`/api/posts/${post._id}`)
        .send(updatedPost);

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(updatedPost.title);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a post', async () => {
      const post = await Post.create({ title: 'Post 1', content: 'Content 1' });

      const res = await request(app).delete(`/api/posts/${post._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Post removed');
    });
  });
});
