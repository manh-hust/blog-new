const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Users = new Schema(
    {
        name: {
            type: String,
            maxLengh: 255,
            required: true,
        },
        email: {
            type: String,
            maxLengh: 600,
        },
        pass: {
            type: String,
            maxLengh: 600,
        },
        adminId: {
            type: Number,
        },
        avatar: {
            type: Number,
        },
        friends: {
            type: Array,
        },
        notifications: {
            type: Array,
        },
    },
    {
        timestamps: true,
    },
);

//Users.plugin(AutoIncrement);

Users.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Users', Users);
