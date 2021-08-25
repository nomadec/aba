import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Business, LocationOnOutlined, Schedule } from "@material-ui/icons";
import { Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const ServiceCard = ({ service, handleShow, handleEdit, handleDelete }) => {
  const classes = useStyles();

  return (
    <div className="service_card shadow" onClick={() => handleShow(service.id)}>
      {/* <div className="service_card__header"></div> */}
      <div className="service_card__image">
        <img alt="complex" src={service.image} />
      </div>
      <div className="service_card__title">{service.name}</div>
      <div className="service_card__provider">
        <Icon>
          <Business />
        </Icon>
        <span>{service.provider_first_name}</span>
      </div>
      <div className="service_card__duration">
        <Icon>
          <Schedule />
        </Icon>
        <span>{service.duration}min</span>
      </div>
      <div className="service_card__location">
        <Icon>
          <LocationOnOutlined />
        </Icon>
        <div>{service.location}</div>
      </div>
      <div className="service_card__price">${service.price}</div>
      <div className="service_card__desc trunc_desc">{service.description}</div>
    </div>
  );
};

export default ServiceCard;
