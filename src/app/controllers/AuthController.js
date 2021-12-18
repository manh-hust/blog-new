const Users = require('../models/user');
const md5 = require('md5');
const { mongooseToObj, multipleMongooseToObj } = require('../../util/mongoose');
const { json } = require('express');

class AuthController {
    // [GET] /auth/login
    login(req, res, next) {
        res.render('auth/login', {
            isHeader: false,
        });
    }
    // [POST] auth/login
    postLogin(req, res, next) {
        var email = req.body.email;
        var pass = req.body.pass;
        var hashPass = md5(pass);
        Users.findOne(
            {
                email: email,
            },
            (err, user) => {
                var err = [];
                if (!user) {
                    err.push('Email not found!');
                } else {
                    if (user.pass !== hashPass) {
                        err.push('Passwords do not match!');
                    }
                }
                if (err.length) {
                    res.render('auth/login', {
                        err: err,
                        email: email,
                        pass: pass,
                    });
                    return;
                }
                // Set cookie == id của chính người dùng
                res.cookie('userId', user._id.toString(), {
                    signed: true,
                });
                res.redirect('/home');
            },
        );
    }

    logout(req, res, next) {
        res.clearCookie('userId');
        res.render('auth/login');
    }
}

module.exports = new AuthController();
