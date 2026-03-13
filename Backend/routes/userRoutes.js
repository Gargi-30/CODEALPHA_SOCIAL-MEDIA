const express = require("express")
const router = express.Router()
const User = require("../models/User")

router.post("/register", async (req,res)=>{

    const user = new User(req.body)

    await user.save()

    res.json(user)

})

router.get("/", async (req,res)=>{

    const users = await User.find()

    res.json(users)

})

router.post("/login", async (req,res)=>{

const user = await User.findOne({
email:req.body.email,
password:req.body.password
})

if(user){

res.json(user)

}
else{

res.json({message:"Invalid login"})

}

})

router.put("/follow", async (req,res)=>{

const user = await User.findById(req.body.userId)
const target = await User.findById(req.body.targetId)

if(!user.following.includes(req.body.targetId)){

user.following.push(req.body.targetId)
target.followers.push(req.body.userId)

await user.save()
await target.save()

}

res.json("Followed")

})

router.put("/unfollow", async (req,res)=>{

const user = await User.findById(req.body.userId)
const target = await User.findById(req.body.targetId)

user.following = user.following.filter(
id => id !== req.body.targetId
)

target.followers = target.followers.filter(
id => id !== req.body.userId
)

await user.save()
await target.save()

res.json("Unfollowed")

})

router.get("/:id", async (req,res)=>{

const user = await User.findById(req.params.id)

res.json(user)

})

module.exports = router