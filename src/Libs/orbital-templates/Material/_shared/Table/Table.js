/**
 * @file Table.js
 * @desc A reusable table component with sorting, pagination, and selection functionality.
 */

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import theme from "theme";
import { styles, toolbarStyles } from "./Table.styles";
import {
  Grid,
  MaterialTable,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip
} from "Templates";

/**
 * Sorts the array in descending order based on the specified property.
 * @param {Object} a - The first object to compare.
 * @param {Object} b - The second object to compare.
 * @param {string} orderBy - The property to sort by.
 * @returns {number} - The comparison result.
 */
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Sorts the array in a stable way based on the specified comparison function.
 * @param {Array} array - The array to sort.
 * @param {Function} cmp - The comparison function.
 * @returns {Array} - The sorted array.
 */
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

/**
 * Returns the sorting function based on the order and orderBy parameters.
 * @param {string} order - The sorting order ("asc" or "desc").
 * @param {string} orderBy - The property to sort by.
 * @returns {Function} - The sorting function.
 */
function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

/**
 * The table head component with sorting functionality.
 */
class EnhancedTableHead extends React.Component {
  /**
   * Creates a sort handler function for the specified property.
   * @param {string} property - The property to sort by.
   * @returns {Function} - The sort handler function.
   */
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      columns,
      count
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columns.map(
            column => (
              <TableCell
                key={column.id}
                align={column.numeric ? "right" : "left"}
                padding={column.disablePadding ? "none" : "default"}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

/**
 * The toolbar component for the table.
 * @param {Object} props - The component props.
 * @param {number} props.numSelected - The number of selected rows.
 * @param {Object} props.classes - The CSS classes.
 * @param {string} props.title - The title of the table.
 * @returns {JSX.Element} - The JSX element representing the toolbar.
 */
let EnhancedTableToolbar = props => {
  const { numSelected, classes, title } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

/**
 * The enhanced table component with sorting, pagination, and selection functionality.
 */
class EnhancedTable extends React.Component {
  state = {
    order: "asc",
    orderBy: "calories",
    selected: [],
    page: 0,
    rowsPerPage: 5
  };

  /**
   * Handles the request to sort the table.
   * @param {Object} event - The event object.
   * @param {string} property - The property to sort by.
   */
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  /**
   * Handles the click event on a row.
   * @param {Object} event - The event object.
   * @param {string} id - The ID of the clicked row.
   */
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };

  /**
   * Checks if a row is selected.
   * @param {string} id - The ID of the row.
   * @returns {boolean} - True if the row is selected, false otherwise.
   */
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const {
      classes,
      rows,
      columns,
      title,
      page,
      rowsPerPage,
      setPage,
      setRowsPerPage,
      count
    } = this.props;
    const { order, orderBy, selected } = this.state;
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar title={title} numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <MaterialTable className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              columns={columns}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy)).map(n => {
                const isSelected = this.isSelected(n._id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n._id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n._id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    {columns.map(col => {
                      return (
                        <TableCell component="th" scope="row" padding="none">
                          {n[col.label]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </MaterialTable>
        </div>
        <Grid justify={"flex-start"} container>
          <Grid item>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={(event, page) => setPage(page)}
              onChangeRowsPerPage={event => setRowsPerPage(event.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { defaultTheme: theme })(EnhancedTable);
