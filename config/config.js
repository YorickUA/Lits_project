var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'lits-project'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/lits-project-development',
    session: {
      "secret": "KillerIsJim",
      "key": "sid",
      "cookie": {
        "path": "/",
        "httpOnly": true,
        "maxAge": null
      }
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'lits-project'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI,
    session: {
      "secret": "KillerIsJim",
      "key": "sid",
      "cookie": {
        "path": "/",
        "httpOnly": true,
        "maxAge": null
      }
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'lits-project'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI,
    session: {
      "secret": "KillerIsJim",
      "key": "sid",
      "cookie": {
        "path": "/",
        "httpOnly": true,
        "maxAge": null
      }
    }
  }
};

module.exports = config[env];
