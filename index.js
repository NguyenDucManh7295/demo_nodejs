var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
var pg = require('pg')


	
var config = {
  user: 'postgres', // name of the user account
  database: 'chungmunggiangsinh', // name of the database
  password: 'Anhmanh7295.',
  host: 'localhost',
  port:5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload2/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('uploadfile');

var pool = new pg.Pool(config)
app.get("/",function(req,res){
	pool.connect(function(err, client, done) {
	  if (err) {
	  	return console.error('error chưa thể kết nói',err);
	  }
	  client.query('select * from video',function(err,result){
	  	done();
	  	if (err) {
	  		res.end();
	  		return console.error('error running query',err);
	  	}
	  	res.render("home",{data:result});
	  });
	});
});
	
app.get("/list",function(req,res){
	pool.connect(function(err, client, done) {
	  if (err) {
	  	return console.error('error chưa thể kết nói',err);
	  }
	  client.query('select * from video',function(err,result){
	  	done();
	  	if (err) {
	  		res.end();
	  		return console.error('error running query',err);
	  	}
	  	res.render("list",{data:result});
	  });
	});
});
	
app.get("/delete/:id",function(req,res){
	pool.connect(function(err, client, done) {
	  if (err) {
	  	return console.error('error chưa thể kết nói',err);
	  }
	  client.query('delete from video where id='+req.params.id,function(err,result){
	  	done();
	  	if (err) {
	  		res.end();
	  		return console.error('error running query',err);
	  	}
	  	res.redirect('/list');
	  });
	});
});

app.get("/add",function(req,res){
	res.render('add');
});
app.post("/add",urlencodedParser,function(req,res){
	upload(req, res, function (err) {
    if (err) {
      res.send('lỗi');
    }else{
    	if(req.file== undefined){
    		res.send("file chưa đc chọn")
    	}else{

		    pool.connect(function(err, client, done) {
			  if (err) {
			  	return console.error('error chưa thể kết nói',err);
			  }
			  var sql ="insert into video (id,tieude,mota,key,image) values('"+req.body.id+"','"+req.body.tieude+"','"+req.body.mota+"','"+req.body.key+"','"+req.file.originalname+"')";
			  client.query(sql,function(err,result){
			  	done();
			  	if (err) {
			  		res.end();
			  		return console.error('error running query',err);
			  	}
			  	res.redirect('/list');
			 });
	});
    	}
    	
    }
  });
});
app.listen(3000);