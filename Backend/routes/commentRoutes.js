const express = require("express")
const router = express.Router()
const Comment = require("../models/Comment")

router.post("/create", async (req,res)=>{

    const comment = new Comment(req.body)

    await comment.save()

    res.json(comment)

})

router.get("/:postId", async (req,res)=>{

    const comments = await Comment.find({
        postId:req.params.postId
    })

    res.json(comments)

})

module.exports = router