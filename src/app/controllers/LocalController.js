const Users = require('../models/user');
const { multipleMongooseToObj } = require('../../util/mongoose');
const { removeAccents } = require('../../util/remove-accents');

class LocalController {
    //[GET] /local/everybody
    index(req, res, next) {
        var id = req.signedCookies.userId;
        var q = req.query.q;
        Users.find({ _id: { $ne: id } })
            .then(function (users) {
                var matchesUsers;
                if (q) {
                    matchesUsers = users.filter((user) => {
                        return (
                            removeAccents(user.name)
                                .toLowerCase()
                                .indexOf(removeAccents(q.toLowerCase())) !== -1
                        );
                    });
                } else {
                    matchesUsers = users;
                }

                Users.findOne({ _id: id }).then(function (user) {
                    res.render('local/everybody', {
                        users: multipleMongooseToObj(matchesUsers),
                        friends: user.friends,
                        isHeader: true,
                        q: q,
                    });
                });
            })
            .catch(next);
    }
}

module.exports = new LocalController();
