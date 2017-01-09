var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Player = mongoose.model('Player');
  Admin=mongoose.model('admin');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var config = require('../../config/config')

module.exports = function(app) {
  app.use('/card', router);
};


router.post('/logout', function(req, res){
  var sid = req.session.id;
  var id=req.body.id;
  req.session.destroy(function(err) {
      if (err) return next(err);
        res.redirect(id);
  })
});

router.get('/data/:id', function(req, res) {
  var id = req.params.id;
  Player.find({_id:id}, function(err, players) {
    res.send(players);
  });
});

router.get('/:id', function(req, res, next) {
  var id=req.params.id;
  Player.find({_id:id}, function(err, player) {
  if (!player) {
     res.redirect('/');
     res.end();
   }else{
    player=player[0];
    if (req.session.user){
      res.render("edit_card", player);
    }
    else{
      res.render("view_card", player);
    }
  }
  });
})


router.post('/login', function(req, res, next) {
      var password = req.body.password;
      var id=req.body.id;
      Admin.authorize(password, function(err, user) {
        if (err) {
          res.redirect(id);
          }else{
          req.session.user = user._id;
          res.redirect(id);
        }
      });
  })

router.post('/update/:id', function(req, res, next){
if(req.session.user)  {
    var data=req.body;
    Player.update({_id:req.params.id}, data, function(err){
      if(err){
        res.send(false);
      }else{
        res.send(true);
      }
    })
    console.log(data);
  }
})

router.post('/setDefault/:id', function (req, res){
  if(req.session.user){
    var id=req.params.id;
    var player=Player.findOne({_id:id}, function(err, result){
      if (result.avatar_picture!="default.jpg"){
        fs.unlink(config.root + "\\public\\images\\"+result.avatar_picture, function(){});
        result.avatar_picture="default.jpg";
        result.save(function(){res.send(id)})
      }else{
        res.send(id);
      }
    })
  }else{
    res.status(403);
    res.end();
 }
})

router.post('/:id', multipartMiddleware ,function(req, res, next) {
  if(req.session.user){
    Player.find({_id:req.params.id},function(err, result){

        var name=("ph_"+result[0].name+"_"+result[0].surname).toLowerCase();
        var current_image=result[0].avatar_picture;
        //console.log(name);
        fs.readFile(req.files.image.path, function(err, data) {
          var imageName=name;
          if (!req.files.image.name) {
              console.log("There was an error")
              res.redirect("/");
              res.end();
            } else {
              if(current_image=="default.jpg"){
                var i=0;
                var suffics="";
                while(exists(config.root + "\\public\\images\\" + imageName+suffics+".jpg")){
                  i++;
                  suffics=i;
                }
                var newPath = config.root + "\\public\\images\\" + imageName+suffics+".jpg";
                var new_name=imageName+suffics+".jpg";
              }else{
                var newPath = config.root + "\\public\\images\\" + current_image;
                var new_name=current_image
              }

            fs.writeFile(newPath, data, function(err) {
                 Player.update({_id:req.params.id},{avatar_picture:new_name}, function(){
                   res.redirect("/card/"+req.params.id);
                 })
        })
       }
      })
    })

  }else{
    res.status(403);
    res.end();
  }
})




router.delete('/:id',function(req, res){
  if(req.session.user){
    var id=req.params.id;
    var player=Player.findOne({_id:id}, function(err, result){
    if(result.avatar_picture!="default.jpg"){
      fs.unlink(config.root + "\\public\\images\\"+result.avatar_picture, function(){});
    }
    result.remove(function(){
      res.send(true);
    });
    })
  }else{
res.status(403);
res.end();
}
})


function exists(route){
try{
   fs.statSync(route);
 }catch(err){
   if(err.code == 'ENOENT') return false;
 }
 return true;
}
