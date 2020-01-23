const path = require('path');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config["externals"] = {
    "config": JSON.stringify({
      "apiUrl": "http://localhost:5001/api",
      "websocketUrl": "http://localhost:5001/chat"
    })
  };

  config["resolve"] = {
    "alias": {
      "react": path.resolve("./node_modules/react"),
      "react-dom": "@hot-loader/react-dom"
    }
  };

  config = rewireReactHotLoader(config, env);
  return config;
}
