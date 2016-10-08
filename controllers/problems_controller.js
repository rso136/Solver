var models  = require('../models');
var express = require('express');
var router  = express.Router();
//var handleNewProblem = require('./pathtofunction')

router.get('/', function(req, res) {
	models.Problem.findAll({
		include: [ models.Option ]
	}).then(function(problems) {
		res.render('home', {
			problems: problems
		})
	})
})

router.get('/ratings/:id', function(req, res) {

	models.sequelize.Promise.all([
		models.Problem.findAll({
			where: {
				id: req.params.id
			}
		}),
		models.Option.findAll({
			include: [ models.Benefit, models.Detriment ],
			where: {
				problem_id: req.params.id
			}
		})
	])
	.spread(function(problems, options) {
		console.log('problems', problems);
		console.log('options', options);
		res.render('score', {
			problems: problems,
			options: options
		})	
	})
})

router.post('/create/', function(req, res) {
	models.Problem.create({
		problem: req.body.issue
	}).then(function(){
		res.redirect('/options/option_input')
	});
});

module.exports = router;
