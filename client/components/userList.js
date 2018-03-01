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
    
    if (!theUsers.length) return  <div>No users found</div> 
    return (
      <div className="userList">
      <h1>users go in here</h1>
      <div className="aUser">
        { theUsers.map(user => (
          <Link to={`users/${user.id}`} key={user.id} className="userCard">
            <UserItem user={user} />
          </Link>
        ))}
      </div>
    </div>
    );

  }
};

const mapStateToProps = ({users}) => ({users})

const mapDispatch = dispatch => ({
    getAllUsers: () => {
      dispatch(allUsersThunk());
    }
});

export default connect(mapStateToProps, mapDispatch)(UserList);
