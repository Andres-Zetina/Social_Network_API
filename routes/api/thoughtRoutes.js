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

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById)

router.route("/:thoughtId/reactions").post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)


module.exports = roputer;