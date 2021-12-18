const homeRouter = require('./home');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const userRouter = require('./user');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const localRouter = require('./local');
const authMiddleware = require('../app/middleware/auth');

function route(app) {
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    app.use('/local', authMiddleware.requireAuth, localRouter);
    app.use('/admin', authMiddleware.requireAuth, adminRouter);
    app.use('/', authMiddleware.requireAuth, homeRouter);
    app.use('/me', authMiddleware.requireAuth, meRouter);
    app.use('/courses', authMiddleware.requireAuth, coursesRouter);
}

module.exports = route;
