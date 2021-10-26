// implement your posts router here
const express = require('express');

const router = express.Router();

const Posts = require('./posts-model.js');

// [GET] /api/posts - Returns **an array of all the post objects** contained in the database
router.get('/', (req, res) => {
    Posts.find(req.query)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The posts information could not be retrieved',
        });
    });
});

// [GET] /api/posts/:id - Returns **the post object with the specified id**


// [GET] /api/posts/:id/comments - Returns an **array of all the comment objects** associated with the post with the specified id


// [POST] /api/posts - Creates a post using the information sent inside the request body and returns **the newly created post object**


// [PUT] /api/posts/:id - Updates the post with the specified id using data from the request body and **returns the modified document**, not the original


// [DELETE] /api/posts/:id - Removes the post with the specified id and returns the **deleted post object**


module.exports = router