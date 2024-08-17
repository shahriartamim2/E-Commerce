import { Helmet } from "react-helmet";
import React from "react";
import PropTypes from "prop-types";


const PageTitle = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};


export default PageTitle;