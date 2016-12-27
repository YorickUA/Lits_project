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
    res.redirect('/admin');
  }else{
    res.render('index');
  }

});

router.get('/admin', function(req, res,next){
  if(req.session.user){
    res.render('admin');
  }else{
    res.redirect('/');
  }
})
// router.get('/login', function(req, res){
//   res.render('login');
// })


router.post('/', function(req, res) {
  switch (req.body.action) {
    case 'login':
      var password = req.body.password;
      console.log(password);
      Admin.authorize(password, function(err, user) {
        if (err) {
          res.render('index', {message:"Wrong password"});
          }else{
          req.session.user = user._id;
          res.redirect("/admin");
        }
      });
    default:
      return;
  }
})
