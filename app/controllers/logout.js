var express = require('express'),
  router = express.Router()



module.exports = function (app){
  app.use('/', router);
};

router.post('/logout', function(req, res){
  var sid = req.session.id;
  req.session.destroy(function(err) {
      if (err) return next(err);
        res.redirect("/");
  });
})
