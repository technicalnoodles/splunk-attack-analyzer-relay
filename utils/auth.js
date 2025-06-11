const keys = require('../config/keys');
module.exports = {
  getAuthHeaders: async function () {
    return keys['X-API-KEY'];
  },
};
