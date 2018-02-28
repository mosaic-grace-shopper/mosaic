import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../store/users';

// edit user if admin 
// delete user if admin 

export const UserItem = (props) => {
    console.log("props", props)
 
        const { user } = props;
        return (
            <div>
                {user.name}
            </div>
        )
    
}


const mapDispatch = { deleteUser }

export default connect(null, mapDispatch)(UserItem)