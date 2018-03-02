import React, { Component } from "react";
import { deleteUserThunk } from "../store/users";
import { connect } from "react-redux";

class UserItem extends Component {
  constructor(props) {
    super(props);
  }

  handleRemove = (user) => {
    this.props.removeUser(user.id);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="userItem">
        <h1> {this.props.user.email}</h1>
        <button onClick={() => this.handleRemove(user)}>
          Delete
          <span />
        </button>
      </div>
    );
  }

}

const mapDispatch = dispatch => ({
  removeUser: (userID) => {
    dispatch(deleteUserThunk(userID));
  }
});

export default connect(null, mapDispatch)(UserItem);
