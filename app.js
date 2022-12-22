const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/wikiDB")


const articleSchema = {
  title : String,
  context: String
}
const Article = new mongoose.model('Article', articleSchema);

app.route("/article")
.get((req,res)=>{
  Article.find({},(error, found)=>{
    if (!error){
      res.send(found)
    }else{
      res.send(error)
    }
  })
})
.post((req,res)=>{
  const newArticle = new Article({
    title: req.body.title,
    context:req.body.context
  })
})
.delete((req,res)=>{
  Article.deleteMany((err)=>{
    if(!err){
      console.log("Deleted");
    }else{
      console.log("There is problem");
    }
  })
});

app.route("/article/:titles")
.get((req,res)=>{
    Article.findOne({title:req.params.titles},(err, found)=>{
      if(found){
        res.send(found.title);
      }else{
        res.send(err);
      }
    });
})
.patch((req,res)=>{
  Article.update({title: req.params.titles}, {$set: {context :"", title : ""}}
);
})
.delete((req,res)=>{
  Artile.deleteOne({title : req.params.titles})
});



app.set('view-engine','ejs');
app.set(bodyParser.urlencoded({
  extended:true
}));
app.set(express.static('public'))
const port = 3000;
app.listen(port,()=>{
  console.log("Server Started");
})
