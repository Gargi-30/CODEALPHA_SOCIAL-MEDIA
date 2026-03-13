const express = require("express")
const router = express.Router()
const Post = require("../models/Post")
const multer = require("multer")

const storage = multer.diskStorage({

destination:function(req,file,cb){
cb(null,"uploads/")
},

filename:function(req,file,cb){
cb(null,Date.now()+"-"+file.originalname)
}

})

const upload = multer({storage:storage})

router.post("/create", upload.single("image"), async (req,res)=>{

const post = new Post({

userId:req.body.userId,
content:req.body.content,
image:req.file ? req.file.filename : ""

})

await post.save()

res.json(post)

})

router.get("/", async (req,res)=>{

    const posts = await Post.find()

    res.json(posts)

})

router.put("/like/:id", async (req,res)=>{

    const post = await Post.findById(req.params.id)

    post.likes.push(req.body.userId)

    await post.save()

    res.json(post)

})

router.delete("/delete/:id", async (req,res)=>{

const post = await Post.findById(req.params.id)

if(post.userId !== req.body.userId){

return res.json({message:"You cannot delete this post"})

}

await Post.findByIdAndDelete(req.params.id)

res.json("Post deleted")

})

module.exports = router