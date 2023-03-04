const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend
} = require('../../controllers/userController')

//api/users
router.route('/').get(getAllUsers).post(createUser);
//api/users/: userId
router.route('/:userId').get(getUserById).delete(deleteUserById).put(updateUserById);
//api/users/:userId/ friends/
router.route('/:userId/friends/:friendId').post(addFriend);
//api/users/:userId/ friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router; 
