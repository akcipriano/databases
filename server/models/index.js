var db = require('../db');
var connection = db.dbConnection;
connection.connect();

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function () {},

    // a function which can be used to insert a message into the database
    post: function (message, cb) {
      var userQuery = 'select id from users where name ="' + message.username + '"';
      var queryArgs = [];

      connection.query(userQuery, queryArgs, function(err, results) {
        if (err) {
          console.log( 'ERROR on first query', userQuery);
          throw err;
        }
        var userId = results[0].id;
        var queryString = 'insert into messages (text, user_id, roomname) values ("' +
        message.message + '",' + userId + ',"' + message.roomname + '")';

        console.log('-------QUERYSTRING:', queryString);
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
    get: function () {},
    post: function (user, cb) {
      var queryString = 'insert into users (name) values ("' + user.username + '")';
      var queryArgs = [];

      connection.query(queryString, queryArgs, function(err) {
        if (err) { throw err; }
        cb('User inserted');
      });
    }
  }
};

