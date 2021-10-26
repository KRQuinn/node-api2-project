// implement your server here
// require your posts router and connect it here

const express = require('express');
const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());

// routers
server.use('/api/posts', postsRouter);


// Catch-all route
server.get('/', (req, res) => {
    res.send(`
      <h2>Middle Earth Public Forum</h>
      <p>Moderators online: Radaghast, Tom_Bombadil </p>
    `);
  });
  
  module.exports = server;