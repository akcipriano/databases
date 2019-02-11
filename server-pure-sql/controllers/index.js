var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get(function(data) {
        res.status(200).json(data);
      });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      var newMessage = req.body;
      models.messages.post(newMessage, function(data) {
        res.send(data);
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(data) {
        res.end(JSON.stringify(data));
      });
    },

    post: function (req, res) {
      var newUser = req.body;
      models.users.post(newUser, function(data) {
        res.status(200).json(data);
      });
    }
  }
};

