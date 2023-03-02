const {User, Thought, Reaction } = require('../models');



module.exports={
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({}, (err, result) => {
            if(result){
                res.status(200).json(result);
            }else{
                res.status(500).json({error:'Error'})
            }
        })
    },
//get a single thougth by its _id
    getThoughtById(req, res) {
        const {thoughtId} = req.params;

        Thought.findById(thoughtId, (err, thought) => {
            if (err) {
                res.status(500).json({error: err.message});
            }else if(!thougth) {
                res.status(400).json({error: 'Thought not found'});
            }else{
                res.status(200).json(thought)
            }
        })
    },

//post a new thought
    createThought(req, res){
        const {thoughtText, username, userId} = req.body;
        const newThought = new Thought({thoughtText, username, userId});

        newThought.save((err, thought) => {
            if(err){
                res.status(500).json({error: err.message});
            }else{
                User.findByIdAndUpdate(
                    userId,
                    {$addToSet: {thoughts: thought._id}},
                    {new:true},
                    (err, user) => {
                        if (err){
                            res.status(500).json({error: err.message});
                        }else if(!user){
                        res.status(404).json({error: 'User not found'})
                        }else{
                            res.status(200).json(thought);
                        }
                    }
                )
            }
        })
    },

//put to update a thought by its _id
    updateThoughtById(req, res){
        const {thoughtId} = req.params;
        const updatedFields = req.body;

        Thought.findByIdAndUpdate(
            thoughtId,
            updatedFields, 
            {new: true},
            (err, thought) => {
                if(err){
                    res.status(500).json({error: err.message});
                }else if(!thought){
                    res.status(404).json({error:'Thought not found'})
                }else {
                    res.status(200).json(thought);
                }
            })
    },
//Delete to remove a thought by its _id
    deleteThoughtById(req, res) {
        const {thoughtId} = req.params;

        Thought.findByIdAndRemove( thoughtId,(err, thought) => {
            if(err){
                res.status(500).json({error: err.message});
            }else if (!thought) {
                res.status(404).json({error: 'Thought not found'})
            }else {
                User.findByIdAndUpdate(
                    thought.userId,
                    {$pull: {thoughts: thought._id}},
                    (err, user) => {
                        if(err){
                            res.status(500).json({error: err.message})
                        }else{
                            res.status(200).send()
                        }
                    }
                )
            }
        });
    },

//Post to create a reaction stored in a single thoughts reaction array
    createReaction(req, res) {
        const {body, params}= req;
        thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reaction: body}},
            {new: true, runValidators: true}
        )
        .then((thought) => {
            if(!thought){
                return res.statsu(404).json({message: 'No thought found with this id'})
            }
            res.json(thought)
        })
        .catch((err)=> res.status (500).json(err));
    },

//Delete to pull and remove by reactions reactionId value
    removeReaction(req, res) {
        const {params} = req;
        Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$pull: {reactions: {reactionId: params.reactionId}}},
        {new: true}
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    }

}