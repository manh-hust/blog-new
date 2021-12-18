const Course = require('../models/course');
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
}

module.exports = new HomeController();
