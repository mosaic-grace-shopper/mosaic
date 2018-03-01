import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import UserItem from './userItem';
import { allUsersThunk } from '../store/users';

class UserList extends Component {

  componentDidMount () {
    this.props.getAllUsers()
  }

  render () {
    const theUsers = this.props.users;
    console.log("this.props.users", this.props.users)
    return (
      <div className="userList">
      <h1>users go in here</h1>
      <div className="aUser">
        {theUsers.length < 1 ?
        <div>No users found</div> : theUsers.map(user => (
          <Link to={`users/${user.id}`} key={user.id} className="userCard">
            <UserItem user={user} />
          </Link>
        ))}
      </div>
    </div>
    );

  }
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
