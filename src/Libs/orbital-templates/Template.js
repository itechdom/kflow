/**
 * Represents a User component.
 * @param {Object} props - The component props.
 * @param {Array} props.user - The array of user models.
 * @param {Function} props.user_createModel - The function to create a user model.
 * @param {Function} props.user_getModel - The function to get a user model.
 * @param {Function} props.user_updateModel - The function to update a user model.
 * @param {Function} props.user_deleteModel - The function to delete a user model.
 * @param {Function} props.user_searchModel - The function to search for user models.
 * @param {Function} props.user_setModelEdit - The function to set the edit mode for a user model.
 * @param {boolean} props.user_isEditing - Indicates whether the user model is in edit mode.
 * @param {Function} props.user_setIsEditing - The function to set the edit mode for the user model.
 * @param {Object} props.user_editedModel - The edited user model.
 * @param {Function} props.user_gallery_get - The function to get the user's gallery.
 * @param {Function} props.user_gallery_upload - The function to upload to the user's gallery.
 * @param {Function} props.user_media_upload - The function to upload media for the user.
 * @param {Function} props.user_media_get - The function to get media for the user.
 * @param {Function} props.user_media_add - The function to add media to the user.
 * @param {Function} props.user_media_remove - The function to remove media from the user.
 * @param {Array} props.user_media - The array of media for the user.
 * @param {Array} props.user_gallery - The array of gallery items for the user.
 * @param {Function} props.user_gallery_add - The function to add an item to the user's gallery.
 * @param {Function} props.user_gallery_remove - The function to remove an item from the user's gallery.
 * @param {Object} props.location - The location object from React Router.
 * @param {Object} props.match - The match object from React Router.
 * @param {Object} props.history - The history object from React Router.
 * @param {Object} props.classes - The CSS classes for the component.
 * @param {Object} props.form - The form object.
 * @param {Array} props.notifications - The array of notifications.
 * @param {Function} props.saveNotification - The function to save a notification.
 * @param {Function} props.removeNotification - The function to remove a notification.
 * @returns {JSX.Element} The rendered User component.
 */
import React from "react";
import ModelList from "../../Pages/ModelList/ModelList";
import { styles } from "./User.styles";
import userSchema from "../../../../Models/user";
import { withStyles } from '@material-ui/core';

/**
 * The name of the model.
 * @type {string}
 */
let ModelName = "user";

const User = ({
  user,
  user_createModel,
  user_getModel,
  user_updateModel,
  user_deleteModel,
  user_searchModel,
  user_setModelEdit,
  user_isEditing,
  user_setIsEditing,
  user_editedModel,
  user_gallery_get,
  user_gallery_upload,
  user_media_upload,
  user_media_get,
  user_media_add,
  user_media_remove,
  user_media,
  user_gallery,
  user_gallery_add,
  user_gallery_remove,
  location,
  match,
  history,
  classes,
  form,
  notifications,
  saveNotification,
  removeNotification,
  ...rest
}) => {
  return (
    <ModelList
      modelArray={user}
      modelKey={"name"}
      modelName={"user"}
      columns={["name", "email"]}
      modelSchema={userSchema}
      createModel={user_createModel}
      updateModel={user_updateModel}
      getModel={user_getModel}
      deleteModel={user_deleteModel}
      setModelEdit={user_setModelEdit}
      searchModel={user_searchModel}
      editedModel={user_editedModel}
      setIsEditing={user_setIsEditing}
      isEditing={user_isEditing}
      uploadMedia={user_media_upload}
      uploadGallery={user_gallery_upload}
      gallery={user_gallery}
      media={user_media}
      location={location}
      match={match}
      history={history}
      classes={classes}
      form={form}
      notifications={notifications}
      saveNotification={saveNotification}
      removeNotification={removeNotification}
    />
  );
};

export default withStyles(styles)(User);
