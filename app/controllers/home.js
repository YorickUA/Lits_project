var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Admin = mongoose.model('admin');


module.exports = function (app) {
  app.use('/', router);
  app.use('/admin', router);
  app.use('/login', router);
};

router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Generator-Express MVC',
    });

});

router.get('/admin', function(req, res,next){
  res.send("I'm admin");
})

router.post('/login', function(req, res){
  var password = req.body.password;
  Admin.authorize(password, function(err, user) {
    if (err) {
        res.redirect("/");
      }
      res.redirect("/admin");
  });
})
