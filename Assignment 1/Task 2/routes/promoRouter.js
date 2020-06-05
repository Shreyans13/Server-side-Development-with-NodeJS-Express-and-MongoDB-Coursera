const express = require('express')
const bodyParser = require('body-parser')

const promoRouter = express.Router()

promoRouter.use(bodyParser.json())

promoRouter.route('/(:promoId)?')

.all((req, res, next) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	next()
})

.get((req, res, next) => {
	if(req.params.promoId){
		res.end("Will send the details of the promotion: " + req.params.promoId + " to you!!")
		return
	}
	res.end("Will send all the promotions to you!!")
})
.post((req, res, next) => {
	if(req.params.promoId){
		res.statusCode = 403
		res.end('POST operation not supported on /promotions/' + req.params.promoId)
		return
	}
	res.end('Will add the promotion ' + req.body.name + 
			' with details: ' + req.body.description)
})
.put((req, res, next) => {
	if(req.params.promoId){
		res.write('Updating their promotion: ' + req.params.promoId)
		res.end('\nWill update their promotion: ' + req.body.name + " with details " + req.body.description )
		return
	}
	res.statusCode = 403
	res.end('PUT operation bot supported on promotions')
})
.delete((req, res, next) => {
	if(req.params.promoId){
		res.end("Deleting promotion: " + req.params.promoId)
		return
	}
	res.end("Deletig all the promotions")
});


module.exports = promoRouter