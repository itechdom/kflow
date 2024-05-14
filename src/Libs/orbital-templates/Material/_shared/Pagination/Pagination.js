/**
 * Pagination component for displaying and navigating through a paginated data set.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isSm - Indicates whether the screen size is small.
 * @param {number} props.rowsPerPage - The number of rows per page.
 * @param {function} props.onChangePage - The callback function to handle page change.
 * @param {number} props.page - The current page number.
 * @param {number} props.count - The total number of items.
 * @param {function} props.onChangeRowsPerPage - The callback function to handle rows per page change.
 * @returns {JSX.Element} The Pagination component.
 */
import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import { Paper, IconButton, Icon } from "@material-ui/core";
const Pagination = ({
  isSm,
  rowsPerPage,
  onChangePage,
  page,
  count,
  onChangeRowsPerPage,
}) => {
  return !isSm ? (
    <Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        isSm={isSm}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(ev, page) => {
          onChangePage(page);
        }}
        onChangeRowsPerPage={(ev, rowsPerPage) =>
          onChangeRowsPerPage(rowsPerPage)
        }
      />
    </Paper>
  ) : (
    <Paper>
      <IconButton onClick={() => onChangePage(page - 1)}>
        <Icon>navigate_before</Icon>
      </IconButton>
      {10 * (page) - 9} to {`${10 * (page)}`} of {count}
      <IconButton onClick={() => onChangePage(page + 1)}>
        <Icon>navigate_next</Icon>
      </IconButton>
    </Paper>
  );
};
export default Pagination;
