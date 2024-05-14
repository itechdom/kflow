import React from "react";
import { Grid, Paper, Button } from '@material-ui/core';
/**
 * Renders the view options for the model list view.
 *
 * @param {Object} props - The component props.
 * @param {number} props.viewOption - The currently selected view option.
 * @param {Function} props.setViewOption - The function to set the view option.
 * @param {Object} props.classes - The CSS classes for styling the component.
 * @returns {JSX.Element} The rendered view options.
 */
const ModelListViewOptions = ({ viewOption, setViewOption, classes }) => {
  return (
    <Grid
      className={classes.viewOptionContainer}
      container
      justify={"flex-end"}
    >
      <Grid item>
        <Paper>
          <Button
            className={
              viewOption === 0 ? classes.viewOptionSelected : classes.viewOption
            }
            onClick={() => setViewOption(0)}
          >
            Grid
          </Button>
        </Paper>
      </Grid>
      <Grid item>
        <Paper>
          <Button
            className={
              viewOption === 1 ? classes.viewOptionSelected : classes.viewOption
            }
            onClick={() => setViewOption(1)}
          >
            Table
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ModelListViewOptions;
