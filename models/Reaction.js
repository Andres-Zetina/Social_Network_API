const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),

        },
        
            reactionBody: {
                type: String,
                required: true,
                maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => new Date(createdAt).toLocaleString(),
        },
        toJSON: {
            getters: true,
        },
        id:false,
    }
);

const reaction = model('Reaction', reactionSchema);



module.exports = reaction;
