const Users = require('../models/user');
const md5 = require('md5');
const { mongooseToObj, multipleMongooseToObj } = require('../../util/mongoose');
const { removeAccents } = require('../../util/remove-accents');

const { json } = require('express');

class UserController {
    //Get /user/list-user
    show(req, res, next) {
        Users.find({})
            .then((users) => {
                // Tìm kiếm trên ô search
                var q = req.query.q;
                var matchesUsers;
                if (q) {
                    if ('Admin'.toLowerCase() === q.toLowerCase()) {
                        matchesUsers = users.filter(function (user) {
                            return user.adminId === 1;
                        });
                    } else if ('User'.toLowerCase() === q.toLowerCase()) {
                        matchesUsers = users.filter(function (user) {
                            return user.adminId == undefined;
                        });
                    } else {
                        matchesUsers = users.filter(function (user) {
                            return (
                                removeAccents(user.name)
                                    .toLowerCase()
                                    .indexOf(removeAccents(q.toLowerCase())) !==
                                -1
                            );
                        });
                    }
                } else {
                    matchesUsers = users;
                }

                res.render('user/list-user', {
                    users: multipleMongooseToObj(matchesUsers),
                    q: q,
                });
            })
            .catch(next);
    }
    // GET user/create
    create(req, res, next) {
        res.render('user/create');
        // POST user/store
    }
    store(req, res, next) {
        const email = req.body.email;

        Users.findOne({
            email: email,
        })
            .then((users) => {
                if (users) {
                    res.render('user/create', {
                        name: req.body.name,
                        email: req.body.email,
                        pass: req.body.pass,
                        hadEmail: true,
                    });
                } else {
                    req.body.avatar = 1;
                    req.body.pass = md5(req.body.pass);
                    Users(req.body)
                        .save()
                        .then(() => {
                            res.redirect('/user/list-users');
                        })
                        .catch(next);
                }
            })
            .catch(next);
    }
    // GET user/:id/infor
    infor(req, res, next) {
        Users.findOne({
            _id: req.params.id,
        })
            .then((users) => {
                res.render('user/infor', users);
            })
            .catch(next);
    }

    //PUT /user/:id/update
    update(req, res, next) {
        if (req.body.pass.length < 32) {
            req.body.pass = md5(req.body.pass);
        }
        Users.updateOne(
            {
                _id: req.params.id,
            },
            {
                name: req.body.name,
                pass: req.body.pass,
                avatar: req.body.avatar,
            },
        )
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // DELETE /user/:id/delete
    delete(req, res, next) {
        Users.deleteOne({
            _id: req.params.id,
        })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new UserController();
