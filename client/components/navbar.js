import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import categories from '../store/categories';

const Navbar = ({ handleClick, isLoggedIn, isAdmin, categories}) => (
  <div>
    <h1>Mosaic</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <div className="dropdown">
              <Link to="/products">All Products</Link>
            <div className="dropdown-content">
             {
               categories.map(category =>
                  <Link key={category.id} to={'/products'} category={category.id}>{category.name}</Link>)
              }
            </div>
          </div>
          <Link to="/cart">Cart</Link>
          {isAdmin ? <Link to="/orders"> Orders </Link> : <span />}
          {isAdmin ? <Link to="/users"> Users </Link> : <span />}
          {isAdmin ? <Link to="/categories"> Categories </Link> : <span />}

          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <div className="dropdown">
                <Link to="/products">All Products</Link>
              <div className="dropdown-content">
                <Link to="/products">Paintings</Link>
                <Link to="/products">Scluptures</Link>
              </div>
            </div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    categories : state.categories,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
