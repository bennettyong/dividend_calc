var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
		id : 1,
		name : "tom"
	}, {
		id : 2,
		name : "john"
	}])
});

module.exports = router;
