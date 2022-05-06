const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const BlogSchema =  new mongoose.Schema({
    title: { 
        type: String,
        require: true,
        trim: true,
    },
    body: {
        type: String,
        require: true,
        min: 1,
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    image: {
        type: String
    }
}, { timestamps: true})

BlogSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Blog', BlogSchema)
