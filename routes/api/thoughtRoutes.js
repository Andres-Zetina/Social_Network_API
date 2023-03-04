const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughtController')
// api / thought
router.route('/').get(getAllThoughts).post(createThought);

// api / thought / :thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById)

// api / thought / :thoughtId / reactions
router.route("/:thoughtId/reactions").post(createReaction)

// api / thought / :thoughtId / reactions / :reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)


module.exports = router;
