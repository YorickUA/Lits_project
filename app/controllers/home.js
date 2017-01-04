var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Admin = mongoose.model('admin');
  console.log("Attaching home.js");

module.exports = function (app) {
  console.log("exporting home.js");
  app.use('/', router);
  //app.use('/admin', router);
  //app.use('/login', router);
};

router.get('/', function (req, res, next) {
  if(req.session.user){
    res.render('index', {user:true});
  }else{
    res.render('index', {user:false});
  }

});
router.get('/card',function(req,res,next){
  res.redirect('/');
})

router.get('/admin', function(req, res,next){
  console.log("/admin");
  if(req.session.user){
    res.render('admin');
  }else{
    res.redirect('/');
  }
})

router.post('/', function(req, res) {
  switch (req.body.action) {
    case 'login':
      var password = req.body.password;
      console.log(password);
      Admin.authorize(password, function(err, user) {
        if (err) {
        //  res.render('index', {user:false, message:"Wrong password"});
          res.send( false)
          }else{
          req.session.user = user._id;
        // res.render('index',{user:true});
         res.send( true)
        }
      });
  }
})

router.post('/logout', function(req, res){
  var sid = req.session.id;
  req.session.destroy(function(err) {
      if (err) return next(err);
        res.redirect('/');
  })
});
