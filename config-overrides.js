const path = require('path');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config["externals"] = {
    "config": JSON.stringify({
      "apiUrl": "http://localhost:5001/api"
    })
  }
  config["resolve"] = {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  }
  return config;
}
