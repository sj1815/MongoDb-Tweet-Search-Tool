var express = require('express');
var router = express.Router();

// After Mongo connection, this will return all the users in our database
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
