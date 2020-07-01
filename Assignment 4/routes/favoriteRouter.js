let express = require('express');
let bodyParser = require('body-parser');
let authenticate = require('../authenticate')
let Favorites = require('../models/favorite');
let cors = require('./cors');


let favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        Favorites.find({})
            .populate('dishes')
            .populate('user')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorites.findOne({user: req.user._id})
            .then((favorite) => {
                if (favorite == null) {
                    Favorites.create()
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            for (let i in req.body) {
                                favorite.dishes.push(req.body[i]);
                            }
                            favorite.save()
                            res.json(favorite);
                        }, (err) => next(err));
                } else {
                    for (let i in req.body) {
                        Favorites.findOne({user: newFavorite.user})
                            .then((oldFavorite) => {
                                if (oldFavorite == null) {
                                    favorite.dishes.push(req.body[i]);
                                }
                            });
                    }
                    favorite.save();
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json')
                    res.json(favorite);
                }
            })
            .catch((err) => next(err));
    })
    .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorites.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

favoriteRouter.route('/:favoriteId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {

        Favorites.findById(req.params.favoriteId)
            .then((favorite) => {
                if (!(favorite.user.equals(req.user._id))) {
                    var err = new Error('Only creator can perform this');
                    err.status = 401;
                    return next(err);
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorites.findById(req.body._id)
            .then((favorite) => {
                if (favorite == null) {
                    let newFavorite = {};
                    newFavorite.user = req.user._id;
                    Favorites.create(newFavorite)
                        .then((favorite) => {
                            console.log('Favorite Created ', newFavorite);
                            favorite.dishes.push(req.params.favoriteId)
                            favorite.save()
                                .then((favorite) => {
                                    Dishes.findById(favorite._id)
                                        .then((favorite) => {
                                            res.statusCode = 200;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.json(favorite);
                                        })
                                }, (err) => next(err));
                        }, (err) => next(err))
                        .catch((err) => next(err));
                } else {
                    err = new Error('Dish ' + req.params.dishId + ' already exist');
                    err.status = 404;
                    return next(err);
                }
            })
    })
    .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorites.findByIdAndUpdate(req.params.favoriteId, {
            $set: req.body
        }, {new: true})
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorites.findOne({user: req.user._id})
            .then((favorite) => {
                favorite.dishes.remove(req.params.favoriteId);
                favorite.save()
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    }, (err) => next(err));
            })
            .catch((err) => next(err));
    });

module.exports = favoriteRouter;
