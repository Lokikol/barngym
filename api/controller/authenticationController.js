const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

var secret = require('../config').secret;

module.exports.register = (req,res)=>{
	
	//get request body username and password data
	var username = req.body.username;
	var password = req.body.password;
	
	//null and empty check
	if(username == null || username == "" || password == null || password == ""){
		res.status(400).json({
			success: false,
			message: 'Please provide valid username and password data'
		});
		return;
	}
	
	//create user
	User.create({
		username: username,
		password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	},(err,newUser)=>{
		if(err){
			res.status(400).json({
				success: false,
				message: 'Please provide valid username and password data'
			});
		}
		else{
			res.status(201).json(newUser);
		}
	});
	
	
};

module.exports.token = (req,res)=>{
	
	//get username and password from req body
	var username = req.body.username;
	var password = req.body.password;
	
	//null and empty check
	if(username == null || username == "" || password == null || password == ""){
		res.status(400).json({
			success: false,
			message: 'Please provide valid username and password data'
		});
		return;
	}
	
	User.findOne({
		username: username //find the user with the unique username
	}).exec((err,foundUser)=>{
		if(err){
			res.status(400).json({
				success: false,
				message: 'Please provide valid username and password data'
			});
		}
		else{
			//check if password is correct
			if(bcrypt.compareSync(password, foundUser.password)){
				//generate token for response
				var token = jwt.sign({username: foundUser.username},secret,{expiresIn: 3600*24*7});
				res.status(200).json({
					success: true,
					token: token
				});
			}else{
				//unauth
				res.status(401).json({
					success: false,
					message: 'Unauthorized'
				});
			}
		}
	});
	
};

module.exports.authenticate = (req,res,next)=>{
	
	var headerExists = req.headers.authorization;
	if(headerExists){
		//Prüfe Auth
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token,secret,(err,decoded)=>{
			if(err){
				//error with token -> unauth 401
				res.status(401).json({
					success: false,
					message: 'Unauthorized'
				});
			}
			else{
				//token valid, save user data and go to next
				req.username = decoded.username;
				next();
			}
		});
	}
	else{
		//kein Authorization header -> keine Authorization (401 unauth)
		res.status(401).json({
					success: false,
					message: 'Unauthorized'
				});
	}
	
};