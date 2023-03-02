const {User, Thought, Reaction } = require('../models');

//Get all Users 
module.exports ={
    getUsers(req, res) {
    User.find({})
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({error:err.message});
        })
    },
//get a single user
    getUserById(req,res) {
        const {id} = req.params;

        User.findById(id)
        .populate('thoughts friends')
        .then(user => {
            if(!user) {
                res.status(404).json({error: 'User not found'});
            }else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
    },

    //post a new user
    createUser (req, res){
        const {username, email} = req.body;
        const newUser = new User({username, email});

        newUser
            .save()
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                res.status(500).json({error: err.message});
            })
    },

    //PUT to update a user by its _id
    updateUserById(req, res) {
        const {id} = req.params;
        const updateFields = req.body;

        User.findByIdAndUpdate( id, updateFields, { new: true})
            .then(user => {
                if(!user) {
                    res.status(404).json({error:'User not found'});
                }else {
                    res.status(200).json(user);
                }
            })
            .catch(err => {
                res.status(500).json({error: err.message});
            })
    },

//Delete a user by its _id
    deleteUserById(req,res){
        const {id} = req.params;
        
        User.findByIdAndRemove(id)
            .then(user => {
                if (!user){
                    res.status(404).json({error: 'User not found'});
                }else {
                    res.status(200).send();
                }
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
    },

//Post to add a new friend to a users friend list 
    addFriend(req, res) {
        const { userId, friendId} = req.params;

        User.findByIdAndUpdate (
            userId, 
            {$addToSet: {friends: friendId}},
            {new: true},
            (err, user) => {
                if (err) {
                    res.status(500).json({error: err.message});
                }else if (!user) {
                    res.status(404).json({error: 'User not found'});
                }else {
                    res.status(200).json(user);
                }
            }
        )
    },

//delete a freind form a users freind list 
removeFriend(req, res) {
    const {userId, friendId} = req.params;

    User.findByIdAndUpdate(
        userId,
        {$pull: {friends: friendId}},
        {new: true},
        (err, user) => {
            if(err) {
                res.status(500).json({error: err.message});
            }else if (!user) {
                res.status(404).json({error: 'User not found'})
            }else {
                res.status(200).json(user);
            }
        }
    )
}
};