module.exports = function(app){
  var express = require('express');
  var router = express.Router();

  var mysql = require('mysql');
  var dbconfig = require('../database.js');   //추가한 데이터베이스 불러오는것
  var conn = mysql.createConnection(dbconfig);

  router.get('/',function(req,res,next){
    if(req.session.authId)
       res.render('homework_login_success',{
         user:req.session.authId
       });
       else
       res.render('homework');
  });

  router.get('/h_join',function(req,res,next){
    res.render('homework_join');
  });

  router.get('/h_logout',function(req,res,next){
    delete req.session.authId;
    req.session.save(function(){
      res.render('homework');
    });
  });

  router.post('/h_join', function(req, res, next) {
    user_name = req.body.id;
    password = req.body.password;

    var sql = "INSERT INTO `user` (`name`, `password`) VALUES (?, ?);";

    conn.query(sql, [user_name, password], function(error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log('results', results);
        console.log('fileds', fields);
        req.session.authId = user_name;
        req.session.save(function() {
          console.log('가입 성공');
        });
      }
    });
    res.end('{"success" : "Updated Successfully", "status" : 200}');
  });

  router.post('/', function(req, res, next) {
 user_name = req.body.id;
 user_password = req.body.password;

 var sql = "SELECT * FROM user WHERE name=?";

 conn.query(sql, [user_name], function(error, results, fields) {
   if (error) {
     console.log(error);
   } else {
     var user = results[0];
     if (user_password == user.password) {
       console.log('same password!')
       req.session.authId = user_name;
       req.session.save(function() {
         console.log('성공');
     res.render('3');
       });
     } else {
       console.log('실패');
     }
   }
 });
 res.end('{"success" : "Updated Successfully", "status" : 200}');
});
return router;
}
