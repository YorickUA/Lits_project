var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Player = mongoose.model('Player');
  Admin=mongoose.model('admin');
var multipart = require('connect-multiparty');

var fs = require('fs');
var config = require('../../config/config')

module.exports = function(app) {
  app.use('/', router);
};

router.get('/new',function(req,res){
  if(!req.session.user){
    res.redirect('/');
  }else{
    res.render('new_player', {user:false});
  }
})

router.post('/new', function (req, res){
  if(req.session.user){
    var new_player=new Player({
      name:req.body.name,
      surname:req.body.surname,
      date_of_birth: req.body.date_of_birth,
      country:req.body.country,
      Years_pro:req.body.years_pro,
      century_breaks:req.body.century_breaks,
      ranking_titles:req.body.ranking_titles,
      world_champs:req.body.world_champs,
      avatar_picture:"/images/default.jpg",
      bio: req.body.bio
    })
    new_player.save(function(err, player){
      res.redirect("/card/"+player.id);
    })
  }
})
