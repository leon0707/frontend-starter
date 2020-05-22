import { resolve } from "path";
import rewireReactHotLoader from "react-app-rewire-hot-loader";

export default function override(config, env) {
  //do stuff with the webpack config...
  config["externals"] = {
    "config": JSON.stringify({
      "apiUrl": "http://localhost:5001/api"
    })
  };

  config["resolve"] = {
    "alias": {
      "react": resolve("./node_modules/react"),
      "react-dom": "@hot-loader/react-dom"
    }
  };

  config = rewireReactHotLoader(config, env);
  return config;
}
