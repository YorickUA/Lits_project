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
