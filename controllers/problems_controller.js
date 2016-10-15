var models  = require('../models');
var express = require('express');
var router  = express.Router();
//var handleNewProblem = require('./pathtofunction')

router.get('/', function(req, res) {

	models.User.findAll({
		where: {
			id: req.session.user_id
		}
	}).then(function(users) {
		res.render('home', {
			user_id: req.session.user_id,
			email: req.session.user_email,
			logged_in: req.session.logged_in,
			users: users
		})
	})
});

router.get('/ratings/:id', function(req, res) {

	models.sequelize.Promise.all([
		models.User.findAll({
			where: {
				id: req.session.user_id
			}
		}),
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
	.spread(function(users, problems, options) {
		console.log('users', users);
		console.log('problems', problems);
		console.log('options', options);
		res.render('score', {
			user_id: req.session.user_id,
			email: req.session.user_email,
			logged_in: req.session.logged_in,			
			users: users,
			problems: problems,
			options: options			
		})	
	})
});

router.post('/logscore/:score', function(req, res) {
	
	models.User.update({

		score: req.params.score
	},
	{
		where: { id: req.session.user_id }
	})
	.then(function() {
		res.send('scored posted');
	})
});

router.post('/logtotal/:total', function(req, res) {
	models.User.update({
			
		total: req.params.total
	},
	{
		where: { id: req.session.user_id }
	})
	.then(function() {
		res.send('total posted');
	})
});

router.post('/evaluate/:grade', function(req, res) {

	models.User.update({

		grade: req.params.grade
	},
	{
		where: { id: req.session.user_id }	
	})
	.then(function() {
		res.send('grade posted');
	})
});


router.post('/create/', function(req, res) {
	models.Problem.create({
		user_id: req.session.user_id,
		problem: req.body.issue
	}).then(function(){
		res.redirect('/options/option_input')
	});
});

module.exports = router;
