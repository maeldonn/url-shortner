const models = require('./urls.models');

const redirect = (req, res) => res.redirect(req.url.url);

const createShortUrl = async (req, res, next) => {
  try {
    await new models.Urls({
      ...req.body,
      date: Date.now(),
    }).save();
    const apiUrl = process.env.NODE_ENV === 'production' ? process.env.API_URL : `localhost:${process.env.PORT || 5000}/`;
    res.status(201).json({
      ...req.body,
      link: `${apiUrl}${req.body.slug}`,
    });
  } catch (error) {
    // If generated nanoid is already used
    error.message = 'Slug is already in use';
    next(error);
  }
};

module.exports = {
  redirect,
  createShortUrl,
};
