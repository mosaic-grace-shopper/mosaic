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
    return (
      <div className="userItem">
        <p> {this.props.user.email}</p>
        <button onClick={() => this.handleRemove(user)}>
          Delete
          <span />
        </button>
        { user.isAdmin ? <button onClick={() => this.props.makeUserAdmin(user,true)} name="removeAdmin"> Remove Admin</button> : <button onClick={() => this.props.makeUserAdmin(user,false)} name="makeAdmin"> Make Admin</button> }
      </div>
    );
  }

}

const mapDispatch = dispatch => ({
  removeTheUser: (userID) => {
    dispatch(deleteUserThunk(userID));
  },
  makeUserAdmin : (user, isAdmin) => {
    console.log("user ====", user , isAdmin)
    //dispatch(editUserThunk(user,userID))
  }
});


export default connect(null, mapDispatch)(UserItem);
