import React from 'react';
import { Link } from 'react-router';

export default() => {
  if (localStorage.getItem('jwt')) {
    window.location.hash = '/user/recipes';
  }

  return (
    <div className="entrance-container">
      <div className="entrance-div">
        <div className="button-container">
          <div>
            <Link to="/login">
              <button id="sign-in">Log In</button>
            </Link>
          </div>
          <div>
            <Link to="/user/new">
              <button id="sign-up">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
