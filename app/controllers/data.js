var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Player = mongoose.model('Player');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var config = require('../../config/config')

module.exports = function(app) {
  app.use('/', router);
};


router.get('/data', function(req, res, next) {

  Player.find({}, function(err, players) {

    res.send(players);
  });
});

router.get('/data/:filter', function(req, res, next) {

  var filter_data = JSON.parse(req.params.filter);
  console.log(filter_data);
  Player.find(filter_data, function(err, players) {
    res.send(players);
  });
});

router.post('/upload', multipartMiddleware ,function(req, res, next) {
  fs.readFile(req.files.image.path, function(err, data) {
    var imageName = req.files.image.name.split(".");
    if (!imageName) {
      console.log("There was an error")
      res.redirect("/");
      res.end();
    } else {

      var i=0;
      var suffics="";
      while(exists(config.root + "\\public\\images\\" + imageName[0]+suffics+"."+imageName[1])){
        i++;
        suffics=i;
      }
      var newPath = config.root + "\\public\\images\\" + imageName[0]+suffics+"."+imageName[1];
      fs.writeFile(newPath, data, function(err) {
        // let's see it
        res.redirect("/");
      })
    }
  })
})

function exists(route){
try{
   fs.statSync(route);
 }catch(err){
   if(err.code == 'ENOENT') return false;
 }
 return true;
}
