import React from "react";
import { Paper } from "@material-ui/core";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

// https://react.semantic-ui.com/views/comment/

const CommentsList = ({ comments, createComment, id }) => {
  return (
    <div>
      <h4>Customer Review and Comments</h4>
      <CommentForm
        handleSubmit={createComment}
        bodyLabel={"Add a comment..."}
        comment={{ service_id: id }}
        buttonLabel={"Send"}
      />
      <Paper style={{ padding: "40px 20px" }}>
        {comments.length > 0
          ? comments.map((item, index) => (
              <CommentCard key={item.id} comment={item} index={index} />
            ))
          : "Be the first to leave a comment"}
      </Paper>
    </div>
  );
};

export default CommentsList;
