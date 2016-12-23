var express = require('express'),
  router = express.Router()

  console.log("Attaching logout.js");

module.exports = function (app){
  console.log("exporting logout.js");
//  app.use('/logout', router);
  app.post('/logout', function(req, res){
    var sid = req.session.id;

    req.session.destroy(function(err) {
        if (err) return next(err);
          res.redirect("/");
    });
  });
};
