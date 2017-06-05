var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'concept12',
  database : 'instagram'
});

conn.connect();

/*conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});*/

//conn.end();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Open Year Round' });
  var sql="select * from user";
  conn.query(sql,function(error,results,fields){
    if(error){
    console.log(error);
    }
    else{
      console.log('results',results);
      console.log('fields',fields);
    }

  })
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'going home' });
});
router.get('/login', function(req, res, next) {
  res.render('home', {  });
});
router.post('/login',function(req,res,next){

  var userId='abcd';
  var userPwd='abcd';
  if(req.body.id==userId && req.body.pw==userPwd)
  {
    req.session.uId = userId;
    req.session.uPwd = userPwd;
    res.send({result:'success'});
  }
  else {
res.send({result:'failed'});
  }
});
router.get('/Insta', function(req, res, next) {
  res.render('Insta', {  });
});

router.get('/3', function(req, res, next) {
  if(req.session.uId)
  {
res.render('3',{ });
}
else {
  res.redirect('/login',{});

}
});
router.get('/for1', function(req, res, next) {
  res.render('for1', {  });
});





module.exports = router;
