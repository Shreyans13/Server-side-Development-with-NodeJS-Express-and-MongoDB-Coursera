const express = require('express')
const bodyParser = require('body-parser')

const leaderRouter = express.Router()

leaderRouter.use(bodyParser.json())

leaderRouter.route('/(:leaderId)?')

.all((req, res, next) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	next()
})

.get((req, res, next) => {
	if(req.params.leaderId){
		res.end("Will send the details of the leader: " + req.params.leaderId + " to you!!")
		return
	}
	res.end("Will send all the leaders to you!!")
})
.post((req, res, next) => {
	if(req.params.leaderId){
		res.statusCode = 403
		res.end('POST operation not supported on /leaders/' + req.params.leaderId)
		return
	}
	res.end('Will add the leader ' + req.body.name + 
			' with details: ' + req.body.description)
})
.put((req, res, next) => {
	if(req.params.leaderId){
		res.write('Updating their leader: ' + req.params.leaderId)
		res.end('\nWill update their leader: ' + req.body.name + " with details " + req.body.description )
		return
	}
	res.statusCode = 403
	res.end('PUT operation bot supported on leaders')
})
.delete((req, res, next) => {
	if(req.params.leaderId){
		res.end("Deletig leader: " + req.params.leaderId)
		return
	}
	res.end("Deletig all the leaders")
});


module.exports = leaderRouter
