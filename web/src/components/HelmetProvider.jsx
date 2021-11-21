/* eslint-disable no-unused-vars */
import React from 'react';
// import { Navbar } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PageTitle = (props) => {
  const { title, description, children } = props;
  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s"
        defaultTitle="Job Search | Indeed"
        defer={false}
      >
        {title && <title>{title}</title>}
        <meta name="description" content={description} />
      </Helmet>
      {/* <div id="wrapper">
        <Navbar />
        <div id="main">{children}</div>
      </div> */}
    </HelmetProvider>
  );
};

export default PageTitle;
