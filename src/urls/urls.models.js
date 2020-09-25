const mongoose = require('mongoose');

const url = mongoose.Schema(
  {
    url: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    date: { type: Date, required: true },
  },
  {
    versionKey: false,
  },
);

const cache = mongoose.Schema(
  { time: { type: Date, required: true } },
  { versionKey: false },
);

module.exports = {
  Urls: mongoose.model('urls', url),
  Cache: mongoose.model('cacheTime', cache),
};
