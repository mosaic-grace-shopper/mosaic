import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import categories from "../store/categories";

const Navbar = ({ handleClick, isLoggedIn, isAdmin, allCategories, email }) => (
  <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">
    <Link to="/" style={{ textDecoration: 'none' }}><h1>Mosaic</h1></Link>
  </a>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}

          <div className="dropdown">
            <Link to="/products">All Products</Link>
            <div className="dropdown-content">
              {allCategories.map(category => (
                <Link
                  key={category.id}
                  to={`/products/categories/${category.id}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/cart">Cart</Link>
          {isAdmin ? (
            <Link to="/orders"> Orders </Link>
          ) : (
            <Link to="/orders"> My Orders</Link>
          )}
          {isAdmin ? <Link to="/users"> Users </Link> : <span />}
          {isAdmin ? <Link to="/categories"> Categories </Link> : <span />}
          
          <span className="flex-right"><h8>Welcome, {email}!</h8></span>
          <a href="#" className="flex-right" onClick={handleClick}>
          Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <div className="dropdown">
            <Link to="/products">All Products</Link>
            <div className="dropdown-content">
              {allCategories.map(category => (
                <Link
                  key={category.id}
                  to={`/products/categories/${category.id}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
    
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  console.log();
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    // categories : state.categories,
    allCategories: state.categories,
    email: state.user.email
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
