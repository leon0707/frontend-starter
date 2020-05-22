import React from "react";
import PropTypes from "prop-types";
import BootstrapAlert from "react-bootstrap/Alert";

import "./Alert.css";

function Alert(props) {
  const { type, message, onClose } = props;
  return (
    <>
      {type !== null && (
        <BootstrapAlert
          variant={type}
          className="Alert"
          onClose={onClose}
          dismissible
        >
          {/*<BootstrapAlert.Heading>Oh snap! You got an error!</BootstrapAlert.Heading>*/}
          <p>{message}</p>
        </BootstrapAlert>
      )}
    </>
  );
}
Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func
};

export default Alert;
