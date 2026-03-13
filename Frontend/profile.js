const USER_API = "http://localhost:5000/users"
const POST_API = "http://localhost:5000/posts"

let userId = localStorage.getItem("user")

async function loadUser(){

let res = await fetch(USER_API + "/" + userId)

let user = await res.json()

document.getElementById("username").innerText = user.name

document.getElementById("followers").innerText =
"Followers: " + user.followers.length

document.getElementById("following").innerText =
"Following: " + user.following.length

}

async function loadUserPosts(){

let res = await fetch(POST_API)

let posts = await res.json()

let html=""

posts.forEach(p=>{

if(p.userId === userId){

html += `

<div class="post">

<p>${p.content}</p>

<p>👍 ${p.likes.length}</p>

</div>

`

}

})

document.getElementById("myposts").innerHTML = html

}

loadUser()
loadUserPosts()

