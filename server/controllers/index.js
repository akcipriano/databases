var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log("------------------------get messages request is:");
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log("------------------------post messages request is:");
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log("------------------------get user request is:");
    },
    post: function (req, res) {
      console.log("------------------------ post user request is:");
    }
  }
};

