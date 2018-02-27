import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/user';
import { UserItem } from './user-item';
// add this to redux 

class UserList extends Component {
    componentDidMount() {
		this.props.fetchUsers();
	}
    constructor(props) {
        super(props);
    
        this.state = {
          name: '',
          email: '',
          phone: ''
        }
    }

        render() {
            console.log("userlist", this.props)
            return (
                <div>
                </div>
            )
    }

}

// export const UserList = (props) => {
//     console.log("userlist", props)
//     // const { users } = props;
//     return (
//         <div>

//             {/* {users.map(user => 
//                 <UserItem user={user} key={user.id} />)
//             } */}

//             {/* {users.map(user => 
//                 {user.id}
//             )} */}
//         </div>
//     )
// }


const mapStateToProps = ({ users }) => ({ users })

// const mapDispatch = dispatch => ({
//     fetchInitialData: () => {
//       dispatch(fetchUsers());
//     }
//   });

const mapDispatch = { fetchUsers }

export default connect(mapStateToProps, mapDispatch)(UserList);