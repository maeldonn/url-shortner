const { nanoid } = require('nanoid');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const path = require('path');

const schema = require('./urls.schema');
const models = require('./urls.models');

const rateLimiter = () => rateLimit({
  windowMs: 60 * 1000,
  max: 10,
});

const speedLimiter = () => slowDown({
  windowMs: 60 * 1000,
  delayAfter: 5,
  delayMs: process.env.NODE_ENV === 'test' ? 0 : 1000,
});

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

const removeOldUrls = async (req, res, next) => {
  try {
    const cacheTime = await models.Cache.findOne({});
    if (cacheTime) {
      // Check every hours if they are urls to delete
      if (cacheTime.time > Date.now() - 60 * 60 * 1000) {
        next();
      } else {
        // Remove urls older than 3 days
        await models.Urls.remove({ date: { $lte: Date.now() - 3 * 24 * 60 * 60 * 1000 } });
        await models.Cache.updateOne({}, { time: Date.now() });
        next();
      }
    } else {
      await new models.Cache({ time: Date.now() }).save();
      next();
    }
  } catch (error) {
    next(error);
  }
};

const availableSlug = async (req, res, next) => {
  const { slug } = req.body;
  try {
    if (slug) {
      const result = await models.Urls.findOne({ slug });
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
    const url = await models.Urls.findOne({ slug });
    if (url) {
      req.url = url;
      return next();
    }
    return res.status(404).sendFile(path.resolve('client/dist/index.html'));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  rateLimiter,
  speedLimiter,
  validateSchema,
  removeOldUrls,
  availableSlug,
  existingSlug,
};
