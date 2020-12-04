import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMasseges.js";
import Pusher from "pusher";
const app = express();

// db config
const url = "mongodb+srv://admin:lf0AflydadfI3bHl@cluster0.pj0bw.mongodb.net/whatsappDB?retryWrites=true&w=majority";
mongoose.connect(url,{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const db = mongoose.connection;
db.once('open', ()=>{
    console.log("DB is connected!");

    const msgCollection = db.collection("messageContent");
    const changeStream = msgCollection.watch();
})

//pusher config
const pusher = new Pusher({
    appId: "1117667",
    key: "bae7fff4f6e77102979d",
    secret: "ebfab8f3b39611a9ed0c",
    cluster: "eu",
    useTLS: true
  });

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