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
    res.render('admin');
  }else{
    res.render('index');
  }

});

router.get('/admin', function(req, res,next){
  if(req.session.user){
    res.render('admin');
  }else{
    res.render('index');
  }
})

router.post('/login', function(req, res){
  var password = req.body.password;
  Admin.authorize(password, function(err, user) {
    if (err) {
        res.redirect("/");
      }
      req.session.user = user._id;
      res.redirect("/admin");
  });
})
