// Create web server

// Import express
const express = require('express');

// Import body-parser
const bodyParser = require('body-parser');

// Import mongoose
const mongoose = require('mongoose');

// Import Comments model
const Comments = require('../models/comments');

// Create router
const commentRouter = express.Router();

// Use body-parser
commentRouter.use(bodyParser.json());

// Set up routes
commentRouter.route('/')
    .get((req, res, next) => {
        Comments.find({})
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Comments.create(req.body)
            .then((comment) => {
                console.log('Comment created: ', comment);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })
    .delete((req, res, next) => {
        Comments.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

commentRouter.route('/:commentId')
    .get((req, res, next) => {
        Comments.findById(req.params.commentId)
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /comments/' + req.params.commentId);
    })
    .put((req, res, next) => {
        Comments.findByIdAndUpdate(req.params.commentId, {
            $set: req.body
        }, { new: true })
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type