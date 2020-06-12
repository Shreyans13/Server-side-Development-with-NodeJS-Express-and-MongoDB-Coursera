const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authenticate = require('../authenticate')
const Leaders = require('../models/leaders')

const leaderRouter = express.Router()

leaderRouter.use(bodyParser.json())

leaderRouter.route('/(:leaderId)?')

.get((req, res, next) => {
	if(req.params.leaderId){
		Leaders.findById(req.params.leaderId)
		.then((leader) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(leader)
		}, (err) => next(err))
		.catch((err) => next(err))
		return
	}
	Leaders.find({})
	.then((leaders) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(leaders);
	}, (err) => next(err))
	.catch((err) => next(err))
})
.post(authenticate.verifyUser, (req, res, next) => {
	if(req.params.leaderId){
		res.statusCode = 403
		res.end('POST operation not supported on /leaders/' + req.params.leaderId)
		return
	}
	Leaders.create(req.body)
	.then((leader) => {
		console.log('Leader Created', leader);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(leader);
	}, (err) => next(err))
	.catch((err) => next(err))
})
.put(authenticate.verifyUser, (req, res, next) => {
	if(req.params.leaderId){
		Leaders.findByIdAndUpdate(req.params.leaderId, {
			$set: req.body
		}, { new: true })
		.then((leader) => {
			console.log('leader Updated', leader);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(leader);
		}, (err) => next(err))
		.catch((err) => next(err))
		return
	}
	res.statusCode = 403
	res.end('PUT operation bot supported on leaders')
})
.delete(authenticate.verifyUser, (req, res, next) => {
	if(req.params.leaderId){
		Leaders.findByIdAndRemove(req.params.leaderId)
		.then((resp) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(resp);
		}, (err) => next(err))
		.catch((err) => next(err))
		return
	}
	Leaders.remove({})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err))
});


module.exports = leaderRouter