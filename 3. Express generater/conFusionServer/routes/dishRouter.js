const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const Dishes = require('../models/dishes')

const dishRouter = express.Router()

dishRouter.use(bodyParser.json())

dishRouter.route('/(:dishId)?')

.get((req, res, next) => {
	if(req.params.dishId){
		Dishes.findById(req.params.dishId)
		.then((dish) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(dish);
		}, (err) => next(err))
		.catch((err) => next(err))
		return;
	}
	Dishes.find({})
	.then((dishes) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(dishes);
	}, (err) => next(err))
	.catch((err) => next(err))
})
.post((req, res, next) => {
	if(req.params.dishId){
		res.statusCode = 403
		res.end('POST operation not supported on /dishes/' + req.params.dishId)
		return
	}
	Dishes.create(req.body)
	.then((dish) => {
		console.log('Dish Crated', dish);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(dish);
	}, (err) => next(err))
	.catch((err) => next(err))
})
.put((req, res, next) => {
	if(req.params.dishId){
		Dishes.findByIdAndUpdate(req.params.dishId, {
				$set: req.body
			}, { new: true })
			.then((dish) => {
				console.log('Dish Crated', dish);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(dish);
			}, (err) => next(err))
			.catch((err) => next(err))
		return
	}
	res.statusCode = 403
	res.end('PUT operation bot supported on dishes')
})
.delete((req, res, next) => {
	if(req.params.dishId){
		Dishes.findByIdAndRemove(req.params.dishId)
		.then((resp) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(resp);
		}, (err) => next(err))
		.catch((err) => next(err));
		return
	}
	Dishes.remove({})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});


module.exports = dishRouter
