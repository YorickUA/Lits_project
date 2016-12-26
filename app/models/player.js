// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name: { type:String,
      required: true
  },
  surname:{ type:String,
      required: true
  },
  date_of_birth:{
    type:Date,
    required: true
  },
  Years_pro:{
    type:Number,
    required: true
  },
  century_breaks:{
    type:Number,
    required: true
  },
  ranking_titles:{
    type:Number,
    required: true
  },
  world_champs:{
    type:Number,
    required: true
  },
  avatar_picture:{
    type:String
  },
  country:{
    type:String,
    required: true
  }
});

PlayerSchema.virtual('fullName').get(function () {
  return this.name + ' ' + this.surname;
});

mongoose.model('Player', PlayerSchema);
