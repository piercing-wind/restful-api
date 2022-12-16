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

app.get("/article",(req,res)=>{
  Article.find({},(error, found)=>{
    if (!error){
      res.send(found)
    }else{
      res.send(error)
    }
  })
})
app.post('/article',(req,res)=>{
  console.log(req.body.title);
  console.log(req.body.context);
})





app.set('view-engine','ejs');
app.set(bodyParser.urlencoded({
  extended:true
}));
app.set(express.static('public'))
const port = 3000;
app.listen(port,()=>{
  console.log("Server Started");
})
