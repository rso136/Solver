var bcrypt = require('bcryptjs');
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var Mailgun = require('mailgun-js');
var api_key = 'key-0a8b8fda9099d0e4c174aca2e715cdd1';

//Your domain, from the Mailgun Control Panel
var domain = 'mg.richardsoh.com';

//Your sending email address
var from_who = 'noreply@mg.richardsoh.com'

//this is the users_controller.js file

router.get('/solver', function(req, res) {
	res.render('intro')
})

router.get('/new', function(req,res) {
	res.render('new');
});

router.get('/sign-in', function(req,res) {
	res.render('sign_in');
});

router.get('/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.render('logout')
  })
});

router.get('/requestpass', function(req, res) {
	res.render('requestpass');
})

router.get('/confirmed', function(req, res) {
	res.render('pass_confirmed');
})

router.post('/forget', function(req, res) {

	var randnum = Math.random().toString(36).substring(7);

	models.User.update({

		random: randnum
	},
	{
		where: { email: req.body.email }

	})
	.then(function() {
		console.log('request processed')
	})
    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var data = {
    //Specify email data
      from: from_who,
    //The email to contact
      to: req.body.email,
    //Subject and text data  
      subject: 'Solver Password Reset',
      html: 'Here is your password reset link: localhost:3000/users/reset/' + randnum 
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.json({ error : err});
            console.log("got an error: ", err);
            console.log(body);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page 
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            //res.render('submitted', { email : req.params.mail });
            //console.log(body);
            res.render('processed');
           // res.json(body);
            //console.log(body);
        }
    });
})

router.get('/reset/:random', function(req, res) {
	models.User.findAll({
		where: {random: req.params.random}
	}).then(function(users) {

		if (users == null){
			res.redirect('/users/sign-in')
		}
		else {
			res.render('reset', {
				users: users
			})
		}
	})
});

router.post('/resetpass/:random', function(req, res) {
	models.User.findAll({
		where: {random: req.params.random}
	}).then(function(users) {

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.body.password, salt, function(err, hash) {
				models.User.update({
				
					password_hash: hash
				},
				{
					where: { random: req.params.random }	
				})
				.then(function() {
					res.redirect('/users/confirmed')
				})
			})
		})
	})
});

//if user trys to sign in with the wrong password or email tell them that on the page
router.post('/login', function(req, res) {
  models.User.findOne({
    where: {email: req.body.email}
  }).then(function(user) {

		if (user == null){
		  res.redirect('/users/sign-in')
		}

    bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
        if (result == true){

          req.session.logged_in = true;
          req.session.user_id = user.id;
          req.session.user_email = user.email;

          res.redirect('/problems');
        }else{
		      res.redirect('/users/sign-in')
		    }
    });
  });
});

router.post('/create/:email/:password', function(req,res) {
	models.User.findAll({
    where: {email: req.params.email}
  }).then(function(users) {

		if (users.length > 0){
			console.log(users)
			res.send('we already have an email or username for this account')
		}else{

			bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(req.params.password, salt, function(err, hash) {
						models.User.create({
							email: req.params.email,
							password_hash: hash
						}).then(function(user){

							req.session.logged_in = true;
							req.session.user_id = user.id;
							req.session.user_email = user.email;

							res.send('posted to database');
						});
					});
			});

		};
	});
});

module.exports = router;