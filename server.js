const express = require('express');
const app = express();
const path = require('path');
const mongoose=require('mongoose');
const bodyParser= require('body-parser');
const connection= 'mongodb+srv://taigatop:MuzvoMZhYmXLSgTH@cluster0.qat9t7x.mongodb.net/?retryWrites=true&w=majority'
const MongoClient=require('mongodb').MongoClient;

MongoClient.connect(connection,{ useUnifiedTopology: true })
.then(client =>{
    console.log('Connected to Database');
    const db=client.db('listDB');
    const tasksCollection = db.collection('listCollection');
    const listSchema = mongoose.Schema({
        _id: {
            type:String,
            required:true,
            unique:true,
        },
        taskEntry:{
            type:String,
            required:true,
        }
    });

    app.set('view engine','ejs');
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(express.static(path.resolve(__dirname,'public')));


    app.get('/',function(req,res){
        db.collection('listCollection').find().toArray()
        .then(task =>{
            res.render('index.ejs',{taskEntry:task});
        })
        
    })

    app.post('/post-lists',function(req,res){
        tasksCollection.insertOne(req.body)
            .then(result=>{
                res.redirect('/');
            })
    });

    app.put('/post-lists',function(req,res){
        console.log(req.body);
        tasksCollection.findOneAndUpdate(
            {taskEntry: req.body.taskEntryOriginal},
            { 
                $set:{
                    taskEntry: req.body.taskEntryEdit
                }
            })
            .then(task =>res.json('Success'))
    })

    app.delete('/post-lists',function(req,res){
        tasksCollection.deleteOne({
            taskEntry: req.body.taskEntry
        })
    .then(result =>{
        if(result.deletedCount === 0){
            return res.json('No task to delete');
        }
        res.json('Deleted Task')
        });
    });
    app.listen(3000,() =>{
    console.log('Server listening on 3000');
    });
});