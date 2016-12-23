//admin model
var crypto = require('crypto');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  var async = require('async');

var adminSchema = new Schema({
  hashedPassword: String,
  salt: {
    type: String,
  },
});


adminSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

adminSchema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });

  adminSchema.methods.checkPassword = function(password) {

    return this.encryptPassword(password) === this.hashedPassword;
  };

  adminSchema.statics.saveAdmin= function (password, callback) {

    var Admin=this;
    var user = new Admin({ password: password});
    user.save(function(err) {
        if (err) return callback(err);
        callback(null, user);
      }
    );
    }

    adminSchema.statics.authorize = function(password, callback) {
      var Admin = this;

      async.waterfall([
        function(callback) {
          Admin.findOne({}, callback);

        },
        function(admin, callback) {
          if (admin.checkPassword(password)) {
              callback(null, admin);
            } else {}
          }
      ], callback);
    };


mongoose.model('admin', adminSchema);
