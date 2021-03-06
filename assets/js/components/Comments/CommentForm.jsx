import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

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
      <div style={{ textAlign: "right" }}>
        <Button onClick={handleClick}>{buttonLabel}</Button>
      </div>
    </form>
  );
};

export default CommentForm;
