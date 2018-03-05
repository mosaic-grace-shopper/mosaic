import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, createOrderThunk, createOrderLineThunk} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
export const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value

      const order = {
        status: 'Created',
        total: 10000000
      };

      //gonna pull these off cart later
      const orderLine = {
        quantity: 1,
        // linePrice: 500,
        lineTotal: 1000,
        orderId: 1,
        productId: 2
      }

      dispatch(auth(email, password, formName))

      //dispatch cart to order thunks here
      //trying to chain thunks, take return values from createOrderThunk
      //then send that into orderLineThunk to properly associate orderLine with Order
      //might need to all go inside a dispatch? that threw some weird errors but... seems to be the pattern from my research
      //currently results from the promise.resolve are undefined, but both thunks are being dispatched.
      //finally we'll grab values from the cart instead of hardcoded objects created for testing purposes above ^
      //something something redux-thunk?
      console.log('Ordering?');
      Promise.resolve(dispatch(createOrderThunk(order)))
      .then(results => console.log('results are: ', results));
      dispatch(createOrderLineThunk(orderLine))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
