const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter news title'],
        trim: true,
        maxLength: [100, 'News title must be less than 100 characters.']
    },
    content: {
        type: String,
        required: [true, 'Please enter news content']
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please enter news category']
    },
    author: {
        type: String, // Assuming author is just a name (string)
        required: [true, 'Please enter author name']
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('News', newsSchema);