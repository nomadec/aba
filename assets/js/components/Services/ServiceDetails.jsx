import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button, Icon, Paper, Tooltip } from "@material-ui/core";
import {
  Business,
  DeleteForever,
  Edit,
  LocationOnOutlined,
  Schedule,
} from "@material-ui/icons";
import CommentsList from "../Comments/CommentsList";
import { useData } from "../../contexts/DataContext";
import { useParams } from "react-router-dom";
import CommentForm from "../Comments/CommentForm";
import CommentCard from "../Comments/CommentCard";
import { permittedRole } from "../../helpers/utils";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "#fdfdfd00",
    boxShadow: "none",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    // marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },

  actionsBar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ServiceDetails = ({
  serviceDetails,
  handleEdit,
  handleDelete,
  handleFavorites,
  createComment,
  comments,
  verifyOwnership,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <div className="service_card">
        {/* <div className="service_card__header"></div> */}
        <div className="service_card__image">
          <img
            alt="complex"
            src="https://material-ui.com/static/images/grid/complex.jpg"
          />
        </div>
        <div className="service_card__title">{serviceDetails.name}</div>
        <div className="service_card__provider">
          <Icon>
            <Business />
          </Icon>
          <span>{serviceDetails.provider_first_name}</span>
        </div>
        <div className="service_card__duration">
          <Icon>
            <Schedule />
          </Icon>
          <span>{serviceDetails.duration}min</span>
        </div>
        <div className="service_card__location">
          <Icon>
            <LocationOnOutlined />
          </Icon>
          <div>{serviceDetails.location}</div>
        </div>
        <div className="service_card__price">${serviceDetails.price}</div>
        <div className="service_card__desc">{serviceDetails.description}</div>
      </div>

      <CardActions className={classes.actionsBar}>
        <Tooltip title="Add service to your Favorites">
          <IconButton
            // color="secondary"
            onClick={() => handleFavorites(serviceDetails.id)}
          >
            <Icon>
              <FavoriteIcon />
            </Icon>
          </IconButton>
        </Tooltip>
        {permittedRole(user, "provider") && verifyOwnership(serviceDetails) ? (
          <>
            <Tooltip title="Edit your service">
              <IconButton
                // color="secondary"
                onClick={() => handleEdit(serviceDetails.id)}
              >
                <Icon>
                  <Edit />
                </Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete a service permanently">
              <IconButton
                // color="secondary"
                onClick={() => handleDelete(serviceDetails.id)}
              >
                <Icon>
                  <DeleteForever />
                </Icon>
              </IconButton>
            </Tooltip>
          </>
        ) : null}
        <Tooltip title="Read customer reviews and comments">
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CommentsList
          comments={comments}
          createComment={createComment}
          id={serviceDetails.id}
        />
      </Collapse>
    </Card>
  );
};

export default ServiceDetails;
