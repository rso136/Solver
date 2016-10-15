var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/benefit_input/:id', function(req, res) {

	models.sequelize.Promise.all([

		models.User.findAll({
			where: {
				id: req.session.user_id
			}
		}),
		models.Option.findAll({
			where: {
				problem_id: req.params.id
			}
		}),
		models.Problem.findAll({
			where: {
				id: req.params.id
			}
		})
	])
	.spread(function(users, options, problems) {
		console.log('options', options);
		console.log('problems', problems)
		res.render('benefits', {
			user_id: req.session.user_id,
			email: req.session.user_email,
			logged_in: req.session.logged_in,			
			users: users,
			options: options,
			problems: problems
		})
	})

})

router.post('/create/:benefit/:weight/:option_id', function(req, res) {
	models.Benefit.create({
		benefit: req.params.benefit,
		weight: req.params.weight,
		option_id: req.params.option_id
	}).then(function(){
		res.send('benefit created');
	})
})


module.exports = router;