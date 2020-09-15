const Joi = require('joi');

const schema = Joi.object({
  url: Joi.string().trim().pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)
    .required(),
  slug: Joi.string().trim().pattern(/^[\w\-]+$/i).min(2)
    .max(5),
});

module.exports = schema;
