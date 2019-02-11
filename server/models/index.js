
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '');

var User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,

}, {timestamps: false});

var Message = db.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  'user_id': Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,
  'created_at': Sequelize.DATE
}, {timestamps: false});


module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (cb) {
      Message.findAll().then(results=>cb(results));
    },
    // a function which can be used to insert a message into the database
    post: function (message, cb) {
      module.exports.users.post({username: message.username}, function(userInserted) {
        Message.create({'user_id': userInserted.id, text: message.text, roomname: message.roomname})
          .then(messageCreated=>cb(messageCreated));
      });
    }
  },
  /* username: 'Valjean',
  message: 'In mercy\'s name, three days is all I need.',
  roomname: 'Hello'  */

  users: {
    // Ditto as above.
    get: function (cb) {
      User.findAll().then(users=>cb(users));
    },
    post: function (user, cb) {
      User.findAll({where: {username: user.username}})
        .then(results => {
          if (results.length > 0) {
            cb(results[0]);
          } else {
            User.create({username: user.username})
              .then(userInserted=>cb(userInserted));
          }
        });
    }
  }
};



/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */


/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
// User.sync()
//   .then(function() {
//     // Now instantiate an object and save it:
//     return User.create({username: 'Jean Valjean'});
//   })
//   .then(function() {
//     // Retrieve objects from the database:
//     return User.findAll({ where: {username: 'Jean Valjean'} });
//   })
//   .then(function(users) {
//     users.forEach(function(user) {
//       console.log(user.username + ' exists');
//     });
//     db.close();
//   })
//   .catch(function(err) {
//     // Handle any error in the chain
//     console.error(err);
//     db.close();
//   });