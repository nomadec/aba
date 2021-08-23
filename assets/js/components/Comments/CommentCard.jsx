import React from "react";
import {
  Avatar,
  Divider,
  Grid,
  Icon,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { DeleteForever, Edit } from "@material-ui/icons";
import moment from "moment";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { useData } from "../../contexts/DataContext";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const CommentCard = ({ comment, index }) => {
  const { editComment, deleteComment, verifyOwnership } = useData();
  const [editMode, setEditMode] = useState(false);

  function handleEdit(formData) {
    editComment(formData);
    setEditMode(false);
  }

  return (
    <>
      {index ? (
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      ) : null}

      <Grid container wrap="nowrap" justifyContent="flex-start" spacing={2}>
        <Grid item>
          <Avatar
            alt={`${comment.user_first_name} ${comment.user_last_name}`}
            src={imgLink}
          />
        </Grid>
        <Grid item xs zeroMinWidth>
          <h4
            style={{ margin: 0, textAlign: "left" }}
          >{`${comment.user_first_name} ${comment.user_last_name}`}</h4>
          {editMode ? (
            <CommentForm
              bodyLabel={"Edit a comment"}
              comment={comment}
              buttonLabel={"Save changes"}
              handleSubmit={handleEdit}
            />
          ) : (
            <>
              <p style={{ textAlign: "left" }}>{comment.content}</p>
              <p style={{ textAlign: "left", color: "gray" }}>
                {comment.inserted_at === comment.updated_at
                  ? `posted  ${moment(comment.inserted_at)
                      .add(6, "hours")
                      .fromNow()}`
                  : `edited ${moment(comment.updated_at)
                      .add(6, "hours")
                      .fromNow()}`}
              </p>
              {verifyOwnership(comment) ? (
                <Grid container>
                  <Grid item>
                    <Tooltip title="Edit Your Comment">
                      <IconButton
                        // color="secondary"
                        onClick={() => setEditMode(true)}
                      >
                        <Icon>
                          <Edit />
                        </Icon>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Delete Your Comment">
                      <IconButton
                        // color="secondary"
                        onClick={() => deleteComment(comment.id)}
                      >
                        <Icon>
                          <DeleteForever />
                        </Icon>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              ) : null}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CommentCard;
