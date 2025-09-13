const express = require ("express");

const app = express();


let posts = [
    { postId: 1, title: "string", content: "string content" }
]

let comments = [
    { id: "string", postId: "string", author: "string", text: "string", createdAt: Date }
]


app.post("/post",(req,res)=>{
    const {title, content} = req.body;

    if(!input){
        return res.status(400).json({error:"Entery is required"})
    }

    const newItem = {
        id: posts.lenght +1,
        title: title,
        content: content,
    };

    posts.push(newItem);
    res.status(200).json(newItem);
})

app.get("/post",(req,res)=>{
    res.end(posts);
})

app.post("/post/:id/comment",(req,res)=>{
    const input = req.body;

    if(!input){
        return res.status(400).json({error:"Entery is required"})
    }

    const newItem = {
        id: comments.length+1,
        postId: postId,
        author: input.author,
        text: input.text,
    };

    comments.push(newItem);
    res.status(200).json(newItem);
})

app.get("/post/:id",(req,res)=>{
    const itemId = parseInt(req.params.id);

    const item = posts.find((i)=>i.id=== itemId);

    if(!item){
        res.status(400).json({error:"Item id is incorrect"})
    }

    res.json(item);

})

app.get("/post/:id/comments",(req,res)=>{
    const itemId = parseInt(req.params.id);

    const item = posts.find((i)=>i.id=== itemId);

    if(!item){
        res.status(400).json({error:"Item id is incorrect"})
    }

    res.json(comments);

})

app.put("/post/:id",(req,res)=>{
    const itemId = parseInt(req.params.id);
    const {title}= req.body;

    const itemIndex = post.findIndex((i)=>i.id===itemId)

    if(itemIndex===-1){
        res.status(404).json({error:"Item not found"});
    }

    posts[itemIndex] = {id:itemId,title};

    res.json(posts[itemIndex]);
})

app.delete("/post/:id",(req,res)=>{
    const itemId = parseInt(params.req.id);

    const itemIndex = posts.findIndex((i)=> i.id===itemId);

    if(itemIndex===-1){
        res.status(404).json({error:"not found"})
    }

    posts.splice(itemIndex,1);
    res.status(204).end();
})

app.delete("/comments/:id",(req,res)=>{
    const itemId = parseInt(params.req.id);

    const itemIndex = comments.findIndex((i)=> i.id===itemId);

    if(itemIndex===-1){
        res.status(404).json({error:"not found"})
    }

    comments.splice(itemIndex,1);
    res.status(204).end();
})

app.listen(4000, ()=>{
    console.log("Server is running on http://localhost:4000")
})