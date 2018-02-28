import axios from "axios";

const GET_USERS = "GET_USERS";
const DELETE_USER = "DELETE_USER";
//delete user deletes user out of database, remove logs them out.


const currentUsers = []
/**
 * ACTION CREATORS
 */

const getUsers = users => ({ type: GET_USERS, users });
const deleteUser = id => ({ type: DELETE_USER, id}) 

/**
 * THUNK CREATORS
 */

export const allUsersThunk = () => dispatch => {
    axios
      .get("/api/users")
      .then(res => dispatch(getUsers(res.data)))
      .catch(err => console.log(err));
  };
// spacing/indentation -- KHEJ
  export const deleteUserThunk = (id) => dispatch => { // just one argument no parens based on other files -- KHEJ
    axios
    .delete(`api/users/${id}`)
    .then(() => dispatch(deleteUser(id)))
    .catch(err => console.err(`Removing user: ${id} unsuccessful.`))
  }

  /**
 * REDUCER
 */

  export default function reducer (state = currentUsers, action) {
    switch (action.type) {
      case GET_USERS:
        return [...currentUsers, ...action.users]; // just action.users -- KHEJ
      case DELETE_USER:
        return state.filter(user => user.id !== action.id);
      default:
        return state;
    }
  }