const urls = require('./urls.model');

const redirect = (req, res) => res.redirect(req.url.url);

const createShortUrl = async (req, res, next) => {
  try {
    const createdUrl = await urls.insert(req.body);
    const apiUrl = process.env.NODE_ENV === 'production' ? process.env.API_URL : `localhost:${process.env.PORT || 5000}/`;
    res.json({
      ...createdUrl,
      link: `${apiUrl}${createdUrl.slug}`,
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
