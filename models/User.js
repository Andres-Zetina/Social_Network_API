const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String, 
            required: true,
            unique: true, 
            trim: true, 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Types.ObjectId,
                ref: 'user',
            }
        ],
    },
    {
        toJSON: {
            getters: true,
        },
        id:false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model ('user', userSchema);

module.exports = User;
