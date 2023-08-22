const express = require ('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')

const Posts = require('../../models/Posts')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @Route POST api/posts
// @desc  Create a post
// @access private
router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
        try{
            const user = await User.findById(req.user.id).select('-userPassword');
    
            const newPost = new Posts ({
                text: req.body.text,
                name: user.userName,
                avatar: user.avatar,
                user: req.user.id
            });
    
            const post = await newPost.save();
            res.json(post);

        }catch(errors){
            console.error(errors.message);
            res.status(500).send("server error")
        }
    }    
});

// @Route GET /posts
// @desc  Create a post
// @access private
router.get('/', auth, async(req, res)=>{
    try {
        const posts = await Posts.find().sort({date: -1})
        res.json(posts)
    } catch (error) {
        console.error(errors.message);
        res.status(500).send("server error")
    }
})

// @Route GET /posts/:id
// @desc  Get posts by id
// @access private
router.get('/:id', auth, async(req, res)=>{
    try {
        const post = await Posts.findById(req.params.id)

        if(!post) {
            return res.status(404).json({msg : 'Post not found'})
        }

        res.json(post)
    } catch (error) {
        if(error.kind=== "ObjectId") {
            return res.status(500).json({msg : 'Post not found'})
        }
        res.status(404).json("server error")
    }
})

// @Route DELETE /posts/:id
// @desc  delete posts by id
// @access private
router.delete('/', auth, async(req, res)=>{
    try {
        const post = await Posts.findById(req.params.id)

        if(!post) {
            return res.status(404).json({msg : 'Post not found'})
        }
          
        //check if user owns the posts
        if(post.user.toString() !== req.user.id){
            return res.status(404).json({msg: "User not authorized"})
        }else{
            await post.remove()
        }
        res.json({msg: "Post Removed"})
    } catch (error) {
        console.error(error.message);
        if(error.kind=== "ObjectId") {
            return res.status(500).json({msg : 'Post not found'})
        }
        res.status(500).send("server error")
    }
})

// @Route DELETE /posts/like/:id
// @desc  like a post
// @access private
router.put('/like/:id', auth, async(req, res)=>{
    try {
        const post = await Posts.findById(req.params.id);
        //check if user already liked post
        if(post.likes.filter(like => like.user.toString()=== req.user.id).length > 0){
            return res.status(400).json({msg: "post already liked"})
        }else{
            post.likes.unshift({user: req.user.id})
            await post.save()
        }
        res.json(post.likes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

// @Route DELETE /posts/unlike/:id
// @desc  like a post
// @access private
router.put('/unlike/:id', auth, async(req, res)=>{
    try {
        const post = await Posts.findById(req.params.id);

        //check if user already liked post
        if(post.likes.filter(like => like.user.toString()=== req.user.id).length === 0){
            return res.status(400).json({msg: "Post has not been liked"})
        }else{
            const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(req.user.id)
            post.likes.splice(removeIndex, 1)
            await post.save()
        }
        res.json(post.likes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

// @Route POST posts/comment/:id
// @desc  Create a post
// @access private
router.post('/comment/:id ',[auth, [check('text', 'Text is required')
.not()
.isEmpty()]]
, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
        try{
            const user = await User.findById(req.user.id).select('-userPassword');
            const post = await Posts.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.userName,
                avatar: user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment)
    
            await post.save();
    
            res.json(post);
        }catch(errors){
            console.error(errors.message);
            res.status(500).send("server error")
        }
    }    
});

// @Route POST posts/comment/:id/:comment_id
// @desc delete comment
// @access private
router.delete('/comment/:id/:comment_id', auth, async(req, res)=>{
    try {
        const post = await Posts.findById(req.params.id)

        //Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        // make sure comment exists 
        if(!comment){
            return res.status(404).json({msg: "comment does not exist"})
        }

        //Check user to make sure they posted the comment
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'user not authorized'})
        }

        // get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
})

module.exports = router;