import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
  },
}));

const CommentForm = ({ handleSubmit, bodyLabel, comment, buttonLabel }) => {
  const classes = useStyles();
  const [newComment, setNewComment] = useState(comment);

  const handleChange = (event) => {
    const editedComment = {
      ...newComment,
      content: event.target.value,
    };
    setNewComment(editedComment);
  };

  async function handleClick(e) {
    e.preventDefault();
    console.log(newComment);
    await handleSubmit(newComment);
    setNewComment({ ...comment, content: "" });
  }

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField
        id="comment_form"
        label={bodyLabel}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={newComment.content}
        onChange={handleChange}
      />
      <button onClick={handleClick}>{buttonLabel}</button>
    </form>
  );
};

export default CommentForm;
