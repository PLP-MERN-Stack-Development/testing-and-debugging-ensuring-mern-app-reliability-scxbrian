
const express = require('express');
const postRoutes = require('./routes/posts');

const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
