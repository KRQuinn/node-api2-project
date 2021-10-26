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
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
      .then(posts => {
        if (posts) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The post information could not be retrieved',
        });
    });
});


// [POST] /api/posts - Creates a post using the information sent inside the request body and returns **the newly created post object**
router.post('/', (req, res) => {
    const post = req.body
    if (!post.title || !post.contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post',
        })
    } else {
        Posts.insert(post)
            .then(({ id }) => {
            return Posts.findById(id)
        })
        .then((newPost) => {
            res.status(201).json(newPost)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
            message: 'There was an error while saving the post to the database',
            })
        })
    }
});

// [PUT] /api/posts/:id - Updates the post with the specified id using data from the request body and **returns the modified document**, not the original
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
        Posts.findById(id)
            .then ((postID) => {
                if (!postID) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist'
                    })
                } else {
                    return Posts.update(id, req.body)
                }
            })
            .then((data) => {
                if (data) {
                    return Posts.findById(id)
                }
            })
            .then((updatedPost) => {
                res.status(200).json(updatedPost)
            })
            .catch ((err => {
                console.log(err)
                res.status(500).json({
                    message: 'The post information could not be modified'
                })
            }))
    }
    
})

// [DELETE] /api/posts/:id - Removes the post with the specified id and returns the **deleted post object**


// [GET] /api/posts/:id/comments - Returns an **array of all the comment objects** associated with the post with the specified id

router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Posts.findPostComments(req.params.id)
        if (!comments.length) {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        } else {
            res.status(200).json(comments)
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'The comments information could not be retrieved',
            rawError: err.message
        })
    }
});


module.exports = router