import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMasseges.js"
const app = express();

// db config
const url = "mongodb+srv://admin:lf0AflydadfI3bHl@cluster0.pj0bw.mongodb.net/whatsappDB?retryWrites=true&w=majority";
mongoose.connect(url,{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

//middleware
app.use(express.json());
app.get("/", (req, res)=>{res.status(200).send("hello")});

app.post("/messages/new", (req,res)=>{
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(201).send(data);
        }
    })
});

app.get("/messages/sync",(req,res)=>{
    Messages.find((err,data)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);
        }
    })
})



//server config
const PORT = process.env.PORT || 9000;
app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)});