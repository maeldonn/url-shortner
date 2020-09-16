const { nanoid } = require('nanoid');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const schema = require('./urls.schema');
const Url = require('./urls.model');

const validateSchema = (req, res, next) => {
  const value = schema.validate(req.body);
  if (!value.error) {
    next();
  } else {
    if (value.error.message.includes('url')) {
      value.error.message = 'Invalid url';
    } else if (value.error.message.includes('slug')) {
      value.error.message = 'Invalid slug';
    }
    res.status(422);
    next(value.error);
  }
};

const availableSlug = async (req, res, next) => {
  const { slug } = req.body;
  try {
    if (slug) {
      const result = await Url.findOne({ slug });
      if (result) {
        throw new Error('Slug is already in use');
      } else {
        next();
      }
    } else {
      // TODO: Check if generated slug is available
      req.body.slug = nanoid(5);
      next();
    }
  } catch (error) {
    res.status(409);
    next(error);
  }
};

const existingSlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const url = await Url.findOne({ slug });
    if (url) {
      req.url = url;
      return next();
    }
    res.status(404);
    // TODO: Send 404 page
    throw new Error("Slug doesn't exist");
  } catch (error) {
    return next(error);
  }
};

const rateLimiter = () => rateLimit({
  windowMs: 60 * 1000,
  max: 10,
});

const speedLimiter = () => slowDown({
  windowMs: 60 * 1000,
  delayAfter: 5,
  delayMs: process.env.NODE_ENV === 'test' ? 0 : 1000,
});

module.exports = {
  validateSchema,
  availableSlug,
  existingSlug,
  rateLimiter,
  speedLimiter,
};
