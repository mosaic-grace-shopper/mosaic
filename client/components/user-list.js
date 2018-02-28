import React from 'react';
import { connect } from 'react-redux';
import { allUsersThunk } from '../store/users';

const UserList = props => {
  return (
    <div>
      <ul>{props.users.map(user => <li key={user.id}>{user.email} </li>)}</ul>
    </div>
  );
};

const mapStateToProps = function(state) {
  return {
    users: state.users
  };
};

const mapDispatch = dispatch => {
  return {
    getAllUsers() {
      dispatch(allUsersThunk());
    }
  };
};

export default connect(mapStateToProps, mapDispatch)(UserList);
