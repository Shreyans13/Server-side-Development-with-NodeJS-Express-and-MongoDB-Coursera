const express = require('express')
const bodyParser = require('body-parser')

const dishRouter = express.Router()

dishRouter.use(bodyParser.json())


.all((req, res, next) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	next()
})

dishRouter.route('/')

.get((req, res, next) => {
	if(req.params.dishId){
		res.end("Will send the details of the dish: " + req.params.dishId + " to you!!")
		return
	}
	res.end("Will send all the dishes to you!!")
})
.post((req, res, next) => {
	if(req.params.dishId){
		res.statusCode = 403
		res.end('POST operation not supported on /dishes/' + req.params.dishId)
		return
	}
	res.end('Will add the dish ' + req.body.name + 
			' with details: ' + req.body.description)
})
.put((req, res, next) => {
	if(req.params.dishId){
		res.write('Updating their dish: ' + req.params.dishId)
		res.end('\nWill update their dish: ' + req.body.name + " with details " + req.body.description )
		return
	}
	res.statusCode = 403
	res.end('PUT operation bot supported on dishes')
})
.delete((req, res, next) => {
	if(req.params.dishId){
		res.end("Deletig dish: " + req.params.dishId)
		return
	}
	res.end("Deletig all the dishes")
});

module.exports = dishRouter
