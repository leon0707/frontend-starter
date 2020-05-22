import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import LandingPage from "./views/LandingPage";
import Dashboard from "./views/Dashboard";
import Alert from "./components/Alert";
import { clear } from "./redux/alert/actions";
import { signOut } from "./redux/auth/actions";

function App(props) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/*<Nav.Link as={Link} to="/stat">Stat</Nav.Link>
                  <Nav.Link as={Link} to="/train">Train</Nav.Link>*/}
          </Nav>
          <Nav>
            {props.auth_token ? (
              <Nav.Link onClick={() => props.signOut()}>Sign out</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/signup">
                Sign up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          <Alert
            type={props.type}
            message={props.message}
            onClose={props.onCloseAlert}
          />
        </Row>
      </Container>
      <Switch>
        <Route
          exact
          path={"/"}
          render={() => {
            return props.auth_token !== null ? (
              <Redirect to="/dashboard" />
            ) : (
              <LandingPage />
            );
          }}
        />
        <Route path={"/signin"} component={LandingPage} />
        <ProtectedRoute
          path={"/dashboard"}
          component={Dashboard}
          is_auth={props.auth_token ? true : false}
        />
        <Route exact path={"/404"}>
          <h1>404</h1>
        </Route>
        <Redirect from="*" to="/404" />
      </Switch>
    </>
  );
}

App.propTypes = {
  auth_token: PropTypes.string,
  signOut: PropTypes.func,
  type: PropTypes.string,
  message: PropTypes.string,
  onCloseAlert: PropTypes.func
};

function ProtectedRoute(props) {
  const { component, is_auth, ...rest } = props;
  const Component = component;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        is_auth ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.component,
  is_auth: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    type: state.alert.type,
    message: state.alert.message,
    auth_token: state.auth.auth_token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCloseAlert: () => {
      dispatch(clear());
    },
    signOut: () => {
      dispatch(signOut());
    }
  };
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default process.env.NODE_ENV === "development"
  ? hot(connectedApp)
  : connectedApp;
