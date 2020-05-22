import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

import App from "./App";

const mockFunc = jest.fn();
const mockStore = configureMockStore();
const history = createBrowserHistory();
const store = mockStore({
  alert: {
    type: null,
    message: null
  },
  auth: {
    auth_token: null,
    onCloseAlert: mockFunc,
    signOut: mockFunc
  },
  router: {
    location: {
      pathname: "/",
      search: "",
      hash: "",
      query: {}
    },
    action: "POP"
  }
});

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("App - render", () => {
    expect(
      wrapper
        .find("form")
        .first()
        .exists()
    ).toEqual(true);
  });
});
