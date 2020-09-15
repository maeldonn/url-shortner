const express = require('express');

const controller = require('./urls.controller');
const middlewares = require('./urls.middlewares');

const router = express.Router();

// GET /:id
router.get('/:slug', middlewares.existingSlug, controller.redirect);

// POST /
router.post(
  '/',
  middlewares.speedLimiter(),
  middlewares.rateLimiter(),
  middlewares.validateSchema,
  middlewares.availableSlug,
  controller.createShortUrl,
);

module.exports = router;
