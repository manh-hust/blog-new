const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const SortMiddleware = require('./app/middleware/sortMiddleware');

const app = express();
const port = process.env.port || 3000;

const route = require('./routes');
const db = require('./config/db');

//Connect DB
db.connect();

// Truy cập các file từ public qua đường link trực tiếp không cần định nghĩa
app.use(express.static(path.join(__dirname, 'public')));

// Lay du lieu qua phuong thuc body khi POST thuc client
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// Lay du lieu qua JSON
app.use(express.json());

app.use(methodOverride('_method'));

// Custom Middleware
app.use(SortMiddleware);
//HTTP logger
// app.use(morgan('combined'))

app.use(cookieParser('conchimxanh874')); // use to read format cookie
// Tempalte engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helper/hanldebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});