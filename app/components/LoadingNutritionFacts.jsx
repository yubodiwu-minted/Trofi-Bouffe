import React from 'react';
import Loading from 'react-loading';

const LIGHT_BLUE = '#A2D1CF';

export default () => (
  <div className="content-container row">
    <div className="content-list columns medium-10 large-8 small-centered">
      <h3>Loading nutrition fact options...</h3>
      <Loading type="spin" color={LIGHT_BLUE} />;
    </div>
  </div>
);
