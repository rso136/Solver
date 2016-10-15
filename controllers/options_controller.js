var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/option_input', function(req, res) {
	
	models.sequelize.Promise.all([

		models.User.findAll({
			where: {
				id: req.session.user_id
			}
		}),
		models.Problem.findAll({
			where: {
				user_id: req.session.user_id
			}
		})
	])
	.spread(function(users, problems) {
		res.render('options', {
			user_id: req.session.user_id,
			email: req.session.user_email,
			logged_in: req.session.logged_in,
			users: users,
			problems: problems
		})
	})

	//models.Problem.findAll({
	//	include: [ models.Option ]
	//}).then(function(problems) {
	//	res.render('options', {
	//		user_id: req.session.user_id,
	//		email: req.session.user_email,
	//		logged_in: req.session.logged_in,
	//		problems: problems
	//	})
	//})
});

router.post('/create/:option/:problem_id', function(req, res) {
	models.Option.create({
		option: req.params.option,
		problem_id: req.params.problem_id
	}).then(function(){
		res.send('option created');
	});
});

module.exports = router;