import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allUsersThunk } from '../store/users';
import { UserItem } from './user-item';

class UserList extends Component {
    componentDidMount() {
		this.props.getAllUsers();
	}

        render() {
            console.log("userlist", this.props.users)
            return (
                <div>
                     {this.props.users.length > 0  && this.props.users.map(user => 
                     {user.email} )
                // <UserItem user={user} key={user.id} />)
            }
                </div>
            )
    }

}


const mapStateToProps = function(state){
   return {
       users: state.users
   }
}


const mapDispatch = dispatch => {
    return {
        getAllUsers() {
            dispatch(allUsersThunk())
        }
    }
  };


export default connect(mapStateToProps, mapDispatch)(UserList);