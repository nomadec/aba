import { IconButton } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { URL_PATHS } from "../../helpers/consts";
import { Pagination } from "@material-ui/lab";
import { useState } from "react";
import ServiceCard from "./ServiceCard";
import { FilterList } from "@material-ui/icons";
import Searchbar from "./Searchbar";
import ServicesFilterbarCategory from "./ServicesFilterbarCategory";
import ServicesFilterbarPrice from "./ServicesFilterbarPrice";

const ServicesList = () => {
  const {
    getServices,
    deleteService,
    services,
    servicesTotalPages,
    servicesTotalCount,
  } = useData();
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  const [filterShown, setFilterShown] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getServices();
  }, []);

  function handleShow(id) {
    history.push(`${URL_PATHS.SERVICE_SHOW}/${id}`);
  }
  function handleEdit(id) {
    history.push(`${URL_PATHS.SERVICE_EDIT}/${id}`);
  }
  function handleDelete(id) {
    deleteService(id);
    getServices();
  }

  function handlePage(e, page) {
    const search = new URLSearchParams(window.location.search);
    search.set("_page", page);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServices();
    setCurrentPage(page);
  }

  function getCurrentPage() {
    const search = new URLSearchParams(window.location.search);

    if (!search.get("_page")) {
      return 1;
    }

    return search.get("_page");
  }

  return (
    <div id="services_list" className="services_list">
      {/* Searchbar */}
      <Searchbar />

      {/* Categories box picker */}
      <ServicesFilterbarCategory />

      {/* List of Services */}
      <div className="services_list__body">
        <div className="services_list_header">
          <div>
            <h3>{`${servicesTotalCount} ${
              servicesTotalCount === 1 ? "Offer" : "Offers"
            } Found`}</h3>
          </div>
          <div onClick={() => setFilterShown(!filterShown)}>
            <IconButton>
              {filterShown ? (
                <FilterList className="filter_icon rotate" />
              ) : (
                <FilterList className="filter_icon" />
              )}
            </IconButton>
          </div>
        </div>
        <ServicesFilterbarPrice filterShown={filterShown} />

        <div className="service_cards">
          {services.length === 0 ? (
            <p>No Records Found</p>
          ) : (
            services.map((item) => (
              <ServiceCard
                key={item.id}
                service={item}
                handleShow={handleShow}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>

        <div className="services_pagination">
          <Pagination
            count={servicesTotalPages}
            color="primary"
            page={+currentPage}
            onChange={handlePage}
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
