const {
    Movie,
    ValidateMovie
} = require('../models/movie.model');
const HTTP = require('http-status');
const {
    MovieReview
} = require('../models/movie-review.model')
const _ = require('lodash');
const slugify = require('slugify');
exports.createMovie = async (req, res, next) => {
    try {
        const {
            error
        } = ValidateMovie(req.body)
        if (error) {
            return res.status(HTTP.BAD_REQUEST).send({
                error: error.details[0].message
            })
        }
        const movie = new Movie(req.body).set({
            slug: slugify(req.body.movie_name)
        });
        await movie.save();

        res.status(HTTP.OK).send({
            title: 'Movie',
            message: 'Movie Successfully created'
        })
    } catch (e) {
        res.send({
            error: e.errmsg
        })
    }
}

exports.allMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find().
        populate([{
            path: 'actors'
        }, {
            path: 'caste'
        }]);
        res.status(HTTP.OK).send({
            title: 'Movie List',
            data: movies
        });

    } catch (e) {
        return next(e);
    }
}

exports.movie = async (req, res, next) => {
    try {
        const movie = await Movie.findById({
            _id: req.params.id
        });
        res.status(HTTP.OK).send({
            title: 'Movie List',
            data: movie
        });
    } catch (e) {
        return next(e);
    }
}