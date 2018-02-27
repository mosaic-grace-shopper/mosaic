import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../store/user';

// edit user if admin 
// delete user if admin 

export const UserItem = (props) => {

 
        const { user } = this.props;
        return (
            <div>
                {user.name}
            </div>
        )
    
}


const mapDispatch = { deleteUser }

export default connect(null, mapDispatch)(UserItem)