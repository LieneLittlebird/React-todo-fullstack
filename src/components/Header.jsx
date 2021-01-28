/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title }) => {
  const onClick = () => {
    console.log("Click");
  };
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="green" text="Add" onClick={onClick} />
    </header>
  );
};
// If you want, you can add a default prop for title e.g.
// Then, whenever you put the title prop somewhere, it will show the default name
// Header.defaultProps = {
//   title: "Task Tracker",
// };

// To avoid entering the wrong proptype, define the type of prop one should add
// If the wrong proptype is added, an error will show on the console
// If you have "isRequired", no default props is needed, it kind of acts as a default prop
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JSX
// const headingStyle = {
//     color: "red",
//     backgroundColor: "black",
//   };

export default Header;
