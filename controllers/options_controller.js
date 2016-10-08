var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/option_input', function(req, res) {
	models.Problem.findAll({
		include: [ models.Option ]
	}).then(function(problems) {
		res.render('options', {
			problems: problems
		})
	})
})

router.post('/create/:option/:problem_id', function(req, res) {
	models.Option.create({
		option: req.params.option,
		problem_id: req.params.problem_id
	}).then(function(){
		res.send('option created');
	});
});

module.exports = router;