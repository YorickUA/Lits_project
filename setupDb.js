var mongoose = require('mongoose');
var config = require('./config/config');
var  glob = require('glob');
mongoose.connect(config.db);
var async = require('async');

async.series([
  open,
  dropDatabase,
  requireModels,
  createUsers
], function(err) {
  console.log(arguments);
  mongoose.disconnect();
  process.exit(err ? 255 : 0);
});

function open(callback) {
  mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
}

function requireModels(callback) {
  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);

  });
  async.each(Object.keys(mongoose.models), function(modelName, callback) {
    mongoose.models[modelName].ensureIndexes(callback);
  }, callback);
}

function createUsers(callback) {

  var users = [
    {name: 'John',
    surname: 'Higgins',
    date_of_birth: new Date('1975-05-18'),
    Years_pro:24,
    century_breaks:649,
    ranking_titles:24,
    world_champs:4,
    avatar_picture:'john_higgins.jpg',
    country:'Great Britain'},

    {name: 'Ronnie',
    surname: 'O\'sullivan',
    date_of_birth: new Date('1975-12-05'),
    Years_pro:24,
    century_breaks:856,
    ranking_titles:28,
    world_champs:5,
    avatar_picture:'ronnie_O\'sullivan.jpg',
    country:'Great Britain'},


    {name: 'Jinhui',
    surname: 'Ding',
    date_of_birth: new Date('1987-04-01'),
    Years_pro:13,
    century_breaks:434,
    ranking_titles:12,
    world_champs:0,
    avatar_picture:'jinhui_ding.jpg',
    country:'China'},

    {name: 'Mark',
    surname: 'Selby',
    date_of_birth: new Date('1983-06-19'),
    Years_pro:17,
    century_breaks:450,
    ranking_titles:10,
    world_champs:2,
    avatar_picture:'mark_selby.jpg',
    country:'Great Britain'}
  ];

  async.each(users, function(userData, callback) {
    var user = new mongoose.models.Player(userData);
    user.save(callback);
  }, callback);
}
