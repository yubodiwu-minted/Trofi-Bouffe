import React, { Component } from 'react';
import { connect } from 'react-redux';

const actions = require('actions');

const { func, array } = React.PropTypes;

const mapStateToProps = state => ({
  currentRecipe: state.currentRecipe,
  directions: state.directions,
});

const propTypes = {
  dispatch: func,
  directions: array,
};

const defaultProps = {
  dispatch: () => {},
  directions: [],
};

class MakeRecipeForm extends Component {
  constructor(props) {
    super(props);

    this.ingredientNumber = 0;

    this.imageSubmit = this.imageSubmit.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.unitsChange = this.unitsChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.ingredientSubmit = this.ingredientSubmit.bind(this);
    this.directionChange = this.directionChange.bind(this);
    this.directionSubmit = this.directionSubmit.bind(this);

    this.state = {
      image: '',
      quantity: '',
      units: '',
      name: '',
      ingredientNumber: 0,
      direction: '',
    };
  }

  imageSubmit(event) {
    const { dispatch } = this.props;
    event.preventDefault();

    dispatch(actions.editCurrentRecipe({
      field: 'img',
      value: this.state.image,
    }));
    dispatch(actions.submitCurrentRecipeImage());

    this.setState({ image: '' });
  }

  quantityChange(event) {
    this.setState({ quantity: event.target.value });
  }

  unitsChange(event) {
    this.setState({ units: event.target.value });
  }

  namechange(event) {
    this.setState({ name: event.target.value });
  }

  ingredientSubmit(event) {
    event.preventDefault();

    this.dispatch(actions.addRecipeIngredient({
      quantity: this.state.quantity,
      units: this.state.units,
      name: this.state.description,
      ingredientNumber: this.state.ingredientNumber + 1,
    }));

    this.setState({
      quantity: '',
      units: '',
      description: '',
      ingredientNumber: this.state.ingredientNumber + 1,
    });
  }

  directionChange(event) {
    this.setState({ direction: event.target.value });
  }

  directionSubmit(event) {
    const { dispatch } = this.props;
    event.preventDefault();

    dispatch(actions.addRecipeDirection({
      stepNumber: this.props.directions.length + 1,
      stepContent: this.state.direction,
    }));

    this.setState({ direction: '' });
  }

  render() {
    return (
      <div id="make-recipe-buttons-div">
        <form onSubmit={this.imageSubmit}>
          <button className="blue-button" type="submit"><span>+</span>IMAGE</button>
          <input
            id="make-recipe-image"
            type="text"
            placeholder="image URL"
            value={this.state.image}
            onChange={() => {
              this.dispatch(actions.editCurrentRecipe({
                field: 'img',
                value: this.state.image,
              }));
            }}
          />
        </form>
        <form onSubmit={this.ingredientSubmit}>
          <div>
            <button className="blue-button" type="submit">
              <span>+</span>INGREDIENT
            </button>
            <button
              className="blue-button"
              onClick={(event) => {
                event.preventDefault();
                this.dispatch(actions.deleteRecipeIngredient());
              }}
            >
              <span>-</span>INGREDIENT
            </button>
          </div>
          <div>
            <input
              id="ingredient-quantity"
              type="text"
              value={this.state.quantity}
              onChange={this.quantityChange}
              placeholder="amount"
            />
            <select
              id="ingredient-units"
              onChange={this.unitsChange}
              default=""
            >
              <option value="g">grams</option>
              <option value="oz">oz</option>
              <option value="lbs">lbs</option>
              <option value="tsp">tsp</option>
              <option value="tbsp">tbsp</option>
              <option value="cups">cups</option>
            </select>
            <input
              id="ingredient-name"
              type="text"
              value={this.state.name}
              onChange={this.nameChange}
              placeholder="description"
            />
          </div>
        </form>
        <form onSubmit={this.directionSubmit}>
          <div>
            <button className="blue-button" type="submit">
              <span>+</span>STEP
            </button>
            <button
              className="blue-button"
              onClick={(event) => {
                event.preventDefault();
                this.dispatch(actions.deleteRecipeDirection());
              }}
            >
              <span>-</span>STEP
            </button>
          </div>
          <input
            type="text"
            value={this.state.direction}
            onChange={this.directionChange}
            placeholder="direction text"
          />
        </form>
      </div>
    );
  }
}

MakeRecipeForm.propTypes = propTypes;
MakeRecipeForm.defaultProps = defaultProps;
export default connect(mapStateToProps)(MakeRecipeForm);
