import React from 'react';
import Nav from 'Nav';

const { array } = React.PropTypes;

const propTypes = { children: array };
const defaultProps = { children: [] };

const Main = props => (
  <div>
    <Nav />
    <div className="main-children">
      {props.children}
    </div>
  </div>
);

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;
export default Main;
