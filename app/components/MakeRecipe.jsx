import React from 'react';
import { connect } from 'react-redux';

import MakeRecipeDirections from 'MakeRecipeDirections';
import MakeRecipeIngredients from 'MakeRecipeIngredients';
import MakeRecipeHeader from 'MakeRecipeHeader';
import MakeRecipeForm from 'MakeRecipeForm';
import MakeRecipeError from 'MakeRecipeError';
import { renderButton } from 'MakeRecipeHelper';

const mapStateToProps = state => ({
  currentRecipe: state.currentRecipe,
  ingredientsList: state.ingredientsList,
  directions: state.directions,
});

const MakeRecipe = (props) => {
  if (localStorage.getItem('jwt')) {
    return (
      <div className="content-container row">
        <div className="content-list columns medium-10 large-8 small-centered">
          <div className="recipe-header">
            <MakeRecipeHeader />
          </div>
          <div className="recipe-content">
            <MakeRecipeIngredients />
            <MakeRecipeDirections />
          </div>
          <MakeRecipeForm />
          {renderButton(props)}
        </div>
      </div>
    );
  }

  return <MakeRecipeError />;
};

export default connect(mapStateToProps)(MakeRecipe);
