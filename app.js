const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const shortId=require("shortid");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/URLshortner', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));


const urlSchema=({
		
		fullUrl:{
			type:String,
			require:true
		},
		shortUrl:{
			type:String,
			require:true,
			default:shortId.generate
		},
		clicks:{
			type:Number,
			require:true,
			default:0
		}
});

const URL=mongoose.model("URL",urlSchema);

app.get("/",function(req,res){
	res.render("index");
})

app.post("/shorturl",function(req,res){

	const url=new URL({
		fullUrl:req.body.fURL
	});
	url.save();

})



app.listen(3000,function(){
	console.log("Running on port 3000");
})
