import React from 'react';


export default function UserItem ({user}) {

    return (
        <div className="userItem">
            <h1> {user.email}</h1>
        </div>
    )

}