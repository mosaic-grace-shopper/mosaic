
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  UserList,
  ProductList,
  SingleProduct,
  Cart,
  OrderList,
  Checkout,
  CategoryList,
  AddCategory,
  ConfirmPage
} from './components'
import {me, allProducts, getCartThunk , getCategoriesThunk} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, currentUser} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={ProductList} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/order-placed" component={ConfirmPage} />

        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/orders" component={OrderList} />
              <Route path="/categories" component={CategoryList} />
              
              <Route path="/users" component={UserList} />
              <Route path="/addCategory" component={AddCategory} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    currentUser: state.user,
    users: state.users
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      // dispatch(allUsersThunk()) //this will cause an error b/c you must be an admin to see this
      dispatch(allProducts())
      dispatch(getCartThunk())
      dispatch(getCategoriesThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
