const API = "http://localhost:5000/posts"

const USER_API = "http://localhost:5000/users"
const COMMENT_API = "http://localhost:5000/comments"
let currentUser = localStorage.getItem("user")

async function createPost(){

    if(!currentUser){

alert("Please login first")
return

}

let content = document.getElementById("postContent").value

let image = document.getElementById("image").files[0]
if(content.trim() === "" && !image){

alert("Post cannot be empty")
return

}

let formData = new FormData()

formData.append("content",content)
formData.append("userId",currentUser)
formData.append("image",image)

await fetch(API+"/create",{

method:"POST",
body:formData 


})

loadPosts()
document.getElementById("postContent").value = ""
}

async function loadPosts(){

let userRes = await fetch(USER_API + "/" + currentUser)
let currentUserData = await userRes.json()

let res = await fetch(API)

let posts = await res.json()
if(posts.length === 0){
document.getElementById("posts").innerHTML = "<p>No posts yet</p>"
return
}

let html=""

posts.forEach(p=>{

if(p.userId !== currentUser && !currentUserData.following.includes(p.userId)){
return
}

let time = new Date(p.createdAt).toLocaleString()

html += `
<div class="post">

<p><b>${time}</b></p>

<p>${p.content}</p>

${p.image ? `<img src="http://localhost:5000/uploads/${p.image}" width="100%">` : ""}

<p>👍 ${p.likes.length} Likes</p>

<button onclick="likePost('${p._id}')">Like</button>

${p.userId === currentUser ? `<button onclick="deletePost('${p._id}')">Delete</button>` : ""}

<br><br>

<input id="comment${p._id}" placeholder="Write comment">

<button onclick="addComment('${p._id}')">Comment</button>

<div id="comments${p._id}"></div>

</div>
`
setTimeout(()=>{
loadComments(p._id)
},100)

})

document.getElementById("posts").innerHTML = html

}



async function likePost(id){

await fetch(API + "/like/" + id,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId: currentUser

})

})

loadPosts()

}

loadPosts()

async function registerUser(){

let name = document.getElementById("name").value
let email = document.getElementById("email").value
let password = document.getElementById("password").value

await fetch(USER_API + "/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name:name,
email:email,
password:password
})

})

alert("User Registered")

}



async function loginUser(){

let email = document.getElementById("loginEmail").value
let password = document.getElementById("loginPassword").value

let res = await fetch(USER_API + "/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email:email,
password:password
})

})

let data = await res.json()

if(data._id){

currentUser = data._id

localStorage.setItem("user", data._id)

alert("Login successful")

loadPosts()
loadUsers()

}
else{

alert("Invalid login")

}

}

async function addComment(postId){

let text = document.getElementById("comment"+postId).value

await fetch(COMMENT_API + "/create",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

postId:postId,
userId:currentUser,
text:text

})

})

alert("Comment added")

document.getElementById("comment"+postId).value = ""

loadComments(postId)

}

async function loadComments(postId){

let res = await fetch(COMMENT_API + "/" + postId)

let comments = await res.json()

let html = ""

comments.forEach(c => {

html += `<div class="comment">💬 ${c.text}</div>`

})

document.getElementById("comments"+postId).innerHTML = html

}
async function deletePost(id){

await fetch(API + "/delete/" + id,{

method:"DELETE",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
userId: currentUser
})

})

loadPosts()

}

function openProfile(){

window.location.href = "profile.html"

}

async function loadUsers(){

let res = await fetch(USER_API)

let users = await res.json()

let html=""

users.forEach(u=>{

if(u._id !== currentUser){

html += `

<div class="post">

<p>${u.name}</p>

<button onclick="followUser('${u._id}')">Follow</button>

<button onclick="unfollowUser('${u._id}')">Unfollow</button>

</div>

`

}

})

document.getElementById("users").innerHTML = html

}
loadUsers()

function searchUsers(){

let input = document.getElementById("searchUser").value.toLowerCase()

let userCards = document.querySelectorAll("#users .post")

userCards.forEach(card => {

let name = card.innerText.toLowerCase()

if(name.includes(input)){

card.style.display = "block"

}else{

card.style.display = "none"

}

})

}   

async function followUser(targetId){

await fetch(USER_API+"/follow",{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId:currentUser,
targetId:targetId

})

})

alert("User followed")

}

async function unfollowUser(targetId){

await fetch(USER_API+"/unfollow",{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId:currentUser,
targetId:targetId

})

})

alert("User unfollowed")

}

if(currentUser){

loadPosts()
loadUsers()

}

function logout(){

localStorage.removeItem("user")

currentUser = null

alert("Logged out")

location.reload()

}

