import React, { Component } from "react";
import { deleteUserThunk , editUserThunk } from "../store/users";
import { connect } from "react-redux";

class UserItem extends Component {
  constructor(props) {
    super(props);
  }

  handleRemove = (user) => {
    this.props.removeTheUser(user.id);
  }

  render() {
    const { user } = this.props;
    //possibly more robust checks for admin status --KHEJ
    return (
      <div>
      <p> {this.props.user.email}</p>
      <div>
        <button className="btn btn-outline-danger btn-sm" onClick={() => this.handleRemove(user)}>
          Delete
        </button>
        { user.isAdmin ?
        <button className="btn btn-outline-primary btn-sm" onClick={() => this.props.makeUserAdmin(user,false)} name="removeAdmin"> Remove Admin</button>
        :
        <button className="btn btn-outline-primary btn-sm" onClick={() => this.props.makeUserAdmin(user,true)} name="makeAdmin"> Make Admin</button> }
      </div>
      <br />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  removeTheUser: (userID) => {
    dispatch(deleteUserThunk(userID));
  },
  makeUserAdmin : (user, isAdmin) => {
    user.isAdmin = isAdmin
    dispatch(editUserThunk(user,user.id))
  }
});


export default connect(null, mapDispatch)(UserItem);
