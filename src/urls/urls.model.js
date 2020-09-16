const mongoose = require('mongoose');

const Url = mongoose.Schema(
  {
    url: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('urls', Url);
