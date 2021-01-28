/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => (
  <button
    onClick={onClick}
    type="submit"
    className="btn"
    style={{ backgroundColor: color }}
  >
    {text}
  </button>
);

Button.defaultProps = {
  color: "steelblue",
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  onClick: PropTypes.func,
};

export default Button;
