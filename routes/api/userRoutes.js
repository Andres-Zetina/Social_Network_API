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


router.route('/').get(getAllUsers).post(createUser);

router.route('./userId').get(getUserById).delete(deleteUserById).put(updateUserById);

router.route('./:userId/friends/:friendId').post(addFriend);

router.route('./:userId/friends/:friendId').delete(removeFriend);

module.exports = router; 