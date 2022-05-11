const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: {
            type: Number,
        },
        name: {
            type: String,
            maxLengh: 255,
            required: true,
        },
        description: {
            type: String,
            maxLengh: 600,
        },
        image: {
            type: String,
            maxLengh: 600,
        },
        slug: {
            type: String,
            maxLengh: 100,
            slug: 'name',
            unique: true,
        },
        videoId: {
            type: String,
            maxLengh: 100,
        },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Custom Query
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    } else {
        return this;
    }
};

// Add plugin
mongoose.plugin(slug);

Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Courses', Course);
