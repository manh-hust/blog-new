module.exports = {
    multipleMongooseToObj: function (mongooseArrs) {
        return mongooseArrs.map((mongoose) => mongoose.toObject());
    },
    mongooseToObj: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
