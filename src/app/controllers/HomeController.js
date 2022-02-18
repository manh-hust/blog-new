const Course = require('../models/course');
const Users = require('../models/user')
const { multipleMongooseToObj } = require('../../util/mongoose');

const PAGE_SIZE = 8;

class HomeController {
    //[GET] /Homes
    index(req, res, next) {
        var page = req.query.page;
        if (page) {
            // Json data
            page = parseInt(page);
            if (page < 1) {
                page = 1;
            }
            var skip = (page - 1) * PAGE_SIZE;

            Course.find({})
                .skip(skip)
                .limit(PAGE_SIZE)
                .then((course) => {
                    Course.countDocuments({}).then((total) => {
                        var tongSopage = Math.ceil(total / PAGE_SIZE);
                        res.json({
                            total: total,
                            tongSopage: tongSopage,
                            course: course,
                        });
                    });
                })
                .catch(next);
        } else {
            //Get all
            Course.find({})
                .then(function (course) {
                    res.json(course);
                })
                .catch(next);
        }
    }
    //[GET] /HOME
    show(req, res, next) {
        res.render('home', {
            isFooter: true,
            isSlider: true,
        });
    }
    //[GET] /couser
    async getCouser(req, res, next) {
        const couser = await Course.find({})
        res.send(couser)
    }
    //[GET] /user
    async getUsers(req, res, next) {
        const users = await Users.find({})
        res.send(users)
    }

}

module.exports = new HomeController();
