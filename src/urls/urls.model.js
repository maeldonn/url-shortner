const mongoose = require('mongoose');

const Url = mongoose.Schema(
  {
    url: { type: String, required: true },
    slug: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('urls', Url);
