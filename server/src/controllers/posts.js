
const Post = require('../models/Post');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const post = await Post.create({
    title,
    content,
    category,
    author: req.user.id,
    slug: title.toLowerCase().replace(/ /g, '-'),
  });

  res.status(201).json(post);
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const query = {};
  if (category) {
    query.category = category;
  }

  const posts = await Post.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  res.status(200).json(posts);
};

// @desc    Get a single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.status(200).json(post);
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ error: 'User not authorized to update this post' });
  }

  const { title, content } = req.body;

  post.title = title || post.title;
  post.content = content || post.content;

  const updatedPost = await post.save();

  res.status(200).json(updatedPost);
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ error: 'User not authorized to delete this post' });
  }

  await post.remove();

  res.status(200).json({ message: 'Post removed' });
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
