import React from 'react';
import { connect } from 'react-redux';

import { renderDirections } from 'MakeRecipeHelper';

const mapStateToProps = state => ({ directions: state.directions });

const MakeRecipeDirections = props => (
  <div className="recipe-directions-div columns large-10">
    <h5>DIRECTIONS</h5>
    <div className="recipe-div-innermost">
      {renderDirections(props)}
    </div>
  </div>
);

export default connect(mapStateToProps)(MakeRecipeDirections);
