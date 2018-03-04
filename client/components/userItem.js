import React, { Component } from "react";
import { deleteUserThunk } from "../store/users";
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
      </div>
    );
  }

}

const mapDispatch = dispatch => ({
  removeTheUser: (userID) => {
    dispatch(deleteUserThunk(userID));
  }
});


export default connect(null, mapDispatch)(UserItem);
