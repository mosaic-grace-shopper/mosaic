import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const GET_USERS = "GET_USERS";
const REMOVE_USER = "REMOVE_USER";
/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const getUsers = users => ({ type: GET_USERS, users });
const removeUser = () => ({ type: REMOVE_USER });
/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get("/auth/me")
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      res => {
        dispatch(getUser(res.data));
        history.push("/home");
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }));
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () => dispatch =>
  axios
    .post("/auth/logout")
    .then(_ => {
      dispatch(removeUser());
      history.push("/login");
    })
    .catch(err => console.log(err));

export const fetchUsers = () => dispatch => {
  axios
    .get("/api/users")
    .then(res => dispatch(getUsers(res.data)))
    .catch(err => console.log(err));
};

export const deleteUser = (id) => dispatch => {
  axios
  .delete(`api/users/${id}`)
  .then(() => dispatch(removeUser(id)))
  .catch(err => console.err(`Removing user: ${id} unsuccessful.`))
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case GET_USERS:
    console.log("action.users", action.users)
      return action.users;
    default:
      return state;
  }
}
