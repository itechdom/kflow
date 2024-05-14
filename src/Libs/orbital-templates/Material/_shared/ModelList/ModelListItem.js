/**
 * Represents a single item in the model list.
 * @module ModelListItem
 */

import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ConfirmDeleteModal } from "Templates";
import { withState, compose } from "recompose";

import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Button
} from "@material-ui/core";

/**
 * Enhances the ModelListItem component with additional state and functionality.
 * @function enhance
 * @param {Object} props - The component props.
 * @returns {React.Component} The enhanced ModelListItem component.
 */
const enhance = compose(
  withState("actionOpen", "setActionOpen", false),
  withState("anchorEl", "setAnchorEl")
);

/**
 * Represents a single item in the model list.
 * @function ModelListItem
 * @param {Object} props - The component props.
 * @returns {React.Component} The ModelListItem component.
 */
const ModelListItem = ({
  classes,
  open,
  setOpen,
  model,
  deleteModel,
  setDeletedModel,
  deletedModel,
  match,
  history,
  actionOpen,
  setActionOpen,
  anchorEl,
  setAnchorEl,
  onEdit,
  gridDisplay,
  onView
}) => {
  /**
   * Handles the click event of the "more" button to open the action menu.
   * @function handleMoreButtonClick
   * @param {Object} event - The click event object.
   */
  const handleMoreButtonClick = (event) => {
    setActionOpen(true);
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles the close event of the action menu.
   * @function handleMenuClose
   * @param {Object} event - The close event object.
   */
  const handleMenuClose = (event) => {
    setActionOpen(false);
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles the click event of the "view" menu item.
   * @function handleViewClick
   */
  const handleViewClick = () => {
    onEdit ? onView(model) : history.push(`${match.url}/view/${model._id}`);
  };

  /**
   * Handles the click event of the "edit" menu item.
   * @function handleEditClick
   */
  const handleEditClick = () => {
    onEdit ? onEdit(model) : history.push(`${match.url}/edit/${model._id}`);
  };

  /**
   * Handles the click event of the "delete" menu item.
   * @function handleDeleteClick
   */
  const handleDeleteClick = () => {
    setDeletedModel(model, () => {
      setOpen(true);
    });
  };

  /**
   * Handles the confirm event of the delete modal.
   * @function handleConfirmDelete
   */
  const handleConfirmDelete = () => {
    deleteModel(deletedModel).then(() => {
      setOpen(false);
    });
  };

  return (
    <>
      <ListItem className={classes.listItemContainer} key={model._id}>
        {model.image ? <Avatar src={`${model.image}`} /> : <Avatar />}
        <ListItemText>
          <Typography>{model.name || model.title}</Typography>
        </ListItemText>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMoreButtonClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          open={actionOpen}
          id="fade-menu"
          keepMounted
          onClose={handleMenuClose}
          anchorEl={anchorEl}
        >
          <MenuItem onClick={handleViewClick}>
            <Button>view</Button>
          </MenuItem>
          <MenuItem>
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </MenuItem>
        </Menu>
      </ListItem>
      <ConfirmDeleteModal
        open={open}
        setOpen={setOpen}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default enhance(ModelListItem);
