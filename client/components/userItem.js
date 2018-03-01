import React from 'react';


export default function UserItem (props) {
     const {user} = props
    return (
        
        <div className="userItem">
        <h1> {user.email}</h1>
        </div>
    )

}