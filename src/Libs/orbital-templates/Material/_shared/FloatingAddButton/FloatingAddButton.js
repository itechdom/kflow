import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import theme from "theme";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

/**
 * FloatingAddButton component.
 * Renders a floating add button using Material-UI's Fab component.
 */
class FloatingAddButton extends React.Component {
  /**
   * Renders the FloatingAddButton component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    const { classes, onClick } = this.props;
    return (
      <Fab
        style={{ position: "fixed" }}
        onClick={onClick}
        className={classes.fab}
        color={"primary"}
      >
        <AddIcon />
      </Fab>
    );
  }
}

FloatingAddButton.propTypes = {
  /**
   * The classes object provided by the withStyles HOC.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The click event handler for the button.
   */
  onClick: PropTypes.func.isRequired
};

export default FloatingAddButton;
