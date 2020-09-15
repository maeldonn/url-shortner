const db = require('../db/connect');

const urls = db.get('urls');
urls.createIndex('slug', { unique: true });

module.exports = urls;
