const { nanoid } = require('nanoid');

const schema = require('./urls.schema');
const urls = require('./urls.model');

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
      const result = await urls.findOne({ slug });
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
    const url = await urls.findOne({ slug });
    if (url) {
      req.url = url;
      return next();
    }
    res.status(404);
    throw new Error("Slug doesn't exist");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  validateSchema,
  availableSlug,
  existingSlug,
};
