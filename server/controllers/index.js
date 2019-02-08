var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      console.log('------------------------get messages request is:');
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      console.log('------------------------post messages request is:', req.body);
      var newMessage = req.body;
      models.messages.post(newMessage, function(data) {
        console.log(data);
        res.send(data);
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('------------------------get user request is:');
    },

    post: function (req, res) {
      console.log('------------------------ post user request is:', req.body);
      var newUser = req.body;
      models.users.post(newUser, function(data) {
        console.log(data);
        res.send(data);
      });
    }
  }
};

