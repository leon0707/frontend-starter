const path = require("path");
const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config["externals"] = {
    config: JSON.stringify({
      apiUrl: "http://localhost:5001/api"
    })
  };

  config["resolve"] = {
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": "@hot-loader/react-dom",
      proptypes: "proptypes/disabled"
    }
  };

  config = rewireReactHotLoader(config, env);
  return config;
};
