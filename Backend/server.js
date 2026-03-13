const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/uploads",express.static("uploads"))

mongoose.connect("mongodb://127.0.0.1:27017/socialDB")

const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const commentRoutes = require("./routes/commentRoutes")

app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)

app.listen(5000, () => {
    console.log("Server started on port 5000")
})