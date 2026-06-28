const API = "http://localhost:5000";


// REGISTER

function registerUser(){

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    fetch(`${API}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password
        })
    })
    .then(res=>res.text())
    .then(data=>{
        alert(data);
        window.location.href="login.html";
    });
}



// LOGIN

function loginUser(){

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    fetch(`${API}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    })
    .then(res=>{

        if(!res.ok){
            throw new Error();
        }

        return res.json();
    })
    .then(user=>{

        localStorage.setItem(
            "userId",
            user.id
        );

        localStorage.setItem(
            "userName",
            user.name
        );

        window.location.href="index.html";
    })
    .catch(()=>{
        alert("Invalid Login");
    });
}



// CREATE POST

function createPost(){

    const title =
        document.getElementById("title").value;

    const content =
        document.getElementById("content").value;

    const user_id =
        localStorage.getItem("userId");

    fetch(`${API}/posts`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title,
            content,
            user_id
        })
    })
    .then(res=>res.text())
    .then(data=>{

        alert(data);

        window.location.href =
        "index.html";
    });
}



// LOAD POSTS

function loadPosts(){

    const container =
        document.getElementById(
            "postsContainer"
        );

    if(!container) return;

    fetch(`${API}/posts`)
    .then(res=>res.json())
    .then(posts=>{

        container.innerHTML="";

        posts.forEach(post=>{

            container.innerHTML += `
            <div class="post">

                <h2>${post.title}</h2>

                <p>${post.content}</p>

                <small>
                    By ${post.name}
                </small>

                <br><br>

                <button
                onclick="deletePost(${post.id})">
                    Delete
                </button>

                <hr>

                <input
                id="comment-${post.id}"
                placeholder="Write comment">

                <button
                onclick="addComment(${post.id})">
                    Comment
                </button>

                <div
                id="comments-${post.id}">
                </div>

            </div>
            `;

            loadComments(post.id);
        });
    });
}



// DELETE POST

function deletePost(id){

    fetch(`${API}/posts/${id}`,{
        method:"DELETE"
    })
    .then(res=>res.text())
    .then(data=>{

        alert(data);

        loadPosts();
    });
}



// ADD COMMENT

function addComment(postId){

    const comment_text =
        document.getElementById(
            `comment-${postId}`
        ).value;

    const user_id =
        localStorage.getItem("userId");

    fetch(`${API}/comments`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            post_id:postId,
            user_id,
            comment_text
        })
    })
    .then(res=>res.text())
    .then(data=>{

        loadComments(postId);

        document.getElementById(
            `comment-${postId}`
        ).value="";
    });
}



// LOAD COMMENTS

function loadComments(postId){

    fetch(`${API}/comments/${postId}`)
    .then(res=>res.json())
    .then(comments=>{

        const commentDiv =
        document.getElementById(
            `comments-${postId}`
        );

        if(!commentDiv) return;

        commentDiv.innerHTML="";

        comments.forEach(comment=>{

            commentDiv.innerHTML += `
            <div class="comment">

                <b>
                    ${comment.name}
                </b>

                <br>

                ${comment.comment_text}

            </div>
            `;
        });
    });
}



window.onload=()=>{

    loadPosts();

};
