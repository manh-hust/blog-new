const Users = require('../models/user');

module.exports.requireAuth = function (req, res, next) {
    if (!req.signedCookies) {
        res.redirect('/auth/login');
        return;
    }

    Users.findOne({ _id: req.signedCookies.userId }, function (err, user) {
        if (!user) {
            res.redirect('/auth/login');
            return;
        }
        // Trả về tên người dùng và id qua biến res.locals khi login thành công
        res.locals.nameLogined = user.name.split(' ').slice(-1).join(' ');
        res.locals._id = user._id;
        res.locals.avatar = user.avatar;
        // Trả về thông báo của người đó
        res.locals.notifications = user.notifications.reverse().slice(0, 10);
        req.admin = false;
        if (user.adminId) {
            req.admin = true;
            // Set quyền Admin trả về cho mọi path
            res.locals.admin_id = user.adminId;
        }
        next();
    });
};
