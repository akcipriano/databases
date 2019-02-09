var db = require('../db');
var connection = db.dbConnection;
connection.connect();

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (cb) {
      var messageQuery = 'select text, roomname, name as username from messages JOIN users ON messages.user_id = users.id';
      var queryArgs = [];

      connection.query(messageQuery, queryArgs, function(err, results) {
        if (err) {
          throw err;
        }
        cb(results);
      });
    },
    // a function which can be used to insert a message into the database
    post: function (message, cb) {
      module.exports.users.post({username: message.username}, function(userId) {
        var queryArgs = [];
        var queryString = 'insert into messages (text, user_id, roomname) values ("' +
        message.message + '",' + userId + ',"' + message.roomname + '")';

        connection.query(queryString, queryArgs, function(err) {
          if (err) { throw err; }
          cb('Message inserted');
        });
      });
    }
  },
  /* username: 'Valjean',
  message: 'In mercy\'s name, three days is all I need.',
  roomname: 'Hello'  */

  users: {
    // Ditto as above.
    get: function (cb) {
      var userQuery = 'select name from users';
      var queryArgs = [];

      connection.query(userQuery, queryArgs, function(err, results) {
        if (err) {
          console.log( 'ERROR on username query', userQuery);
          throw err;
        }
        cb(results);
      });
    },

    post: function (user, cb) {
      var userQuery = 'select id from users where name ="' + user.username + '"';
      var queryArgs = [];

      connection.query(userQuery, queryArgs, function(err, results) {
        if (err) {
          console.log( 'ERROR on looking up for user', userQuery);
          throw err;
        }
        if (results.length > 0) {
          cb(results[0].id);
        } else {
          var queryString = 'insert into users (name) values ("' + user.username + '")';
          connection.query(queryString, queryArgs, function(err, results) {
            if (err) { throw err; }
            console.log('User inserted with result', results);
            cb(results.insertId);
          });
        }
      });
    }
  }
};