import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import UserItem from './userItem';
import { allUsersThunk, deleteUserThunk } from '../store/users';



class UserList extends Component {
    constructor (props){
      super(props);
      this.removeUser = this.removeUser.bind(this);
    }

  componentDidMount () {
    this.props.getAllUsers()
  }

  render () {
    const {currentUser, users} = this.props;
    
    if (!currentUser.isAdmin) return <div> Hey, only admins can see users! :)</div>
    if (!users.length) return  <div>We have no users! We need to up our marketing. Or seed our database:)</div> 
    
    return (
      <div className="userList">
      <h1>users go in here</h1>
      <div className="aUser">
        { users.map(user => (
          <Link to={`users/${user.id}`} key={user.id} className="userCard">
            <UserItem user={user} />
          </Link>
        ))}
      </div>
    </div>
    );

  }


  removeUser(event){
      const { user } = this.props;
      deleteUserThunk(user.id);
  }

};

const mapStateToProps = function(state) {
  return {
    users: state.users,
    currentUser: state.user
  }
}

const mapDispatch = dispatch => ({
    getAllUsers: () => {
      dispatch(allUsersThunk())
      dispatch(deleteUserThunk())
    }
});

export default connect(mapStateToProps, mapDispatch)(UserList);
