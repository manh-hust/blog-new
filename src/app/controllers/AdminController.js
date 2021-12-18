const Users = require('../models/user');
const { mongooseToObj, multipleMongooseToObj } = require('../../util/mongoose');
const { json } = require('express');

class AdminController {
    show(req, res, next) {
        res.render('admin/create-noti');
    }

    // POST /admin/create-noti
    store(req, res, next) {
        var date = new Date();
        var noti = {
            noti: req.body.notification,
            date: {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            },
        };
        Users.find({})
            .then((users) => {
                for (let i = 0; i < users.length; i++) {
                    users[i].notifications.push(noti);
                    Users.updateOne(
                        { _id: users[i]._id },
                        { notifications: users[i].notifications },
                        function (err) {},
                    );
                }
                res.redirect('back');
            })
            .catch(next);
    }
}

module.exports = new AdminController();
