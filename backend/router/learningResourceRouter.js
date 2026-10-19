const express = require('express');
const router = express.Router();
const {
  getAllLearningResources,
  getLearningResourceById,
  createLearningResource,
  updateLearningResource,
  deleteLearningResource
} = require('../controller/learningResourceController');

// Routes for /api/learning-resources
router.get('/', getAllLearningResources);
router.get('/:id', getLearningResourceById);
router.post('/', createLearningResource);
router.put('/:id', updateLearningResource);
router.delete('/:id', deleteLearningResource);

module.exports = router;
