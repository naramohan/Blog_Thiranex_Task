const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// REGISTER

app.post("/register",(req,res)=>{

    const {name,email,password} = req.body;

    db.query(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        [name,email,password],
        (err,result)=>{

            if(err){
                return res.status(500).send(err);
            }

            res.send("User Registered Successfully");
        }
    );
});


// LOGIN

app.post("/login",(req,res)=>{

    const {email,password} = req.body;

    db.query(
        "SELECT * FROM users WHERE email=? AND password=?",
        [email,password],
        (err,result)=>{

            if(err){
                return res.status(500).send(err);
            }

            if(result.length>0){
                res.json(result[0]);
            }else{
                res.status(401).send("Invalid Credentials");
            }
        }
    );
});


// CREATE POST

app.post("/posts",(req,res)=>{

    const {
        title,
        content,
        user_id
    } = req.body;

    db.query(
        "INSERT INTO posts(title,content,user_id) VALUES(?,?,?)",
        [
            title,
            content,
            user_id
        ],
        (err,result)=>{

            if(err){
                return res.status(500).send(err);
            }

            res.send("Post Created Successfully");
        }
    );
});


// GET ALL POSTS

app.get("/posts",(req,res)=>{

    db.query(
        `SELECT posts.*, users.name
         FROM posts
         JOIN users
         ON posts.user_id = users.id
         ORDER BY posts.id DESC`,
        (err,result)=>{

            if(err){
                return res.status(500).send(err);
            }

            res.json(result);
        }
    );
});


// UPDATE POST

app.put("/posts/:id",(req,res)=>{

    const id = req.params.id;

    const {
        title,
        content
    } = req.body;

    db.query(
        "UPDATE posts SET title=?, content=? WHERE id=?",
        [
            title,
            content,
            id
        ],
        (err,result)=>{

            if(err){
                return res.status(500).send(err);
            }

            res.send("Post Updated");
        }
    );
});


// DELETE POST

app.delete("/posts/:id",(req,res)=>{

    const id = req.params.id;

    db.query(
        "DELETE FROM posts WHERE id=?",
        [id],
        (err,result)=>{

            if(err){
                return res.status(500).send(err);
            }

            res.send("Post Deleted");
        }
    );
});


// ADD COMMENT

app.post("/comments",(req,res)=>{

    const {
        post_id,
        user_id,
        comment_text
    } = req.body;

    db.query(
        `INSERT INTO comments
        (post_id,user_id,comment_text)
        VALUES(?,?,?)`,
        [
            post_id,
            user_id,
            comment_text
        ],
        (err,result)=>{

            if(err){
                return res.status(500).send(err);
            }

            res.send("Comment Added");
        }
    );
});


// GET COMMENTS

app.get("/comments/:postId",(req,res)=>{

    const postId = req.params.postId;

    db.query(
        `SELECT comments.*, users.name
         FROM comments
         JOIN users
         ON comments.user_id = users.id
         WHERE post_id=?`,
        [postId],
        (err,result)=>{

            if(err){
                return res.status(500).send(err);
            }

            res.json(result);
        }
    );
});



app.listen(5000,()=>{

    console.log(
        "Server Running On Port 5000"
    );

});
