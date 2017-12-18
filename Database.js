var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password:'',
	database : 'chucmungnammoi'
});
var connect = function(){
	connection.connect(function (err){
		if(!err){
			console.log('Sucessfull');

		}else{
			console.log('error');
		}
	});
};
exports.insertvideo = function(id,tieude,mota,keyvideo,image){
	connect();
	connection.query("SELECT `chungmung` (`id`, `tieude`, `mota`, `keyvideo`, `image`) VALUES (NULL, '"+tieude+"', '"+mota+"', '"+keyvideo+"', '"+image+"' );",function(err,resultsQuery,fields){
		if(!err){
			callbackInsert(resultsQuery);

		}else{
			console.log("errorr" + err)
		}	
	});
};