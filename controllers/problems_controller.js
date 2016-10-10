var models  = require('../models');
var express = require('express');
var router  = express.Router();
//var handleNewProblem = require('./pathtofunction')

router.get('/', function(req, res) {

	res.render('home', {
		user_id: req.session.user_id,
		email: req.session.user_email,
		logged_in: req.session.logged_in
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
		user_id: req.session.user_id,
		problem: req.body.issue
	}).then(function(){
		res.redirect('/options/option_input')
	});
});

module.exports = router;
