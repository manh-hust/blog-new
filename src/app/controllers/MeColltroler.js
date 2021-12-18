const Course = require('../models/course');

const User = require('../models/user');

const { mongooseToObj, multipleMongooseToObj } = require('../../util/mongoose');
const { json } = require('express');
const { removeAccents } = require('../../util/remove-accents');

const course = require('../models/course');
const user = require('../models/user');

var messages = [
    {
        _id: 1,
        message: 'Hello nha ban thân',
    },
    {
        _id: null,
        message: 'Ha ha ha lâu lắm mới gặp nha',
    },
    {
        _id: 1,
        message: 'Như nào nhỉ',
    },
    {
        _id: 1,
        message: 'Tối nay bạn có rảnh không mình đi chơi chút',
    },
    {
        _id: null,
        message: 'oke bạn ê !',
    },
];
class MeController {
    //GET /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) => {
                var q = req.query.q;
                var matchesCourses;
                if (q) {
                    matchesCourses = courses.filter(function (course) {
                        return (
                            removeAccents(course.name)
                                .toLowerCase()
                                .indexOf(removeAccents(q.toLowerCase())) !== -1
                        );
                    });
                } else {
                    matchesCourses = courses;
                }
                var coursesAddAdmin = matchesCourses.map(function (course) {
                    return {
                        _id: course._id,
                        name: course.name,
                        description: course.description,
                        image: course.image,
                        videoId: course.videoId,
                        deleted: course.deleted,
                        createdAt: course.createdAt,
                        updatedAt: course.updatedAt,
                        slug: course.slug,
                        deleteAt: course.deleteAt,
                        __v: course.__v,
                        admin: req.admin,
                    };
                });

                res.render('me/stored-courses', {
                    deletedCount,
                    courses: coursesAddAdmin,
                    admin: req.admin,
                    q: q,
                });
            })
            .catch(next);
    }
    //GET /me/trash/courses
    trashCourses(req, res, next) {
        if (req.admin) {
            Course.findDeleted({})
                .sortable(req)
                .then((courses) => {
                    res.render('me/trash-courses', {
                        courses: multipleMongooseToObj(courses),
                    });
                })
                .catch(next);
        } else {
            res.status(404).send('Not found!');
        }
    }
    searchCourses(req, res, next) {}

    //GET /me/friends
    listFriends(req, res, next) {
        var id = res.locals._id.toString();
        var q = req.query.q;
        User.findOne({ _id: id })
            .then((user) => {
                return user.friends;
            })
            .then((friends) => {
                User.find({
                    $and: [{ _id: friends }, { _id: { $ne: id } }],
                }).then((users) => {
                    var matchesUsers;
                    if (q) {
                        matchesUsers = users.filter((user) => {
                            return (
                                removeAccents(user.name)
                                    .toLowerCase()
                                    .indexOf(removeAccents(q.toLowerCase())) !==
                                -1
                            );
                        });
                    } else {
                        matchesUsers = users;
                    }

                    var userNew = matchesUsers.map((user) => {
                        return {
                            id: user._id,
                            name: user.name,
                            avatar: user.avatar,
                            month: user.updatedAt.getMonth() + 1,
                            messages: messages,
                        };
                    });
                    res.render('me/friends', {
                        users: userNew,
                        q: q,
                    });
                });
            })
            .catch(next);
    }
    //POST /me/:id/addfriend
    addFriends(req, res, next) {
        var idUser = req.signedCookies.userId;
        var idAdd = req.params.id;
        User.findOne({ _id: idUser })
            .then((user) => {
                if (user.friends.indexOf(idAdd) < 0) {
                    user.friends.push(idAdd);
                    User.updateOne(
                        { _id: idUser },
                        { friends: user.friends },
                        function (err) {},
                    );

                    User.findOne({ _id: idAdd }).then((user) => {
                        user.friends.push(idUser);
                        User.updateOne(
                            { _id: idAdd },
                            { friends: user.friends },
                            function (err) {},
                        );
                    });
                }
                res.redirect('back');
            })
            .catch(next);
    }
    //POST /me/:id/deletefriend
    deleteFriends(req, res, next) {
        var idUser = req.signedCookies.userId;
        var idDel = req.params.id;
        User.findOne({ _id: idUser })
            .then((user) => {
                user.friends.splice(user.friends.indexOf(idDel), 1);
                User.updateOne(
                    { _id: idUser },
                    { friends: user.friends },
                    function (err) {},
                );

                User.findOne({ _id: idDel }).then((user) => {
                    user.friends.splice(user.friends.indexOf(idUser), 1);
                    User.updateOne(
                        { _id: idDel },
                        { friends: user.friends },
                        function (err) {},
                    );
                });

                res.redirect('back');
            })
            .catch(next);
    }
    //GET /me//stored/notifications
    storedNoti(req, res, next) {
        var idUser = res.locals._id.toString();

        var run = async function () {
            var user = await User.findOne({ _id: idUser });
            user.notifications.reverse();
            res.render('me/store-noti', {
                notifications: user.notifications,
            });
        };
        run();
    }
    deleteNoti(req, res, next) {
      
    }
}

module.exports = new MeController();
