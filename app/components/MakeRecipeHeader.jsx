import React, { Component } from 'react';
import { connect } from 'react-redux';

const actions = require('actions');

const { func, obj } = React.PropTypes;

const mapStateToProps = state => ({
  currentRecipe: state.currentRecipe,
});

const propTypes = {
  dispatch: func,
  currentRecipe: obj,
};

const defaultProps = {
  dispatch: () => {},
  currentRecipe: {},
};

class MakeRecipeHeader extends Component {
  constructor(props) {
    super(props);

    this.servingsSubmit = this.servingsSubmit.bind(this);
    this.titleSubmit = this.titleSubmit.bind(this);
  }

  servingsSubmit(event) {
    const { dispatch } = this.props;
    event.preventDefault();

    dispatch(actions.editCurrentRecipe({
      field: 'servings',
      value: this.refs.recipeServings.value
    }));
    dispatch(actions.submitCurrentRecipeServings());

    this.refs.recipeServings.value = '';
  }

  titleSubmit(event) {
    const { dispatch } = this.props;
    event.preventDefault();

    dispatch(actions.editCurrentRecipe({
      field: 'name',
      value: this.refs.recipeName.value
    }));
    dispatch(actions.submitCurrentRecipeName());

    this.refs.recipeName.value = '';
  }

  renderImage() {
    if (this.props.currentRecipe.img && this.props.currentRecipe.imgSubmitted) {
      return (
        <div id="make-recipe-image-holder">
          <p>Click to edit:</p>
          <img src={this.props.currentRecipe.img} alt="broken url" className="recipe-image" onClick={() => {
            this.dispatch(actions.clearCurrentRecipeImage());
          }}/>
        </div>
      );
    }

    return (
      <div id="recipe-image-placeholder">
        <p>Need Recipe Image</p>
      </div>
    );
  }

  renderTitle() {
    if (this.props.currentRecipe.name && this.props.currentRecipe.nameSubmitted) {
      return <h3 onClick={() => {
        this.dispatch(actions.clearCurrentRecipeName());
      }}>{this.props.currentRecipe.name} (click to edit)</h3>
    } else {
      return (
        <form onSubmit={this.titleSubmit}>
          <label>Title (hit enter to change):
            <input type="text" ref="recipeName" onChange={() => {
              this.dispatch(actions.editCurrentRecipe({
                field: "name",
                value: this.refs.recipeName.value
              }));
            }}/>
          </label>
        </form>
      );
    }
  }

  renderServings() {
      if (this.props.currentRecipe.servings && this.props.currentRecipe.servingsSubmitted) {
          return <p onClick={() => {
              this.dispatch(actions.clearCurrentRecipeServings());
          }}>Servings: {this.props.currentRecipe.servings} (click to edit)</p>
      } else {
          return (
              <form onSubmit={this.servingsSubmit}>
                  <label>Servings (hit enter to change):
                      <input type="text" ref="recipeServings" onChange={() => {
                          this.dispatch(actions.editCurrentRecipe({
                              field: "servings",
                              value: this.refs.recipeServings.value
                          }));
                      }}/>
                  </label>
              </form>
          );
      }
  }

  render() {
      return (
          <div className="recipe-header">
              {this.renderImage()}
              <div>
                  {this.renderTitle()}
                  {this.renderServings()}
              </div>
          </div>
      );
  }
}

MakeRecipeHeader.propTypes = propTypes;
MakeRecipeHeader.defaultProps = defaultProps;
export default connect(mapStateToProps)(MakeRecipeHeader);
