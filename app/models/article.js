// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  first_name: String,
  last_name:String,
  birth_data: [Date],
  century_breaks:[Number],
  ranking_titles:[Number],
  photo:String,
  article:String
});

ArticleSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Article', ArticleSchema);
